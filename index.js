const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")

var app = express()
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static(__dirname + '/'));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/singnup.html")
})

app.post("/", function(req, res) {
  const user_fname = req.body.fname
  const user_lname = req.body.lname
  const user_email = req.body.email
  const list_id = "9bfb3e51f3"
  const apiKey = "f24ed5f30eb4f84d0351b1d489555f09-us2"
  const url = "https://us2.api.mailchimp.com/3.0/lists/" + list_id
  var data = {
    members: [{
      email_address: user_email,
      status: "subscribed",
      merge_fields: {
        FNAME: user_fname,
        LNAME: user_lname
      }
    }]
  }

  const JsonObject = JSON.stringify(data)
  const option = {
    method: "POST",
    auth: "naval:f24ed5f30eb4f84d0351b1d489555f09-us2",
  }

  const request = https.request(url, option, function(responce) {
    responce.on("data", function(data) {
      // console.log(JSON.parse(data))
    })
    console.log(responce.statusCode)
  if (responce.statusCode == 200) {
    res.sendFile(__dirname +"/sucsses.html")
  } else {
    res.sendFile(__dirname + "/failuer.html")
  }
  })
  request.write(JsonObject)
  request.end()
})

app.post("/Sucsses", function(req,res){
  res.redirect("/")
})

app.post("/failuer", function(req,res){
  res.redirect("/")
})


app.listen(process.env.PORT || 8080, function(req, res) {
  console.log("The server is up an running at port 8080");
})

// API KEYS
// f24ed5f30eb4f84d0351b1d489555f09-us2

// uniqe id
// 9bfb3e51f3
