$(document).ready(function () {

    addEventListeners();
    initializeAutocompleteListOfChords();
    let autoScrollClickCount = 0;


    let currentChord = "";

    let isEraserOn = 0;

    function addEventListeners(){
        $(".addLineButton").click(addEmptyNewLine);
        $(".removeBlockButton").click(removeThisLyricBlock);
        $(".autoScrollImg").click(pageScroll);
        $(".autoScrollImg").click(pageScrollIncrement);
        $(".chordsSelector").keyup(setCurrentChord);
        $(".chordsBlock").click(placeChord);
        $("#eraserButton").click(turnEraserOnOff);
        $("#saveBtn").click(saveSong);
        $(".newChord").click(onChordClickEvents);
        $(".playableChordBtn").change(setPlayableChord);
    }

    function addEmptyNewLine(e){
        let event_lyrics_block = e.target.parentElement.parentElement;
        let lyric_line_block = $("<div></div>");
        lyric_line_block.addClass('lyrics_line_block');


        let remove_block_button = $("<button></button>");
        remove_block_button.click(removeThisLyricBlock);
        remove_block_button.addClass('removeBlockButton');
        let trash_logo = $('<i></i>')
        trash_logo.addClass("fas fa-trash-alt");
        remove_block_button.append(trash_logo);

        new_chords_block = $("<div></div>");
        new_chords_block.addClass('chordsBlock');

        let new_lyric_inner_block = $("<div></div>");
        new_lyric_inner_block.addClass('lyric_block');

        let new_chords_inner_block = $("<div></div>");
        new_chords_inner_block.addClass('lyric_block');
        new_chords_inner_block.append(remove_block_button);
        new_chords_inner_block.append(new_chords_block);


        new_lyric_input = $('<input></input');
        new_lyric_input.addClass('lyric_input');
        new_plus_btn = $('<button>+</button>');
        new_plus_btn.addClass('addLineButton');
        new_plus_btn.click(addEmptyNewLine);

        
        new_lyric_inner_block.append(new_plus_btn);
        new_lyric_inner_block.append(new_lyric_input)


        lyric_line_block.append(new_chords_inner_block);
        lyric_line_block.append(new_lyric_inner_block);

        lyric_line_block.insertAfter(event_lyrics_block);


    }
    
    const homePointerHand = $(".pointerContainer");
    let homePointerHandState = 0;
    setInterval(appearDisppear, 1200, homePointerHand);
    function appearDisppear(domElement){
        if(homePointerHandState==0){
            domElement.removeClass("invisibleClass")
            domElement.addClass("visibleClass")
            homePointerHandState = 1;
        }else{
            domElement.removeClass("visibleClass")
            domElement.addClass("invisibleClass")
            homePointerHandState = 0;
        }
    }


    function removeThisLyricBlock(e){
        let event_lyrics_block = e.target.parentElement.parentElement.parentElement;
        event_lyrics_block.remove();
    }

    function pageScroll() {
        if (autoScrollClickCount >= 3){
            return;
        }
        window.scrollBy(0,1);
        scrolldelay = setTimeout(pageScroll,100);
    }
    function pageScrollIncrement(){
        autoScrollClickCount += 1;
        if(autoScrollClickCount > 3){
            autoScrollClickCount = 0;
        }else if (autoScrollClickCount >= 3){
            clearTimeout(scrolldelay);
        }
    }

    function setCurrentChord(event){
        if (event.which == 13 || event.keyCode == 13) {
            currentChord = event.target.value;
            $(".currentChordBox").text(currentChord);
        }
    }

    function setPlayableChord(){
            $("#chordInput").val("");
            let root = $("#selectRoot").val();
            let extension = $("#selectChordExtension").val();
            currentChord = `${root}${extension}`;
            $(".currentChordBox").text(currentChord);
        
    }

    function placeChord(event){
        if(currentChord == "" || isEraserOn==1){
            return;
        }
        console.log(event.target);
        if(event.target.classList.contains("newChord")){
            return;
        }
        let chordPlacingBlock = $(this);
        let xPos = event.pageX;
        let newChord = $("<button>+</button>");
        yPos = chordPlacingBlock.css('top');
        newChord.addClass('newChord');
        newChord.css('left',`${xPos}px`);
        newChord.text(`${currentChord}`);
        newChord.click(onChordClickEvents)
        chordPlacingBlock.append(newChord);
    }

    function onChordClickEvents(event){
        if(isEraserOn==1){
            event.target.remove();
            return;
        }else{
            let chordClickedOn =  event.target.textContent;
            checkIfChordIsPlayable(chordClickedOn);
        }

    }

    function playChord(chordToBePlayed){
        let allAudioTags = $("audio");
        allAudioTags.remove();
        var audioElement = document.createElement("audio");
        var head = document.getElementsByTagName('body')[0];
        audioElement.type = "audio/mp3";
        audioElement.src = `/static/chords/mp3/${chordToBePlayed}.mp3`;
        audioElement.id = `${chordToBePlayed}`;
        audioElement.autoplay = true;
        audioElement.style.display = "none";
        head.appendChild(audioElement);
    }

    function checkIfChordIsPlayable(clickedChord){
        const playableChords = ["Am","Em","G"];
        playableChords.forEach(function(chord) {
            if(chord==clickedChord){
                playChord(clickedChord);
            }
        });
    }

    function turnEraserOnOff(){
        $(".newChord").click(onChordClickEvents);
        if(isEraserOn==0){
            eraserBlinking = setInterval(toggleColors,600);
            $("#eraserButton").css('color','red')
            isEraserOn = 1;
            return;
        }
        isEraserOn = 0;
        clearInterval(eraserBlinking);
        $("#eraserButton").css('color','black');
    }

    function toggleColors(){
        if(isEraserOn==0){
            return;
        }
        const firstColor = 'red';
        const secondColor = 'white';
        let currentColor = $("#eraserButton").css('color');
        if(currentColor=="rgb(255, 255, 255)"){
            $("#eraserButton").css('color',firstColor);
        }else{
            $("#eraserButton").css('color',secondColor);
        }
    }

    function initializeAutocompleteListOfChords(){
        const input = document.getElementById("chordInput");
        const coreChords = ['A', 'Ab', 'A#','B', 'Bb', 'B#','C','Cb', 'C#','D', 'Db', 'D#','E', 'Eb', 'E#','F', 'Fb', 'F#','G', 'Gb', 'G#',];
        let allChords = [];
        coreChords.forEach(function(baseChord){
            allChords.push(`${baseChord}`);
            allChords.push(`${baseChord}m`);
        });
        let allChordVariations = [];
        allChords.forEach(function(rootChord){
            allChordVariations.push(`${rootChord}4`);
            allChordVariations.push(`${rootChord}sus4`);
            allChordVariations.push(`${rootChord}5`);
            allChordVariations.push(`${rootChord}6`);
            allChordVariations.push(`${rootChord}7`);
            allChordVariations.push(`${rootChord}9`);
            allChordVariations.push(`${rootChord}11`);
            allChordVariations.push(`${rootChord}6/9`);
            allChordVariations.push(`${rootChord}7/9`);
            allChordVariations.push(`${rootChord}7sus4`);
            allChordVariations.push(`${rootChord}ø`);
            allChordVariations.push(`${rootChord}o`);
            allChordVariations.push(`${rootChord}dim`);
            allChordVariations.push(`${rootChord}dim7`);
            allChordVariations.push(`${rootChord}maj7`);
        });
        let allChordVariationsWithBases = [];
        allChordVariations.forEach(function(chord){
            coreChords.forEach(function(addition){
                allChordVariationsWithBases.push(`${chord}/${addition}`);
                allChordVariationsWithBases.push(`${chord}`);
            });
        });

    }

    function prepDataForSave(){
        let songTitle = $(".title_input").val();
        let songObject = {};
        songObject["song_title"] = songTitle;
        songObject["dir"] = $("HTML")[0].dir;
        songObject["lyricBlocks"] = [];

        let allSongLyricsBoxes = $(".lyrics_line_block");
        for(var i=0; i<allSongLyricsBoxes.length; i++){
            let lyricBoxObject = {};
            let currentLyricBox = allSongLyricsBoxes[i];
            lyricBoxObject["lyrics"] = currentLyricBox.childNodes[3].childNodes[3].value;

            let chords = currentLyricBox.childNodes[1].childNodes[3].children;
            lyricBoxObject["chords"] = [];
            for(var j=0; j<chords.length;j++){
                let currentChord = chords[j];
                let lyricChordsObject = {
                    "text": currentChord.innerText,
                    "top": currentChord.style.top,
                    "left": currentChord.style.left,
                }
                lyricBoxObject["chords"].push(lyricChordsObject);
            }
            songObject["lyricBlocks"].push(lyricBoxObject);

        }
        return JSON.stringify(songObject);
    }


    var csrftoken = Cookies.get('csrftoken');

    function saveSong(){
        let songData = prepDataForSave();

        $.ajax({
            type: "POST",
            url: '/songeditor/saveSong/',
            data: {
                data: songData
            },
            // contentType: 'application/json;charset=UTF-8',
            headers: {
                'X-CSRFToken': csrftoken
            },
            success: function(){
                console.log("success saving song!");
            },
            error: function(){
                console.log("something went wrong when saving song");
            },
          });
    }

});