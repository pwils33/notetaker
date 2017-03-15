var currentNote = "";
var person = "";
var url = "http://54.214.125.212:3000";

function onLoad() {
    person = prompt("Hello! who's using notetaker today?");
    while (!person) {
        person = prompt("We need some input here... Work with us");
    }
    getNoteTitles();
}

function initializeNoteTable(notes) {
    notes = notes["data"];
    console.log("initializing table with " + notes);
    var noteTable = document.getElementById("noteTable");
    for (var i = noteTable.rows.length - 1; i >= 0; i--) {
        noteTable.deleteRow(i);
    }
    noteTable.innerHTML = "<th>Your Notes</th>"
    for (var i = 0; i < notes.length; i++) {
        var row = noteTable.insertRow(-1);
        var cell = row.insertCell(0);
        cell.innerHTML = notes[i];
        row.setAttribute("onClick","openNote(this)");
    }
}

function getNoteTitles() {
    console.log("getting note titles")
    var request = url + "/noteList/" + person;
    get(request, initializeNoteTable);
}

function openNote(row) {
    if (currentNote) {
        var text = document.getElementById("edit").value;
        saveNote(currentNote, text);
    }
    currentNote = row.cells[0].innerHTML;
    console.log("opening note " + currentNote);
    var request = url + "/noteText/" + person + "/" + currentNote;
    get(request,onNoteLoaded);
}

function onNoteLoaded(response) {
    console.log("note loaded with response " + response);
    var value = resonse["note"];
    if (!value) {
        value = response.message;
    }
    document.getElementById("edit").value = value;
}

function saveNote(noteTitle, noteText) {
    console.log("saving note " + noteTitle);
    var note = {title:noteTitle,text:noteText};
    var request = url + "/saveNote/" + person;
    post(request, note);
}

function renameNote() {
    console.log("renaming note " + currentNote);
    var newTitle = prompt("What would you like to change the name to?");
    if (newTitle) {
        var request = url + "/renameNote/" + person;
        var body = {oldTitle:currentNote,update:newTitle};
        post(request, body);
        currentNote = newTitle;
    }
}

function deleteNote() {
    console.log("deleting note " + currentNote);
    var request = url + "/deleteNote/" + person;
    var note = {title:currentNote};
    post(request, note);
    currentNote = "";
    document.getElementById("edit").value = "";
}

function createNote() {
    console.log("creating note");
    var noteTitle = prompt("What would you like to call your note?");
    if (noteTitle) {
        currentNote = noteTitle;
        var request = url + "/createNote/" + person;
        var note = {title:noteTitle};
        post(request, note);
    }
}

function post(request, body) {
    // var xmlHttp = new XMLHttpRequest();
    // xmlHttp.onreadystatechange = function() {
    //     if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
    //         console.log(xmlHttp.responseText);
    //         getNoteTitles();
    // }
    // xmlHttp.open("POST", request, true); // true for asynchronous
    // xmlHttp.send(note);
    $.ajax({
        type:"POST",
        url:request,
        data:body,
        dataType:"json",
        success : getNoteTitles
    });
}

function get(request, callback) {
    $.ajax({
        url:request,
        dataType:"json",
        success : callback
    });
}
