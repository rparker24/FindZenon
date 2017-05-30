var express =  require('express');
var app = express();
var request = require('request');
var moment = require('moment');

app.use(express.static('public'));

var queryURL = "https://api.foursquare.com/v2/users/1244852?oauth_token=ESCJCO5KCZJBIKX0PUVHGVQL3YZK4MIMCOWXZTKKNDGNCJOU&v=20170529";

request(queryURL, function(error, response, body) {
  if (!error && response.statusCode == 200) {
    var data = JSON.parse(body);
  }
  var checkinData = data.response.user.checkins.items[0];
  var venueData = checkinData.venue;
  if (data.response.user.firstName === "Zenon") {
    console.log('Zenon located at: \n', venueData.name, '\n', venueData.location.formattedAddress, '\n', moment.unix(checkinData.createdAt).format("MM/DD/YYYY h:mm:ss A"));
  }
});
