# secuvast/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# ─── APP / PROJECT VIEWS ────────────────────────────────────────────────────
from .views import (
    home_view, about_view, index,
    pw_protected_view, user_only_view, staff_only_view
)
from auth import views as auth_views
from subscriptions import views as subscriptions_views
from checkouts import views as checkout_views
from landing.views import landing_page_view
from dashboard.views import dashboard_view
from crm.views import (
    factura_detail_view, factura_list_view,
    factura_create_view, cliente_list_view,
)
from profiles.views import profile_list_view

# ─── DRF / JWT / SPECTACULAR ────────────────────────────────────────────────
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

#  ⬇️  ¡vuelve a importar!
from secuvast.api.views import SessionTokenView          #  ←  AQUI
from customers.api import CustomerViewSet
from crm.api import (
    ProductoViewSet, ClienteViewSet,
    ProveedorViewSet, FacturaViewSet,
)
router = routers.DefaultRouter()
router.register(r"customers",  CustomerViewSet,         basename="customer")
router.register(r"products",   ProductoViewSet,         basename="product")
router.register(r"clients",    ClienteViewSet,          basename="client")
router.register(r"providers",  ProveedorViewSet,        basename="provider")
router.register(r"invoices",   FacturaViewSet,          basename="invoice")

# ⚠️ AHORA construimos la lista:
api_patterns = [
    path("", include(router.urls)),                       # /api/v1/…
    path("auth/token/",   TokenObtainPairView.as_view(),  name="token_obtain"),
    path("auth/refresh/", TokenRefreshView.as_view(),     name="token_refresh"),
    path("schema/", SpectacularAPIView.as_view(),         name="schema"),
    path("docs/",   SpectacularSwaggerView.as_view(url_name="schema"),
         name="swagger-ui"),
]
# ─── URLS GLOBALES ──────────────────────────────────────────────────────────
urlpatterns = [

    # API REST v1
    path("api/v1/auth/session/", SessionTokenView.as_view(), name="session_jwt"),
    path("api/v1/", include(api_patterns)),

    # Checkout / Stripe
    path("checkout/sub-price/<int:price_id>/",
         checkout_views.product_price_redirect_view,
         name="sub-price-checkout"),
    path("checkout/start/",  checkout_views.checkout_redirect_view,
         name="stripe-checkout-start"),
    path("checkout/success/", checkout_views.checkout_finalize_view,
         name="stripe-checkout-end"),

    # Core / marketing pages
    path("", landing_page_view, name="home"),
    path("hello-world/", home_view),
    path("about/", about_view),
    path("pricing/<str:interval>/",
         subscriptions_views.subscription_price_view,
         name="pricing_interval"),
    path("pricing/", subscriptions_views.subscription_price_view,
         name="pricing"),

    # Auth & accounts
    path("accounts/", include("allauth.urls")),
    path("accounts/billing/", subscriptions_views.user_subscription_view,
         name="user_subscription"),
    path("accounts/billing/cancel",
         subscriptions_views.user_subscription_cancel_view,
         name="user_subscription_cancel"),

    # Admin
    path("admin/", admin.site.urls),

    # Dashboard
    path("dashboard/", dashboard_view, name="dashboard"),
    path("dashboard/facturas/", factura_list_view,   name="factura_list"),
    path("dashboard/facturas/nueva/", factura_create_view,
         name="factura_create"),
    path("dashboard/facturas/<int:pk>/", factura_detail_view,
         name="factura_detail"),
    path("dashboard/clientes/",  cliente_list_view,  name="cliente_list"),
    path("dashboard/usuarios/",  profile_list_view,  name="user_list"),

    # Protected examples
    path("protected/",               pw_protected_view),
    path("protected/staff-only/",    staff_only_view),
    path("protected/user-only/",     user_only_view),

    # Profiles app
    path("profiles/", include("profiles.urls")),
]

# ─── STATIC (solo DEBUG) ───────────────────────────────────────────────────
urlpatterns += static(
    settings.STATIC_URL,
    document_root=settings.STATICFILES_BASE_DIR,
)
