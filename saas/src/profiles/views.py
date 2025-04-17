from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
@login_required
def profile_view(request, *args, **kwargs):
   # context = {
   #     "object_list": User.objects.filter(is_active=True)
   # }
    #return render(request, "profiles/list.html", context)
    return HttpResponse("Hello There")