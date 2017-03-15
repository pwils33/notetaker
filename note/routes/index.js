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
  console.log(person + "\n");
  var result = person;
  if (person) {
    if (!personMap.get(person)) {
      personMap.set(person,[]);
    }
    result = personMap.get(person);
  }
  res.send(result);
});

var personMap = new Map();

module.exports = router;
