const { json } = require('body-parser')
const express = require('express')
const https = require('https')
const app = express()
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended:true}))
app.listen(200,function(){
    console.log("server started")
})

app.get("/",function(req,res){

res.sendFile(__dirname + "/index.html")
   
})
app.post("/",function(req,res){
    const apikey = "95d03e3ab5ab9500605bec41d6c52d06"
    var cityname = req.body.cityname
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid="+apikey+"&units=metric"
        
        https.get(url,function(response){

       
            response.on("data",function(data){

          
                

                var weatherinfo = JSON.parse(data)
                var weather = weatherinfo.weather[0].main
                var temp = weatherinfo.main.temp
                var name = weatherinfo.name
                var icon = weatherinfo.weather[0].icon
                var imageurl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
                res.write("<h1>"+"the weather in " +name+  " is " +weather+"</h1>")
                res.write("  the temperature in "+name+" is "+temp+" deg cel")
                res.write("<br><img src= "+imageurl+">")
                res.send()
                console.log(cityname)

        
             })
        })
   
    })
    // https.get(url,function(response){
       
    //     response.on("data",function(data){
        // const apikey = "95d03e3ab5ab9500605bec41d6c52d06"
        // const url = "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid="+apikey+"&units=metric"

    //         var weatherinfo = JSON.parse(data)
    //         var weather = weatherinfo.weather[0].main
    //         var temp = weatherinfo.main.temp
    //         var name = weatherinfo.name
    //         var icon = weatherinfo.weather[0].icon
    //         var imageurl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
    //         res.write("<h1>"+"the weather in " +name+  " is " +weather+"</h1>")
    //         res.write("  the temperature in "+name+" is "+temp+" deg cel")
    //         res.write("<br><img src= "+imageurl+">")
    //         res.send()

        
    //     })
    // })
