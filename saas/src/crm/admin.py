from django.contrib import admin
from .models import (
    Cliente,
    Producto,
    Factura,
    ItemFactura,
    Proveedor,
    InventarioMovimiento,
)



class UserOwnedAdmin(admin.ModelAdmin):
    """Limit visibility of objects to the requesting user."""

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(usuario=request.user)

    def save_model(self, request, obj, form, change):
        if not change:
            obj.usuario = request.user
        super().save_model(request, obj, form, change)



class ItemFacturaInline(admin.TabularInline):
    model = ItemFactura
    extra = 0


@admin.register(Factura)

class FacturaAdmin(UserOwnedAdmin):
    inlines = [ItemFacturaInline]
    list_display = ("id", "cliente", "fecha", "total")
    list_filter = ("fecha",)
    search_fields = ("cliente__nombre",)


@admin.register(Cliente)

class ClienteAdmin(UserOwnedAdmin):
    list_display = ("nombre", "email", "telefono", "usuario")


@admin.register(Producto)

class ProductoAdmin(UserOwnedAdmin):
    list_display = ("nombre", "precio", "stock", "usuario")


@admin.register(Proveedor)
class ProveedorAdmin(UserOwnedAdmin):
    list_display = ("nombre", "email", "usuario")


@admin.register(InventarioMovimiento)
class InventarioMovimientoAdmin(UserOwnedAdmin):
    list_display = ("producto", "tipo", "cantidad", "fecha", "usuario")


