from django.contrib import admin
from .models import (
    Cliente,
    Producto,
    Factura,
    ItemFactura,
    Proveedor,
    InventarioMovimiento,
)


class ItemFacturaInline(admin.TabularInline):
    model = ItemFactura
    extra = 0


@admin.register(Factura)
class FacturaAdmin(admin.ModelAdmin):
    inlines = [ItemFacturaInline]
    list_display = ("id", "cliente", "fecha", "total")
    list_filter = ("fecha",)
    search_fields = ("cliente__nombre",)


@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ("nombre", "email", "telefono", "usuario")


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "precio", "stock", "usuario")


admin.site.register(Proveedor)
admin.site.register(InventarioMovimiento)
