var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var SightingSchema = new Schema({
  created_at: {
    date: {
      type: Date,
      default: Date.now
    },
    readable: {
      type: String,
      default: moment().format("MMMM Do YYYY, h:mm:ss A")
    },
    unix: {
      type: Number,
      default: moment().unix()
    }
  },
  checkin_count: {
    type: Number
  },
  checkin_time: {
    type: String,
    required: "Checkin date and time is required"
  },
  name: {
    type: String,
    required: "Venue Name is required"
  },
  street_address: {
    type: String
  },
  city: {
    type: String,
    required: "Venue City is required"
  },
  state: {
    type: String,
    required: "Venue State is required"
  },
  category: {
    type: String
  },
  link: {
    type: String
  },
  mayor: {
    type: Boolean
  }
});

var Sighting = mongoose.model('Sighting', SightingSchema);
module.exports = Sighting;
