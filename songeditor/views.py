from django.shortcuts import render
from django.http import HttpResponse
from .models import Song
from django.contrib.auth.models import User
import json
# Create your views here.
def home(request):
    current_user = request.user
    all_user_songs = Song.objects.filter(user=current_user)
    for song in all_user_songs:
        print(song)
    context = {
        'song_list': all_user_songs
    }
    return render(request, 'songeditor/home.html', context)


def homeHeb(request):
    current_user = request.user
    all_user_songs = Song.objects.filter(user=current_user)
    for song in all_user_songs:
        print(song)
    context = {
        'song_list': all_user_songs
    }
    return render(request, 'songeditor/hebrew/home.html', context)


def loadSong(request, songid):
    print("this is id "+str(songid))
    loaded_song = Song.objects.filter(id=songid)
    print(loaded_song[0].title)
    print(json.loads(loaded_song[0].lyrics))
    print("this is dir : : : "+loaded_song[0].direction)
    print(loaded_song[0].direction is "rtl")
    if loaded_song[0].direction == "rtl":
        url = 'songeditor/hebrew/loadedsong.html'
    else:
        url = 'songeditor/loadedsong.html'

    context = {
        "title": loaded_song[0].title,
        "lyric_blocks": json.loads(loaded_song[0].lyrics),

    }
    print("this is url: "+url)
    return render(request, url, context)

def newsong(request):
    return render(request, 'songeditor/newsong.html')

def newsongHeb(request):
    return render(request, 'songeditor/hebrew/newsong.html')

def editNewSong(request):
    if request.method == 'POST':
        song_title = request.POST.get('song_title_input')
        song_lyrics = request.POST.get('song_lyrics_input')
        list_lyrics_lines = song_lyrics.splitlines()
        context = {
            'title': song_title,
            'lyrics': list_lyrics_lines
        }


    return render(request, 'songeditor/editnewsong.html', context)


def editNewSongHeb(request):
    if request.method == 'POST':
        song_title = request.POST.get('song_title_input')
        song_lyrics = request.POST.get('song_lyrics_input')
        list_lyrics_lines = song_lyrics.splitlines()
        context = {
            'title': song_title,
            'lyrics': list_lyrics_lines
        }


    return render(request, 'songeditor/hebrew/editnewsong.html', context)


def saveSong(request):
    current_user = request.user
    data_received = json.loads(request.POST.get("data"))
    song_title = data_received["song_title"]
    direction = data_received["dir"]
    song_lyric_blocks = json.dumps(data_received["lyricBlocks"])
    new_song = Song(user=current_user, title=song_title, lyrics=song_lyric_blocks, direction=direction)
    new_song.save()

    response_data = {}
    try:
        response_data["result"] = "saving song was a success"
        response_data["message"] = "hooray!"
    except:
        response_data["result"] = "total faliure on save"
        response_data["message"] = "redo!"
    return HttpResponse(json.dumps(response_data), content_type="application/json")
