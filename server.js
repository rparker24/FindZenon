var express =  require('express');
var app = express();
var request = require('request');
var moment = require('moment');
var mongoose = require('mongoose');
var token = require('./key.js');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

mongoose.connect('mongodb://localhost/Zenon');
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});
db.once('open', function() {
  console.log('Mongoose connection successful');
});

var Sighting = require('./models/Sighting');

var oauth_token = token.key;

var queryURL = "https://api.foursquare.com/v2/users/1244852?oauth_token=" + oauth_token + "&v=20170529";

request(queryURL, function(error, response, body) {
  if (!error && response.statusCode == 200) {
    var data = JSON.parse(body);
  }
  var checkinData = data.response.user.checkins.items[0];
  var venueData = checkinData.venue;

  // make sure it is Zenon before data output
  if (data.response.user.firstName === "Zenon") {

    var result = {};
    result.checkin_count = data.response.user.checkins.count;
    result.checkin_time = moment.unix(checkinData.createdAt).format("MM/DD/YYYY h:mm:ss A");
    result.name = venueData.name;
    result.street_address = venueData.location.address;
    result.city = venueData.location.city;
    result.state = venueData.location.state;
    result.category = venueData.categories[0].name;
    result.link = venueData.url;
    result.mayor = checkinData.isMayor;

    var SightingData = new Sighting(result);

    SightingData.save(function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        console.log(doc);
      }
    });
  }
});

app.get('/', function(req, res) {
  res.send(index.html);
});

// check and remove dups in db when also finding record to display
app.get('/sightings', function(req, res) {

  Sighting.findOne({})
    .sort({ created_at: -1 })
    .exec(function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        res.json(doc);
      }
    });
});

app.get('/history', function(req, res) {

  Sighting.find({})
    .distinct('checkin_time', {})
    .exec(function(err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
      }
    });
});

var PORT = 3003;

app.listen(PORT, function() {
  console.log('App running on port ' + PORT);
});
