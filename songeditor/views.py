from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def home(request):
    return render(request, 'songeditor/home.html')

def newsong(request):
    return render(request, 'songeditor/newsong.html', {'title':'new song'})