// This is our API key
var APIKey = "de48a2b13fa129b84126212d5c45cb16";

// Here we are building the URL we need to query the database

// Here we run our AJAX call to the OpenWeatherMap API
// $.ajax({
//   url: queryURL,
//   method: "GET"
// })
  // We store all of the retrieved data inside of an object called "response"

$("#searched-city").click(function(event){
    event.preventDefault();
    var searchCity = $("#search-city").val()
    weather(searchCity)
    // .push(title)
});

function weather (searchCity) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${APIKey}`;
    console.log(queryURL)
$.ajax ({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response);

// $("#chosen-location").text(searchCity);

    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(response);

    // Transfer content to HTML
    $("#chosen-location").html(response.name);
    $("#temperature-card").text(((response.main.temp - 273.15) * 1.80 + 32).toFixed(2));
    $("#humidity-card").text(response.main.humidity);
    $("#wind-card").html(response.wind.speed);
    $("#uvindex-card").text(response.main.humidity);
    
    // Convert the temp to fahrenheit
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;

    // add temp content to html
    $(".temp").text("Temperature (K) " + response.main.temp);
    $(".tempF").text("Temperature (F) " + tempF.toFixed(2));
});
}