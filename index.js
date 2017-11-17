var express = require('express');
var app = express();
var url = require('url');
var request = require('request');

var format = ".json";


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('port', (process.env.PORT || 9001));


app.get('/', function(req, res){
  res.send('Running!!');
});


app.post('/post', function(req, res){
  var query = req.body.text

  var parsed_url = url.format({
    pathname: req.body.text + format,
  });

  console.log(parsed_url);

  request(parsed_url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);


      var body = {
        response_type: "in_channel",
        "attachments": [
          {
            "text": "Glad to hear you're ready to give me your birthday"
          }
        ]
      };
      res.send(body);
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
