var apiKey = require('./../.env').apiKey;
var Weather = require('./../js/weather.js').Weather;

$(document).ready(function() {
  var requestedWeather = new Weather();

  function initialize() {
    var mapProp = {
      center:new google.maps.LatLng(requestedWeather.coordinateLatLong[0],requestedWeather.coordinateLatLong[1]),
      zoom:2,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map=new google.maps.Map(document.getElementById("weatherLocation"),mapProp);
  }
  google.maps.event.addDomListener(window, 'load', initialize);

  // $('#celcius').click(function() {
  //   var city = $('#location').val();
  //   requestedWeather.getCoordinates(city);
  //
  //   $.get('http://maps.google.com/maps/api/js?sensor=false').then(function(response) {
  //     var map = new google.maps.Map(document.getElementById('weatherLocation'), {
  //       center: {lat: -34.397, lng: 150.644},
  //       zoom: 8
  //     });
  //   }).fail(function(error) {
  //     $('.showWeather').text(error.responseJSON.message);
  //
  //   // var map;
  //   //   function initMap() {
  //   //     map = new google.maps.Map(document.getElementById('weatherLocation'), {
  //   //       center: {lat: -34.397, lng: 150.644},
  //   //       zoom: 8
  //   //     });
  //   //   }
  //   });
  // });
});
