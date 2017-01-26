// function readFile(fileName) {
//   var file = new File(fileName);
//   file.open("r");
//   var data = "";
//   while (!file.eof) {
//     data += file.readln() + "\n";
//   }
//   file.close();
//   return data;
// }
//
// function writeTextFile(filepath, output) {
// 	var txtFile = new File(filepath);
// 	txtFile.open("w"); //
// 	txtFile.writeln(output);
// 	txtFile.close();
// }

var currentNote = "";

function initializeNoteTable() {
  // console.log("I'm here");
  // localStorage.setItem("temp","test");
  // localStorage.setItem("temp2","anotherTest");
  var notes = getNoteNames();
  var noteTable = document.getElementById("noteTable");
  for (var i = noteTable.rows.length - 1; i >= 0; i--) {
    noteTable.deleteRow(i);
  }
  noteTable.innerHTML = "<th>Your Notes</th>"
  // noteTable.createTHead().insertRow(0).insertCell(0).innerHTML = "Your Notes";
  for (var i = 0; i < notes.length; i++) {
    var row = noteTable.insertRow(-1);
    var cell = row.insertCell(0);
    cell.innerHTML = notes[i];
    // var rowClickListener = function(noteName) {
    //   window.currentNote = noteName;
    //   return openNote(noteName);
    // }
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
  var key = row.cells[0].innerHTML;
  window.currentNote = key;
  console.log("I got called with " + key);
  document.getElementById("edit").value = localStorage.getItem(key);
}

function saveNote() {
  var note = document.getElementById("edit").value;
  var temp;
  if (window.currentNote === "") {
    temp = prompt("What would you like to call your note?");
  }
  if (!temp && !window.currentNote) {
    return;
  }
  window.currentNote = temp;
  localStorage.setItem(window.currentNote,note);
  initializeNoteTable();
}

function renameNote() {
  var temp = prompt("What would you like to call you note?");
  if (!temp) {
      console.log("returning because word is null");
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
  var temp = prompt("What would you like to call your note?");
  if (!temp) {
      return;
  }
  window.currentNote = temp;
  document.getElementById("edit").value = "";
  localStorage.setItem(window.currentNote,"");
  initializeNoteTable();
}
