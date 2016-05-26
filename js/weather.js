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
Weather.prototype.getWeather = function(city) {
  return 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;
};

//method for returning forecasted weather for user inputted location (city)
Weather.prototype.getForecast = function(city) {
  return 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey;
};

//exporting is required for using Weather object in -interface.js files
exports.Weather = Weather;
