const express = require("express");
const https = require("https");// one of the native node modules already bundled in our package
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

//When user tries to get at home page i.e root route
// app.get("/", function (request, response) {
//     const query="London";
//     const apikey="58a39f059f1bd835a00185aec3ddc3c3";
//     const unit="metric";
//     const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
//     https.get(url, function (res) {
//         console.log(res.statusCode);
//         res.on("data",function(data)
//         {
//     //   console.log(data);
//     // JSON.parse(data);
//     const weatherdata=JSON.parse(data);
//     console.log(weatherdata);
//     const temp=weatherdata.main.temp;
//     const weatherdescription=weatherdata.weather[0].description;
//     // const icon=weatherdata.description[0].icon;
//     const icon=weatherdata.weather[0].icon;
//     const imageurl="http://openweathermap.org/img/wn/" + icon + "@2x.png";
//     response.write("<p>The weather description currently is "+weatherdescription +"</p>");
//     response.write("<h1>The temperature in London is "+ temp +"degree celsius</h1>");
//     response.write("<img src=" + imageurl+">");
//     response.send();
//     // console.log(temp);
//         });
//     });
//     // response.send("Server is up and running");
// });
app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html");
});
//body parser allows to look through the body of the post request
app.post("/", function (request, response) {
    // console.log(request.body.cityName);
        const query=request.body.cityName;
    const apikey="58a39f059f1bd835a00185aec3ddc3c3";
    const unit="metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
    https.get(url, function (res) {
        // console.log(res.statusCode);
        res.on("data",function(data)
        {
    //   console.log(data);
    // JSON.parse(data);
    const weatherdata=JSON.parse(data);
    // console.log(weatherdata);
    const temp=weatherdata.main.temp;
    const weatherdescription=weatherdata.weather[0].description;
    // const icon=weatherdata.description[0].icon;
    const icon=weatherdata.weather[0].icon;
    const imageurl="http://openweathermap.org/img/wn/" + icon + "@2x.png";
    response.write("<p>The weather description currently is "+weatherdescription +"</p>");
    response.write("<h1>The temperature in"+ query +"is" + temp +"degree celsius</h1>");
    response.write("<img src=" + imageurl+">");
    response.send();
    // console.log(temp);
        });
    });
    // console.log("Post request received!");
});
app.listen(3000, function (response) {
    console.log(response);
});
