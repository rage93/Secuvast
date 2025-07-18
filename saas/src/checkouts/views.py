import helpers.billing
from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.conf import settings
from django.http import HttpResponseBadRequest

from subscriptions.models import SubscriptionPrice, Subscription, UserSubscription

User = get_user_model()

BASE_URL = settings.BASE_URL
# Create your views here.
def product_price_redirect_view(request, price_id=None, *args, **kwargs):
    request.session['checkout_subscription_price_id'] = price_id
    return redirect("stripe-checkout-start")


@login_required
def checkout_redirect_view(request):
    checkout_subscription_price_id = request.session.get("checkout_subscription_price_id")
    try:
        obj = SubscriptionPrice.objects.get(id=checkout_subscription_price_id)
    except:
        obj = None
    if checkout_subscription_price_id is None or obj is None:
        return redirect("pricing")
    customer_stripe_id = request.user.customer.stripe_id
    success_url_path = reverse("stripe-checkout-end")
    pricing_url_path = reverse("pricing")
    success_url = f"{BASE_URL}{success_url_path}"
    cancel_url= f"{BASE_URL}{pricing_url_path}"
    price_stripe_id = obj.stripe_id
    url = helpers.billing.start_checkout_session(
        customer_stripe_id,
        success_url=success_url,
        cancel_url=cancel_url,
        price_stripe_id=price_stripe_id,
        raw=False

    )
    return redirect(url)


def checkout_finalize_view(request):
    session_id = request.GET.get('session_id')
    if not session_id:
        messages.error(request, "No session ID found.")
        return redirect("pricing")

    try:
        checkout_data = helpers.billing.get_checkout_customer_plan(session_id)
    except Exception as e:
        messages.error(request, f"There was an error processing your subscription: {e}")
        return redirect("pricing")

    plan_id = checkout_data.pop('plan_id')
    customer_id = checkout_data.pop('customer_id')
    sub_stripe_id = checkout_data.pop("sub_stripe_id")
    subscription_data = {**checkout_data}

    try:
        sub_obj = Subscription.objects.get(subscriptionprice__stripe_id=plan_id)
        user_obj = User.objects.get(customer__stripe_id=customer_id)
    except Exception:
        return HttpResponseBadRequest("There was an error with your account. Please contact us.")

    # Use update_or_create to handle new subscriptions and plan changes gracefully
    _user_sub_obj, created = UserSubscription.objects.update_or_create(
        user=user_obj,
        defaults={
            "subscription": sub_obj,
            "stripe_id": sub_stripe_id,
            "user_cancelled": False,
            **subscription_data,
        }
    )
    
    # Do NOT redirect. Render the success template directly.
    messages.success(request, "Thank you for joining! Your subscription is now active.")
    
    context = {
        'subscription': _user_sub_obj,
        'page_title': 'Subscription Successful'
    }
    return render(request, "checkout/success.html", context)