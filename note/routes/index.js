var express = require('express');
var router = express.Router();

router.get('/noteList', function(req, res) {
  console.log("noteList api called\n\n");
  var person = req.url;
  console.log(person);
  res.send(person);
});

/* GET home page. */
router.get('/', function(req, res) {
  console.log("Index api called \n\n");
  res.sendFile('index.html', { root: 'public' });
});

module.exports = router;
