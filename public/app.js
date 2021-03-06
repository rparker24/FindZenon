$(document).ready(function() {
  $.getJSON("/sightings", function(data) {
    console.log(data);

    // add array of headers that randomizes on each page load
    $('#checkin-time').html(data.checkin_time);
    $('#venue-name').html(data.name);
    $('#street-address').html(data.street_address);
    $('#city').html(data.city);
    $('#state').html(data.state);
    $('#total-checkins').html(data.checkin_count);
  });

  $.getJSON("/history", function(historyData) {
    console.log(historyData);

    for (i = 0; i < historyData.length; i++) {
      $('#history-list').append("<p>" + historyData[i] + "</p>");
    }
  });



  // add route to find unique values of last 10(?) checkins to display
});
