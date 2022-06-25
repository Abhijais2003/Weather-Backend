const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {
   res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
     const city = req.body.cityName ;
     const apiKey = "e1d8b29bda1c4ecf1f03bae54a56311e";
     const units = "metric";
     const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + units;

     https.get(url, function(response) {
       console.log(response.statusCode);

       response.on('data', (d) => {
         const weatherData = JSON.parse(d);
         const temp = weatherData.main.temp;
         const weatherDescription = weatherData.weather[0].description;
         const icon = weatherData.weather[0].icon;
         const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
         res.write("<p>The weather is currently " + weatherDescription + " </p>");
         res.write("<h1>The temperature in " + city + " is " + temp + " Celcius.</h1>");
         res.write("<img src=" + imageURL + ">");
         res.send();
       })
     })
})



app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})
