var apiKey = require('./../.env').apiKey;
var Weather = require('./../js/weather.js').Weather;

$(document).ready(function(){
  $('#weatherLocation').click(function(){

    //get user input
    var city = $('#location').val();
    $('#location').val("");

    $('.showWeather').text("The city you have chosen is " + city + ".");

    var requestedWeather = new Weather();

    var showWeather = function(response) {
      $('.showWeather').text("The humidity in " + city + " is " + response.main.humidity + "%.");
    };

    var showForecast = function(response) {
      $('.showForecast').append("The 5-day forecast for humidity in " + city + " is:");
      for (var i = 0; i <= 4; i++) {
        $('.showForecast').append("<li>" + "Day " + (i + 1) + ": " + response.list[i].main.humidity + "%" + "</li>");
      }
    };

    requestedWeather.getWeather(city, showWeather);
    requestedWeather.getForecast(city, showForecast);

  });
});
