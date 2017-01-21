function readFile(fileName) {
  var file = new File(fileName);
  file.open("r");
  var data = "";
  while (!file.eof) {
    data += file.readln() + "\n";
  }
  file.close();
  return data;
}

function writeTextFile(filepath, output) {
	var txtFile = new File(filepath);
	txtFile.open("w"); //
	txtFile.writeln(output);
	txtFile.close();
}

function getNoteNames() {
  var files = [];
  for (var i = 0; i < localStorage.length; i++) {
    files.push(localStorage.key(i));
  }
  return files;
}

function saveNote(key,note) {
  localStorage.setItem(key,note);
}

function deleteNote(key) {
  localStorage.removeItem(key);
}

function createNote(key) {
  localStorage.setItem(key,"");
}
