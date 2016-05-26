var apiKey = require('./../.env').apiKey; //allows for use of API key (in hidden .env file) to be used
var Weather = require('./../js/weather.js').Weather; //allows for Weather object to be imported and used (after being exported in weather.js)

$(document).ready(function(){

  var requestedWeather = new Weather(); //creates a new instance of Weather object

//Fahrenheit--------------------------------------------------------------------
  $('#fahrenheit').click(function(){
    var city = $('#location').val(); //user inputted location from weather.html
    $('#location').val(""); //clears the text entry after click
    $('.showWeather').text("The city you have chosen is " + city + ".");

    var functionCurrentFahrenheit = function(response) {
      requestedWeather.kelvin = response.main.temp;
      $('.showWeather').text("The temperature in " + city + " is " + requestedWeather.fahrenheitConversion() + "°F.");
    };

    var functionForecastFahrenheit = function(response) {
      $('.showForecast').empty();
      $('.showForecast').append("The 5-day forecast for temperature in " + city + " is:");
      for (var i = 0; i <= 4; i++) {
        requestedWeather.kelvin = response.list[i].main.temp;
        $('.showForecast').append("<li>" + "Day " + (i + 1) + ": " + requestedWeather.fahrenheitConversion() + "°F" + "</li>");
      };
    };

    requestedWeather.getCurrentWeather(city, functionCurrentFahrenheit);
    requestedWeather.getFiveDayForecast(city, functionForecastFahrenheit);
  });

//Celcius-----------------------------------------------------------------------
  $('#celcius').click(function(){
    var city = $('#location').val();
    $('#location').val("");
    $('.showWeather').text("The city you have chosen is " + city + ".");

    var functionCurrentCelcius = function(response) {
      requestedWeather.kelvin = response.main.temp;
      $('.showWeather').text("The temperature in " + city + " is " + requestedWeather.celciusConversion() + "°C.");
    };

    var functionForecastCelcius = function(response) {
      $('.showForecast').empty();
      $('.showForecast').append("The 5-day forecast for temperature in " + city + " is:");
      for (var i = 0; i <= 4; i++) {
        requestedWeather.kelvin = response.list[i].main.temp;
        $('.showForecast').append("<li>" + "Day " + (i + 1) + ": " + requestedWeather.celciusConversion() + "°C" + "</li>");
      };
    };

    requestedWeather.getCurrentWeather(city, functionCurrentCelcius);
    requestedWeather.getFiveDayForecast(city, functionForecastCelcius);
  });

});
