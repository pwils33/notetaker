var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log("Index api called \n\n");
  res.sendFile('index.html', { root: 'public' });
});

router.get("/noteList", function(req, res) {
  console.log("noteList api called\n\n");
  var person = req.protocol.split("/")[2];
  console.log("person");
  res.send(person);
});

module.exports = router;
