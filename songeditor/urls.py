from django.urls import path
from . import views


urlpatterns = [
    path('', views.home, name='songeditor-home'),
    path('heb/', views.homeHeb, name='songeditor-home-heb'),
    path('loadedsong/<int:songid>', views.loadSong, name='songeditor-loadedSong'),
    path('heb/loadedsong/<int:songid>', views.loadSong, name='songeditor-loadedSong-heb'),
    path('saveSong/', views.saveSong, name='save-song'),
    path('newsong/editNew/', views.editNewSong, name='songeditor-newsong-edit'),
    path('heb/newsong/editNew/', views.editNewSongHeb, name='songeditor-newsong-edit-heb'),
    path('newsong/', views.newsong, name='songeditor-newsong'),
    path('heb/newsong/', views.newsongHeb, name='songeditor-newsong-heb'),

]