var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

//var search = require('./npmOps.js').search;

var app = express();

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../../out')));

app.post('/packages', function (req, res) {
  var terms = req.body.searchText;
  console.log('Received terms:', req.body);
  res.json(search(terms));
});

app.listen('3001', function () {
  console.log('Listening on port 3000');

});
