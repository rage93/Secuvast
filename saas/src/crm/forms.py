from django import forms

from django.forms import inlineformset_factory

from .models import Factura, Cliente, ItemFactura


class FacturaForm(forms.ModelForm):
    class Meta:
        model = Factura
        fields = ["cliente", "total"]

    def __init__(self, *args, **kwargs):
        user = kwargs.pop("user", None)
        super().__init__(*args, **kwargs)
        if user is not None:
            self.fields["cliente"].queryset = Cliente.objects.filter(usuario=user)


ItemFacturaFormSet = inlineformset_factory(
    Factura,
    ItemFactura,
    fields=["producto", "cantidad", "precio_unitario"],
    extra=1,
    can_delete=True,
)
