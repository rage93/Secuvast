from django.contrib.auth import get_user_model
from django.test import TestCase

from .models import Cliente, Producto, Factura, ItemFactura


class FacturaTotalTest(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(username="u", password="p")
        self.cliente = Cliente.objects.create(usuario=self.user, nombre="Cliente")
        self.producto = Producto.objects.create(
            usuario=self.user, nombre="Producto", precio=10
        )

    def test_total_updates_on_item_save(self):
        factura = Factura.objects.create(usuario=self.user, cliente=self.cliente)
        ItemFactura.objects.create(
            factura=factura, producto=self.producto, cantidad=2, precio_unitario=10
        )
        factura.refresh_from_db()
        self.assertEqual(factura.total, 20)

        ItemFactura.objects.create(
            factura=factura, producto=self.producto, cantidad=1, precio_unitario=5
        )
        factura.refresh_from_db()
        self.assertEqual(factura.total, 25)
