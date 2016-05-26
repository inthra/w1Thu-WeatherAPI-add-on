var apiKey = require('./../.env').apiKey; //allows for use of API key (in hidden .env file) to be used
var Weather = require('./../js/weather.js').Weather; //allows for Weather object to be imported and used (after being exported in weather.js)

$(document).ready(function(){

  var requestedWeather = new Weather(); //creates a new instance of Weather object with variable name requestedWeather

  $('#humidity').click(function(){ //user submits location and clicks button

    //get user input
    var city = $('#location').val(); //user inputted location from weather.html
    $('#location').val(""); //clears the text entry after click
    $('.showWeather').text("The city you have chosen is " + city + ".");

    //functionCurrentHumidity gets created here, gets sent to backend as showFunction, and gets returned humidity to display to user
    var functionCurrentHumidity = function(response) {
      $('.showWeather').text("The humidity in " + city + " is " + response.main.humidity + "%.");
    }; //3 lines above equivalent to "showFunction(response)" on weather.js

    var functionForecastHumidity = function(response) {
      $('.showForecast').empty();
      $('.showForecast').append("The 5-day forecast for humidity in " + city + " is:");
      for (var i = 0; i <= 4; i++) {
        $('.showForecast').append("<li>" + "Day " + (i + 1) + ": " + response.list[i].main.humidity + "%" + "</li>");
      }
    };

    requestedWeather.getCurrentWeather(city, functionCurrentHumidity); //functionCurrentHumidity gets sent to weather.js in the getCurrentWeather method and is then named "showFunction"
    requestedWeather.getFiveDayForecast(city, functionForecastHumidity);
    requestedWeather.getCoordinates(city);
    console.log(requestedWeather.coordinateLatLong[0]);
    console.log(requestedWeather.coordinateLatLong[1]);
    console.log(requestedWeather.coordinateLatLong[2]);

  });
});
