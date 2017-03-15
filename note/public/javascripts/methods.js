var currentNote = "";
var person = "";
var url = "http://54.214.125.212:3000";

function onLoad() {
    person = prompt("Hello! who's using notetaker today?");
    while (!person) {
        person = prompt("We need some input here... Work with us");
    }
    getNoteNames();
}

function initializeNoteTable(notes) {
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

function getNoteNames() {
    var request = url + "/noteList/" + person;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            initializeNoteTable(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", request, true); // true for asynchronous
    xmlHttp.send(null);
}

function openNote(row) {
    if (currentNote) {
        var text = document.getElementById("edit").value;
        saveNote(currentNote, text);
    }
    currentNote = row.cells[0].innerHTML;
    var request = url + "/noteText/" + person + "/" + currentNote;
    get(request,onNoteLoaded);
}

function onNoteLoaded(response) {
    var value = resonse.note;
    if (!value) {
        value = response.message;
    }
    document.getElementById("edit").value = value;
}

function saveNote(noteTitle, noteText) {
    var note = {title:noteTitle,text:noteText};
    var request = url + "/save/" + person;
    post(request, note);
}

function renameNote() {
    var newTitle = prompt("What would you like to change the name to?");
    var request = url + "/renameNote/" + person;
    var body = {oldTitle:currentNote,update:newTitle};
    post(request, body);
}

function deleteNote() {
    var request = url + "/deleteNote/" + person;
    var note = {title:currentNote};
    post(request, note);
    currentNote = "";
    document.getElementById("edit").value = "";
}

function createNote() {
    var noteTitle = prompt("What would you like to call your note?");
    if (noteTitle) {
        var request = url + "/createNote/" + person;
        var note = {title:noteTite};
        post(request, note);
    }
}

function post(request, body) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            console.log(xmlHttp.responseText);
            getNoteNames();
    }
    xmlHttp.open("POST", request, true); // true for asynchronous
    xmlHttp.send(note);
}

function get(request, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            console.log(xml.responseText);
            callback(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", request, true); // true for asynchronous
    xmlHttp.send(null);
}
