// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.route("/api/timestamp/:timeData?").get(function(req, res) {
  var date = new Date()
  var timeData = req.params.timeData 
  
  if(!req.params.timeData) {
    res.json({unix: Date.parse(date.toUTCString()), utc: date.toUTCString()})
  }   
  else if(timeData/2 === +timeData/2) {
    timeData*=1000
    var parsed = new Date(timeData)
    res.json({unix: timeData, utc: parsed.toUTCString()}) 
  }
  else if(typeof timeData !== 'number') {
    var invert = new Date(timeData)
    try {
          res.json({unix: Date.parse(invert.toISOString()), utc: invert.toUTCString()})
    }catch(error) {
      res.json({error: "Invalid Date"})
    }
  }
   

})


  


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});