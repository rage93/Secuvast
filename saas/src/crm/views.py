from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.shortcuts import get_object_or_404, redirect, render


from .models import Factura, Cliente
from .forms import FacturaForm, ItemFacturaFormSet, ClienteForm


@login_required
def factura_list_view(request):
    """List the invoices for the logged-in user and allow creating new ones."""
    if request.method == "POST":
        form = FacturaForm(request.POST, user=request.user)
        if form.is_valid():
            factura = form.save(commit=False)
            factura.usuario = request.user
            factura.save()
            messages.success(request, "Factura creada correctamente.")
            return redirect("factura_list")
    else:
        form = FacturaForm(user=request.user)

    facturas = (
        Factura.objects.filter(usuario=request.user)
        .select_related("cliente")
        .order_by("-fecha")
    )
    return render(
        request, "crm/factura_list.html", {"facturas": facturas, "form": form}
    )


@login_required
def factura_detail_view(request, pk: int):
    """Show and edit an invoice with its items."""
    factura = get_object_or_404(
        Factura.objects.select_related("cliente").prefetch_related("items__producto"),
        usuario=request.user,
        pk=pk,
    )

    formset = ItemFacturaFormSet(request.POST or None, instance=factura)
    if request.method == "POST" and formset.is_valid():
        formset.save()
        messages.success(request, "Factura actualizada correctamente.")
        return redirect("factura_detail", pk=factura.pk)

    return render(
        request,
        "crm/factura_detail.html",
        {"factura": factura, "formset": formset},
    )


@login_required
def factura_create_view(request):
    """Create a new invoice with optional line items."""
    factura = Factura(usuario=request.user)
    if request.method == "POST":
        form = FacturaForm(request.POST, instance=factura, user=request.user)
        formset = ItemFacturaFormSet(request.POST, instance=factura)
        if form.is_valid() and formset.is_valid():
            form.save()
            formset.save()
            messages.success(request, "Factura creada correctamente.")
            return redirect("factura_detail", pk=factura.pk)
    else:
        form = FacturaForm(instance=factura, user=request.user)
        formset = ItemFacturaFormSet(instance=factura)

    return render(
        request,
        "crm/factura_form.html",
        {"form": form, "formset": formset},
    )


@login_required
def cliente_list_view(request):
    """List clients and allow creation."""
    if request.method == "POST":
        form = ClienteForm(request.POST)
        if form.is_valid():
            cliente = form.save(commit=False)
            cliente.usuario = request.user
            cliente.save()
            messages.success(request, "Cliente creado correctamente.")
            return redirect("cliente_list")
    else:
        form = ClienteForm()

    clientes = Cliente.objects.filter(usuario=request.user).order_by("nombre")
    return render(
        request,
        "crm/cliente_list.html",
        {"clientes": clientes, "form": form},
    )

