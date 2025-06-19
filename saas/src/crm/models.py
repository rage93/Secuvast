from django.db import models
from django.conf import settings
from django.utils import timezone
from decimal import Decimal

User = settings.AUTH_USER_MODEL



class UserOwnedModel(models.Model):
    """Abstract base model to associate records with a user."""

    usuario = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="%(class)ss"
    )

    class Meta:
        abstract = True


class Cliente(UserOwnedModel):

    nombre = models.CharField(max_length=255)
    email = models.EmailField(blank=True, null=True)
    telefono = models.CharField(max_length=50, blank=True)
    empresa = models.CharField(max_length=255, blank=True)
    notas = models.TextField(blank=True)

    def __str__(self) -> str:
        return self.nombre



class Producto(UserOwnedModel):
    nombre = models.CharField(max_length=255)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    categoria = models.CharField(max_length=120, blank=True)

    def __str__(self) -> str:
        return self.nombre



class Proveedor(UserOwnedModel):

    nombre = models.CharField(max_length=255)
    email = models.EmailField(blank=True, null=True)
    productos = models.ManyToManyField(Producto, blank=True)

    def __str__(self) -> str:
        return self.nombre



class Factura(UserOwnedModel):

    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    fecha = models.DateTimeField(default=timezone.now)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    productos = models.ManyToManyField(
        Producto, through="ItemFactura", related_name="facturas"
    )

    def __str__(self) -> str:
        return f"Factura {self.id} - {self.cliente.nombre}"

    @property
    def total_calculado(self) -> Decimal:
        return sum(
            (item.cantidad * item.precio_unitario for item in self.items.all()),
            Decimal("0"),
        )

    def update_total(self) -> None:
        """Recalculate and store the invoice total based on its items."""
        self.total = self.total_calculado
        self.save(update_fields=["total"])


class ItemFactura(models.Model):
    factura = models.ForeignKey(Factura, on_delete=models.CASCADE, related_name="items")
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=1)
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self) -> str:
        return f"{self.producto.nombre} x {self.cantidad}"

    def save(self, *args, **kwargs):
        """Persist the line item and update the invoice total."""
        super().save(*args, **kwargs)
        self.factura.update_total()

    def delete(self, *args, **kwargs):
        factura = self.factura
        super().delete(*args, **kwargs)
        factura.update_total()



class InventarioMovimiento(UserOwnedModel):
    class TipoMovimiento(models.TextChoices):
        ENTRADA = "entrada", "Entrada"
        SALIDA = "salida", "Salida"


    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    tipo = models.CharField(max_length=10, choices=TipoMovimiento.choices)
    cantidad = models.IntegerField()
    fecha = models.DateTimeField(default=timezone.now)

    def __str__(self) -> str:
        return f"{self.get_tipo_display()} - {self.producto.nombre} ({self.cantidad})"
