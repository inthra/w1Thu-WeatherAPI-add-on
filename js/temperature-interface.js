var apiKey = require('./../.env').apiKey; //allows for use of API key (in hidden .env file) to be used
var Weather = require('./../js/weather.js').Weather; //allows for Weather object to be imported and used (after being exported in weather.js)

$(document).ready(function(){

  $('#fahrenheit').click(function(){
    var city = $('#location').val(); //user inputted location from weather.html
    $('#location').val(""); //clears the text entry after click
    $('.showWeather').text("The city you have chosen is " + city + ".");

    var requestedWeather = new Weather(); //creates a new instance of Weather object

    //gets the current temp from API call in weather.js and passes temp to kelvin property
    $.get(requestedWeather.getWeather(city)).then(function(response) {
      requestedWeather.kelvin = response.main.temp;
      $('.showWeather').text("The temperature in " + city + " is " + requestedWeather.fahrenheitConversion() + "° Fahrenheit."); //runs temp conversion to print accurate temp to page
    }).fail(function(error) {
      $('.showWeather').text(error.responseJSON.message); //returns error to user if API call is rejected
    });

    //gets the forecasted temps from API call in weather.js and passes temp for each day to kelvin
    $.get(requestedWeather.getForecast(city)).then(function(response) {
      $('.showForecast').append("The 5-day forecast for temperature in " + city + " is:");
      //loops through API array to pull out temps for 5 day forecast
      for (var i = 0; i <= 4; i++) {
        requestedWeather.kelvin = response.list[i].main.temp;
        $('.showForecast').append("<li>" + "Day " + (i + 1) + ": " + requestedWeather.fahrenheitConversion() + "°F" + "</li>"); //runs temp conversion for each days temp to print correctly
      }
    }).fail(function(error) {
      $('.showForecast').text(error.responseJSON.message);
    });
  });


  $('#celcius').click(function(){
    var city = $('#location').val();
    $('#location').val("");
    $('.showWeather').text("The city you have chosen is " + city + ".");

    var requestedWeather = new Weather();

    $.get(requestedWeather.getWeather(city)).then(function(response) {
      requestedWeather.kelvin = response.main.temp;
      $('.showWeather').text("The temperature in " + city + " is " + requestedWeather.celciusConversion() + "° Celcius.");
    }).fail(function(error) {
      $('.showWeather').text(error.responseJSON.message);
    });

    $.get(requestedWeather.getForecast(city)).then(function(response) {
      $('.showForecast').append("The 5-day forecast for temperature in " + city + " is:");
      for (var i = 0; i <= 4; i++) {
        requestedWeather.kelvin = response.list[i].main.temp;
        $('.showForecast').append("<li>" + "Day " + (i + 1) + ": " + requestedWeather.celciusConversion() + "°C" + "</li>");
      }
    }).fail(function(error) {
      $('.showForecast').text(error.responseJSON.message);
    });
  });
});
