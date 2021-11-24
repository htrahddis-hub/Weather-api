const express = require("express");
const https = require('https');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app =express();
const date = require(__dirname+'/date.js');
require('dotenv').config();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/",function (req,res) {
    let time=date.getDate();
   res.render("index",{city:"CityName",temp:26,description:"pleasent weather",wind:16,humid:04,icon:"https://i.imgur.com/Qw7npIg.png",time:time});
});

app.post("/", function (req,res) {
    const cityname =req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid="+process.env.API_ID+"&units=Metric";
    https.get(url, function (resp) {
        if(resp.statusCode==200){
            resp.on("data", function (data) {
                const weatherdata =JSON.parse(data);
                const temp=Math.round(weatherdata.main.temp * 10) / 10;
                const des=weatherdata.weather[0].description;
                const wind=weatherdata.wind.speed;
                const humid =weatherdata.main.humidity;
                const icon="http://openweathermap.org/img/wn/"+weatherdata.weather[0].icon+"@2x.png";
                console.log(weatherdata);
                console.log(des);
                let time=date.getDate();
                res.render("index",{city:cityname,temp:temp,description:des,wind:wind,humid:humid,icon:icon,time:time});
            })
        }
        else{
            let time=date.getDate();
            res.render("index",{city:"Not Found",temp:0.0,description:"N/A enter valid city name or check your spelling",wind:0.0,humid:0.0,icon:".",time:time});
        }
        console.log(resp.statusCode);
    });
});


//Due to this you can run this app on both local PC and a server
let port=process.env.PORT;
if(port==null||port=="")
  port=3000;

app.listen(port, function() {
  console.log("Server started on port 3000");
});
