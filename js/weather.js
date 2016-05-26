var apiKey = require('./../.env').apiKey; //allows for use of API key (in hidden .env file) to be used

var Weather = function(kelvin) {
  this.kelvin = kelvin; //property of Weather object that holds temp from API
};

//temp converted to C and limited to 2 decimal places
Weather.prototype.celciusConversion = function() {
  this.celcius = this.kelvin - 273.15;
  return this.celcius.toFixed(2);
};

//temp converted to F and limited to 2 decimal places
Weather.prototype.fahrenheitConversion = function() {
  this.fahrenheit = (this.kelvin * (9/5) - 459.67);
  return this.fahrenheit.toFixed(2);
};

//method for returning current weather for user inputted location (city)
Weather.prototype.getCurrentWeather = function(city, showFunction) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response) {
    showFunction(response);
  }).fail(function(error) {
    $('.showWeather').text(error.responseJSON.message);
  });
};

//method for returning forecasted weather for user inputted location (city)
Weather.prototype.getFiveDayForecast = function(city, showFunction) {
  $.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey).then(function(response) {
    showFunction(response);
  }).fail(function(error) {
    $('.showForecast').text(error.responseJSON.message);
  });
};

//exporting is required for using Weather object in -interface.js files
exports.Weather = Weather;
