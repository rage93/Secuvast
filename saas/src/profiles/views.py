from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm

User = get_user_model()

@login_required
def profile_list_view(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("user_list")
    else:
        form = UserCreationForm()
    context = {
        "object_list": User.objects.filter(is_active=True),
        "form": form,
    }
    return render(request, "profiles/list.html", context)

@login_required
def profile_detail_view(request, username=None):
    profile_user_obj = get_object_or_404(User, username=username)
    is_me = profile_user_obj == request.user
    context = {
        "object": profile_user_obj,
        "instance": profile_user_obj,
        "owner": is_me,
    }
    return render(request, "profiles/detail.html", context)
