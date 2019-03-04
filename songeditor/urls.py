from django.urls import path
from . import views


urlpatterns = [
    path('', views.home, name='songeditor-home'),
    path('loadedsong/<int:songid>', views.loadSong, name='songeditor-loadedSong'),
    path('saveSong/', views.saveSong, name='save-song'),
    path('newsong/editNew/', views.editNewSong, name='songeditor-newsong-edit'),
    path('newsong/', views.newsong, name='songeditor-newsong'),

]