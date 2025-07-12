# ────────────────────────────────────────────────────────────────
# src/crm/api.py
# API REST para la app CRM (Productos, Clientes, etc.)
# - DRF 3.15+, Django 5.1+
# ────────────────────────────────────────────────────────────────
from rest_framework import serializers, viewsets, permissions, filters
from .models import (
    Producto,
    Cliente,
    Proveedor,
    Factura,
    ItemFactura,
    InventarioMovimiento,
)

# ════════════════
#  SERIALIZERS
# ════════════════
class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = (
            "id",
            "nombre",
            "precio",
            "stock",
            "categoria",
            "usuario",          # solo lectura; útil en admin/superuser
        )
        read_only_fields = ("id", "usuario")


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = "__all__"
        read_only_fields = ("id", "usuario")


class ProveedorSerializer(serializers.ModelSerializer):
    productos = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Proveedor
        fields = "__all__"
        read_only_fields = ("id", "usuario")


class InventarioMovimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventarioMovimiento
        fields = "__all__"
        read_only_fields = ("id", "usuario")


class ItemFacturaSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.CharField(
        source="producto.nombre", read_only=True
    )

    class Meta:
        model = ItemFactura
        fields = ("id", "producto", "producto_nombre", "cantidad", "precio_unitario")


class FacturaSerializer(serializers.ModelSerializer):
    items = ItemFacturaSerializer(many=True, read_only=True)
    cliente_nombre = serializers.CharField(source="cliente.nombre", read_only=True)

    class Meta:
        model = Factura
        fields = (
            "id",
            "cliente",
            "cliente_nombre",
            "fecha",
            "total",
            "items",
            "usuario",
        )
        read_only_fields = ("id", "total", "usuario")


# ════════════════
#  PERMISSIONS
# ════════════════
class IsOwner(permissions.BasePermission):
    """
    - El objeto pertenece al request.user  (salvo superuser)
    """

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True
        return getattr(obj, "usuario_id", None) == request.user.id


# ════════════════
#  MIXIN genérico
# ════════════════
class UserOwnedQuerySetMixin:
    """Filtra por usuario + asigna usuario en create."""

    permission_classes = [permissions.IsAuthenticated, IsOwner]
    filter_backends = [filters.SearchFilter]
    search_fields = ["nombre", "categoria"]  # editables según modelo

    def get_queryset(self):
        qs = super().get_queryset()
        return qs if self.request.user.is_superuser else qs.filter(
            usuario=self.request.user
        )

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)


# ════════════════
#  VIEWSETS
# ════════════════
class ProductoViewSet(UserOwnedQuerySetMixin, viewsets.ModelViewSet):
    """
    `/api/v1/products/`
    """
    queryset = Producto.objects.all().order_by("-id")
    serializer_class = ProductoSerializer
    search_fields = ["nombre", "categoria"]   # sobreescribimos mixin si queremos


class ClienteViewSet(UserOwnedQuerySetMixin, viewsets.ModelViewSet):
    queryset = Cliente.objects.all().order_by("nombre")
    serializer_class = ClienteSerializer
    search_fields = ["nombre", "empresa", "email"]


class ProveedorViewSet(UserOwnedQuerySetMixin, viewsets.ModelViewSet):
    queryset = Proveedor.objects.all().order_by("nombre")
    serializer_class = ProveedorSerializer
    search_fields = ["nombre", "email"]


class FacturaViewSet(UserOwnedQuerySetMixin, viewsets.ModelViewSet):
    queryset = (
        Factura.objects.select_related("cliente")
        .prefetch_related("items", "items__producto")
        .order_by("-fecha")
    )
    serializer_class = FacturaSerializer
    search_fields = ["cliente__nombre"]
