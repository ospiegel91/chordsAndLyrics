$(document).ready(function () {
  addEventListeners();
  let autoScrollClickCount = 0;

  let currentChord = "";

  let isEraserOn = 0;

  let viewMode = 0;

  const nextChordDict = {
    Cb: ["C", "Bb"],
    C: ["Db", "B"],
    "C#": ["D", "C"],
    Db: ["D", "C"],
    D: ["Eb", "C#"],
    "D#": ["E", "D"],
    Eb: ["E", "D"],
    E: ["F", "D#"],
    "E#": ["Gb", "E"],
    Fb: ["F", "D#"],
    F: ["Gb", "E"],
    "F#": ["G", "F"],
    Gb: ["G", "F"],
    G: ["Ab", "F#"],
    "G#": ["A", "G"],
    Ab: ["A", "G"],
    A: ["Bb", "G#"],
    "A#": ["B", "A"],
    Bb: ["B", "A"],
    B: ["C", "A#"],
    "B#": ["Db", "B"]
  };

  function addEventListeners() {
    $(".addLineButton").click(addEmptyNewLine);
    $(".removeBlockButton").click(removeThisLyricBlock);
    $(".autoScrollImg").click(pageScroll);
    $(".autoScrollImg").click(pageScrollIncrement);
    $(".chordsBlock").click(placeChord);
    $("#eraserButton").click(turnEraserOnOff);
    $("#saveBtn").click(saveSong);
    $(".newChord").click(onChordClickEvents);
    $(".playableChordBtn").change(setPlayableChord);
    $("#addBass").change(setPlayableChord);
    $("#playModeToggle").change(changeViewMode);
    $(".arrowFalfTonBtn").click(halfTonUpOrDown);
  }

  function halfTonUpOrDown(e) {
    let chords = $(".newChord");
    if (e.target.dataset.value == "up") {
      for (var i = 0; i < chords.length; i++) {
        scaleUp(chords[i]);
      }
    } else if (e.target.dataset.value == "down") {
      for (var i = 0; i < chords.length; i++) {
        scaleDown(chords[i]);
      }
    } else {
      alert("Something went awfully wrong");
    }
  }

  function scaleUp(chordBox) {
    let lengthOfChord = chordBox.innerText.length;
    if (lengthOfChord < 2) {
      chordBox.innerText = nextChordDict[`${chordBox.innerText}`][0];
    } else if (lengthOfChord == 2) {
      if (
        chordBox.innerText.charAt(1) == "#" ||
        chordBox.innerText.charAt(1) == "b"
      ) {
        chordBox.innerText = nextChordDict[`${chordBox.innerText}`][0];
      } else {
        let core =
          nextChordDict[`${chordBox.innerText.slice(0, 1).toUpperCase()}`][0];
        let extension = chordBox.innerText.slice(1);
        chordBox.innerText = `${core}${extension}`;
      }
    } else {
      let slashPosition = chordBox.innerText.indexOf('/');
      if(slashPosition>0){
        if (
          chordBox.innerText.charAt(1) == "#" ||
          chordBox.innerText.charAt(1) == "b"
        ) {
          let firstletter = chordBox.innerText.slice(0, 1).toUpperCase();
          let secondletter = chordBox.innerText.slice(1, 2);
          let core = nextChordDict[`${firstletter}${secondletter}`][0];
          let extension = chordBox.innerText.slice(2, slashPosition);
          let bass = nextChordDict[`${chordBox.innerText.slice(slashPosition+1)}`][0];
          chordBox.innerText = `${core}${extension}/${bass}`;
        } else {
          let core =
            nextChordDict[`${chordBox.innerText.slice(0, 1).toUpperCase()}`][0];
          let extension = chordBox.innerText.slice(1, slashPosition);
          let bass = nextChordDict[`${chordBox.innerText.slice(slashPosition+1)}`][0];
          chordBox.innerText = `${core}${extension}/${bass}`;
        }
      }else{
        if (
          chordBox.innerText.charAt(1) == "#" ||
          chordBox.innerText.charAt(1) == "b"
        ) {
          let firstletter = chordBox.innerText.slice(0, 1).toUpperCase();
          let secondletter = chordBox.innerText.slice(1, 2);
          let core = nextChordDict[`${firstletter}${secondletter}`][0];
          let extension = chordBox.innerText.slice(2);
          chordBox.innerText = `${core}${extension}`;
        } else {
          let core =
            nextChordDict[`${chordBox.innerText.slice(0, 1).toUpperCase()}`][0];
          let extension = chordBox.innerText.slice(1);
          chordBox.innerText = `${core}${extension}`;
        }
      }
    }

  }

  function scaleDown(chordBox) {
    let lengthOfChord = chordBox.innerText.length;
    if (lengthOfChord < 2) {
      chordBox.innerText = nextChordDict[`${chordBox.innerText}`][1];
    } else if (lengthOfChord == 2) {
      if (
        chordBox.innerText.charAt(1) == "#" ||
        chordBox.innerText.charAt(1) == "b"
      ) {
        chordBox.innerText = nextChordDict[`${chordBox.innerText}`][1];
      } else {
        let core =
          nextChordDict[`${chordBox.innerText.slice(0, 1).toUpperCase()}`][1];
        let extension = chordBox.innerText.slice(1);
        chordBox.innerText = `${core}${extension}`;
      }
    } else {
      let slashPosition = chordBox.innerText.indexOf('/');
      if(slashPosition>0){
        if (
          chordBox.innerText.charAt(1) == "#" ||
          chordBox.innerText.charAt(1) == "b"
        ) {
          let firstletter = chordBox.innerText.slice(0, 1).toUpperCase();
          let secondletter = chordBox.innerText.slice(1, 2);
          let core = nextChordDict[`${firstletter}${secondletter}`][1];
          let extension = chordBox.innerText.slice(2, slashPosition);
          let bass = nextChordDict[`${chordBox.innerText.slice(slashPosition+1)}`][1];
          chordBox.innerText = `${core}${extension}/${bass}`;
        } else {
          let core =
            nextChordDict[`${chordBox.innerText.slice(0, 1).toUpperCase()}`][1];
          let extension = chordBox.innerText.slice(1, slashPosition);
          let bass = nextChordDict[`${chordBox.innerText.slice(slashPosition+1)}`][1];
          chordBox.innerText = `${core}${extension}/${bass}`;
        }
      }else{
        if (
          chordBox.innerText.charAt(1) == "#" ||
          chordBox.innerText.charAt(1) == "b"
        ) {
          let firstletter = chordBox.innerText.slice(0, 1).toUpperCase();
          let secondletter = chordBox.innerText.slice(1, 2);
          let core = nextChordDict[`${firstletter}${secondletter}`][1];
          let extension = chordBox.innerText.slice(2);
          chordBox.innerText = `${core}${extension}`;
        } else {
          let core =
            nextChordDict[`${chordBox.innerText.slice(0, 1).toUpperCase()}`][1];
          let extension = chordBox.innerText.slice(1);
          chordBox.innerText = `${core}${extension}`;
        }
      }
    }

  }

  function changeViewMode() {
    if (viewMode == 0) {
      $(".chordsBlock").addClass("chordsBlockOff");
      $(".chordsBlockOff").removeClass(".chordsBlock");
      $(".removeBlockButton").css("visibility", "hidden");
      $(".addLineButton").css("visibility", "hidden");
      $(".newChord").css("border", "none");
      viewMode = 1;
    } else {
      $(".chordsBlockOff").addClass(".chordsBlock");
      $(".chordsBlock").removeClass("chordsBlockOff");
      $(".chordsBlock").click(placeChord);
      $(".removeBlockButton").css("visibility", "visible");
      $(".addLineButton").css("visibility", "visible");
      $(".newChord").css("border", "thin solid black");
      viewMode = 0;
    }
  }

  function addEmptyNewLine(e) {
    let event_lyrics_block = e.target.parentElement.parentElement;
    let lyric_line_block = $("<div></div>");
    lyric_line_block.addClass("lyrics_line_block");

    let remove_block_button = $("<button></button>");
    remove_block_button.click(removeThisLyricBlock);
    remove_block_button.addClass("removeBlockButton");
    let trash_logo = $("<i></i>");
    trash_logo.addClass("fas fa-trash-alt");
    remove_block_button.append(trash_logo);

    new_chords_block = $("<div></div>");
    new_chords_block.addClass("chordsBlock");

    let new_lyric_inner_block = $("<div></div>");
    new_lyric_inner_block.addClass("lyric_block");

    let new_chords_inner_block = $("<div></div>");
    new_chords_inner_block.addClass("lyric_block");
    new_chords_inner_block.append(remove_block_button);
    new_chords_inner_block.append(new_chords_block);

    new_lyric_input = $("<input></input");
    new_lyric_input.addClass("lyric_input");
    new_plus_btn = $("<button>+</button>");
    new_plus_btn.addClass("addLineButton");
    new_plus_btn.click(addEmptyNewLine);

    new_lyric_inner_block.append(new_plus_btn);
    new_lyric_inner_block.append(new_lyric_input);

    lyric_line_block.append(new_chords_inner_block);
    lyric_line_block.append(new_lyric_inner_block);

    lyric_line_block.insertAfter(event_lyrics_block);
  }

  const homePointerHand = $(".pointerContainer");
  let homePointerHandState = 0;
  setInterval(appearDisppear, 1200, homePointerHand);
  function appearDisppear(domElement) {
    if (homePointerHandState == 0) {
      domElement.removeClass("invisibleClass");
      domElement.addClass("visibleClass");
      homePointerHandState = 1;
    } else {
      domElement.removeClass("visibleClass");
      domElement.addClass("invisibleClass");
      homePointerHandState = 0;
    }
  }

  function removeThisLyricBlock(e) {
    let event_lyrics_block = e.target.parentElement.parentElement.parentElement;
    event_lyrics_block.remove();
  }

  function pageScroll() {
    if (autoScrollClickCount >= 3) {
      return;
    }
    window.scrollBy(0, 1);
    scrolldelay = setTimeout(pageScroll, 100);
  }
  function pageScrollIncrement() {
    autoScrollClickCount += 1;
    if (autoScrollClickCount > 3) {
      autoScrollClickCount = 0;
    } else if (autoScrollClickCount >= 3) {
      clearTimeout(scrolldelay);
    }
  }

  function setPlayableChord() {
    $("#chordInput").val("");
    let root = $("#selectRoot").val();
    let extension = $("#selectChordExtension").val();
    let bass = $("#addBass").val();
    let slash = "";
    if (bass != "") {
      slash = "/";
    }
    currentChord = `${root}${extension}${slash}${bass}`;
    $(".currentChordBox").text(currentChord);
  }

  function placeChord(event) {
    if (currentChord == "" || isEraserOn == 1) {
      return;
    }
    if (event.target.classList.contains("newChord")) {
      return;
    }
    let chordPlacingBlock = $(this);
    let xPos = event.pageX;
    let newChord = $("<button>+</button>");
    yPos = chordPlacingBlock.css("top");
    newChord.addClass("newChord");
    newChord.attr("dir","ltr");
    newChord.css("left", `${xPos}px`);
    newChord.text(`${currentChord}`);
    newChord.click(onChordClickEvents);
    chordPlacingBlock.append(newChord);
  }

  function onChordClickEvents(event) {
    if (isEraserOn == 1) {
      $(this).remove();
      return;
    } else {
      let chordClickedOn = event.target.textContent;
      checkIfChordIsPlayable(chordClickedOn);
    }
  }

  function playChord(chordToBePlayed) {
    let allAudioTags = $("audio");
    allAudioTags.remove();
    var audioElement = document.createElement("audio");
    var head = document.getElementsByTagName("body")[0];
    audioElement.type = "audio/mp3";
    audioElement.src = `/static/chords/mp3/${chordToBePlayed}.mp3`;
    audioElement.id = `${chordToBePlayed}`;
    audioElement.autoplay = true;
    audioElement.style.display = "none";
    head.appendChild(audioElement);
  }

  function checkIfChordIsPlayable(clickedChord) {
    const playableChords = ["Am", "Em", "G"];
    playableChords.forEach(function (chord) {
      if (chord == clickedChord) {
        playChord(clickedChord);
      }
    });
  }

  function turnEraserOnOff() {
    $(".newChord").click(onChordClickEvents);
    if (isEraserOn == 0) {
      eraserBlinking = setInterval(toggleColors, 600);
      $("#eraserButton").css("color", "red");
      isEraserOn = 1;
      return;
    }
    isEraserOn = 0;
    clearInterval(eraserBlinking);
    $("#eraserButton").css("color", "black");
  }

  function toggleColors() {
    if (isEraserOn == 0) {
      return;
    }
    const firstColor = "red";
    const secondColor = "white";
    let currentColor = $("#eraserButton").css("color");
    if (currentColor == "rgb(255, 255, 255)") {
      $("#eraserButton").css("color", firstColor);
    } else {
      $("#eraserButton").css("color", secondColor);
    }
  }

  function prepDataForSave() {
    let songTitle = $(".title_input").val();
    let songObject = {};
    songObject["song_title"] = songTitle;
    songObject["dir"] = $("HTML")[0].dir;
    songObject["lyricBlocks"] = [];

    let allSongLyricsBoxes = $(".lyrics_line_block");
    for (var i = 0; i < allSongLyricsBoxes.length; i++) {
      let lyricBoxObject = {};
      let currentLyricBox = allSongLyricsBoxes[i];
      lyricBoxObject["lyrics"] =
        currentLyricBox.childNodes[3].childNodes[3].value;

      let chords = currentLyricBox.childNodes[1].childNodes[3].children;
      lyricBoxObject["chords"] = [];
      for (var j = 0; j < chords.length; j++) {
        let currentChord = chords[j];
        let lyricChordsObject = {
          text: currentChord.innerText,
          top: currentChord.style.top,
          left: currentChord.style.left
        };
        lyricBoxObject["chords"].push(lyricChordsObject);
      }
      songObject["lyricBlocks"].push(lyricBoxObject);
    }
    return JSON.stringify(songObject);
  }

  var csrftoken = Cookies.get("csrftoken");

  function saveSong() {
    let songData = prepDataForSave();

    $.ajax({
      type: "POST",
      url: "/songeditor/saveSong/",
      data: {
        data: songData
      },
      // contentType: 'application/json;charset=UTF-8',
      headers: {
        "X-CSRFToken": csrftoken
      },
      success: function () {
        console.log("success saving song!");
      },
      error: function () {
        console.log("something went wrong when saving song");
      }
    });
  }
});
