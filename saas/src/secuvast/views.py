import pathlib
from django.shortcuts import render
from django.http import HttpResponse

from visits.models import PageVisit

this_dir = pathlib.Path(__file__).resolve().parent

def home_page_view(request, *args, **kwargs):
    qs = PageVisit.objects.all() # everything saved
    page_qs = PageVisit.objects.filter(path=request.path)
    my_tittle = "Secuvast"
    my_context = {
        "page_tittle": my_tittle,
        "page_visit_count": page_qs.count(),
        "percent": (page_qs.count() * 100.0) / qs.count(),
        "total_visit_count": qs.count(),
        
    }
    path= request.path
    print("path",path) #show in the terminal what was open
    html_template = "home.html"
    PageVisit.objects.create(path=request.path) 
    return render (request, html_template, my_context)