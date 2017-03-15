var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    console.log("Index api called\n");
    res.sendFile('index.html', { root: 'public' });
});

router.get('/noteList/:name', function(req, res) {
    console.log("noteList api called\n");
    var person = req.url.split("/")[2];
    console.log("person is: " + person + "\n");
    var result = person;
    if (person) {
        if (!personMap.get(person)) {
            personMap.set(person,new Map());
        }
        result = getNoteTitles(personMap.get(person));
    }
    res.send(result);
});

function getNoteTitles(noteMap) {
    var result = [];
    noteMap.forEach(function(value,key) {
        result.push(key);
    });
    return result;
}

router.get('/noteText/:name/:note', function(req,res) {
    var pieces = req.url.split('/');
    var person = pieces[2];
    var note = pieces[3];
    if (!personMap.get(person) || !personMap.get(person).get(note)) {
        res.send({message:"could not find note"});
    }
    res.send({note:personMap.get(person).get(note)});
});

router.post('/createNote/:name', function(req, res) {
    var note = req.body;
    var person = req.url.split("/")[2];
    personMap.get(person).set(note.title,"");
    res.send('{"success" : "Updated Successfully", "status" : 200}')
});

router.post('/saveNote/:name', function(req,res) {
    var note = req.body;
    var person = req.url.split("/")[2];
    personMap.get(person).set(note.title,note.text);
    res.send('{"success" : "Updated Successfully", "status" : 200}')
});

router.post('/deleteNote/:name', function(req,res) {
    var note = req.body;
    var person = req.url.split("/")[2];
    personMap.get(person).delete(note.title);
    res.send('{"success" : "Updated Successfully", "status" : 200}')
});

router.post('/renameNote/:name', function(req,res) {
    var noteInfo = req.body;
    var person = req.url.split("/")[2];
    var noteText = personMap.get(person).get(noteInfo.oldTitle);
    personMap.get(person).delete(noteInfo.oldTitle);
    personMap.get(person).set(noteInfo.update, noteText);
    res.send('{"success" : "Updated Successfully", "status" : 200}')
});

var personMap = new Map();

module.exports = router;
