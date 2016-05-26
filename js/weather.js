var apiKey = require('./../.env').apiKey; //allows for use of API key (in hidden .env file) to be used

var Weather = function() { //Weather object
  this.kelvin = undefined; //property of Weather object that will get temp from API call (look at requestedWeather.kelvin in temperature-interface.js)
  this.coordinateLatLong = [37.42,-122.08,8];
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
  //submits API call to openweathermap for current weather (humidity or temperature)
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response) {
    //showFunction comes from "humidity-interface.js" and the name replaces functionCurrentHumidity, response is passed into the function
    showFunction(response);
  }).fail(function(error) { //if API call is rejected, error message will show to user
    $('.showWeather').text(error.responseJSON.message);
  });
};

//method for returning forecasted weather for user inputted location (city)
Weather.prototype.getFiveDayForecast = function(city, showFunction) {
  //submits API call to openweathermap for forecasted weather (humidity or temperature)
  $.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey).then(function(response) {
    showFunction(response);
  }).fail(function(error) {
    $('.showForecast').text(error.responseJSON.message);
  });
};

Weather.prototype.getCoordinates = function(city) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response) {
  this.coordinateLatLong[0] = response.coord.lat;
  this.coordinateLatLong[1] = response.coord.lon;
  this.coordinateLatLong[2] = 15;
  return this.coordinateLatLong;
  });
};

//exporting is required for using Weather object in -interface.js files
exports.Weather = Weather;
