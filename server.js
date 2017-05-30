var express =  require('express');
var app = express();
var request = require('request');
var moment = require('moment');

app.use(express.static('public'));

var queryURL = "";

request(queryURL, function(error, response, body) {
  if (!error && response.statusCode == 200) {
    var data = JSON.parse(body);
  }
  console.log(data);
});
