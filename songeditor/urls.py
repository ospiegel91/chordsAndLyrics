from django.urls import path
from . import views


urlpatterns = [
    path('', views.home, name='songeditor-home'),
    path('newsong/', views.newsong, name='songeditor-newsong'),

]