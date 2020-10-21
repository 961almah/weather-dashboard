var currentLon;
var currentLat;
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
    fiveDays(searchCity)
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

    // pull the current longitude
currentLon = response.coord.lon;
// pull the current latitude
currentLat = response.coord.lat;
// insert both into the URL
var uvIndexURL = `http://api.openweathermap.org/data/2.5/uvi?lat=${currentLat}&lon=${currentLon}&appid=${APIKey}`;
console.log(uvIndexURL);
// make API request
$.ajax({
    url: uvIndexURL,
    method: "GET"
}).then(function (uvresponse) {
    $("#uv-index").empty()
    // get the current UV index
    var uvIndexNumber = uvresponse.value;
    console.log(uvIndexNumber)
    // add the current UV index to the page
    // check UV index
    if (uvIndexNumber >= 8) {
        // if high make color red
        var uvHigh = $('<p style="background-color:red;">').text("UV index: " + uvIndexNumber);
        $("#uv-index").append(uvHigh);
    } else if (uvIndexNumber >= 3 && uvIndexNumber <= 7.99) {
        // if moderate make color yellow
        var uvModerate = $('<p style="background-color:yellow;">').text("UV index: " + uvIndexNumber);
        $("#uv-index").append(uvModerate);
    } else {
        // if low make color green
        var uvLow = $('<p style="background-color:green;">').text("UV index: " + uvIndexNumber);
        $("#uv-index").append(uvLow);
    }
});
});

}

// function fiveDays (searchCity) {
//     var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&units=imperial&cnt=5&appid=${APIKey}`;
//     $.ajax ({
//         url: queryURL,
//         method: "GET"
//         }).then(function(response){
//             console.log(response);
//             console.log(queryURL);
//         })
//     }

    function fiveDays(searchCity) {
        // API URL
        var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&units=imperial&cnt=5&appid=${APIKey}`;
        // make API request
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            // add title to forecast section
            var forecastTitle = $("<h2>").text("Five Day Forecast:")
            // empty out the forcast section on click
            $("#forecast").empty();
            // add the title to the page
            $("#forecast").append(forecastTitle);
            // loop through all days
            for (let i = 0; i < response.list.length; i++) {
                // empty out the days
                $("#day" + i).empty();
                // Pull the date
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() + i + 1);
                // put date in p tag
                var dateFore = $("<p>").text("Date: " + date);
                // add the date to the page
                $("#day" + i).append(dateFore);
                // pull the icon
                var iconFore = $("<img src='http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + ".png' style='margin-left:10px;'/>");
                // add the icon to the page
                $("#day" + i).append(iconFore);
                // pull the temp
                var tempFore = $("<p>").text("Tempurature:\n" + response.list[i].main.temp + "°F");
                // add the temp to the page
                $("#day" + i).append(tempFore);
                // pull the humidity
                var humFore = $("<p>").text("Humidity:\n" + response.list[i].main.humidity + "%");
                // add the humidity to the page
                $("#day" + i).append(humFore);
            }
        });
    }