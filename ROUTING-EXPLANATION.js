Routing Explanation

1.
var requestedWeather = new Weather(); //creates a new instance of Weather object with variable name requestedWeather

2.
requestedWeather.getCurrentWeather(city, functionCurrentHumidity); //functionCurrentHumidity gets sent to weather.js in the getCurrentWeather method and is then named "showFunction"

3.
$.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response) {
    //showFunction comes from "humidity-interface.js" and the name replaces functionCurrentHumidity, response is passed into the function
    showFunction(response);
  }).fail(function(error) { //if API call is rejected, error message will show to user
    $('.showWeather').text(error.responseJSON.message);
  });
};
