
var currentNote = "";

function initializeNoteTable() {
  var notes = getNoteNames();
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
  var notes = [];
  for (var i = 0; i < localStorage.length; i++) {
    notes.push(localStorage.key(i));
  }
  return notes;
}

function openNote(row) {
  if (window.currentNote) {
    // console.log("saving note "  + window.currentNote);
    saveNote();
  }
  var key = row.cells[0].innerHTML;
  window.currentNote = key;
  // console.log("I got called with " + key);
  document.getElementById("edit").value = localStorage.getItem(key);
}

function saveNote() {
  var note = document.getElementById("edit").value;
  var temp;
  if (!window.currentNote) {
    // console.log("prompting from saveNote()");
    temp = prompt("What would you like to call your note?");
    if (!temp) {
      return;
    }
    window.currentNote = temp;
  }
  localStorage.setItem(window.currentNote,note);
  initializeNoteTable();
}

function renameNote() {
  // console.log("prompting from renameNote()");
  var temp = prompt("What would you like to call you note?");
  if (!temp) {
      // console.log("returning because word is null");
      return;
  }
  localStorage.removeItem(window.currentNote);
  window.currentNote = temp;
  localStorage.setItem(window.currentNote,document.getElementById("edit").value);
}

function deleteNote() {
  localStorage.removeItem(window.currentNote);
  window.currentNote = "";
  document.getElementById("edit").value = "";
  initializeNoteTable();
}

function createNote() {
  if (window.currentNote) {
    saveNote();
  }
  // console.log("prompting from createNote()");
  var temp = prompt("What would you like to call your note?");
  if (!temp) {
      return;
  }
  window.currentNote = temp;
  document.getElementById("edit").value = "";
  localStorage.setItem(window.currentNote,"");
  initializeNoteTable();
}
