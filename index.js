var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
app.post('/foo', function(req, res) {

  var request = require('request');
  console.log("in post");
  var options={'text':req.body.Subject+" was sent from "+req.body.From
              }
 //console.log(req.body);
 //var options ={'text':'Got Blast'}
  request({
    url: process.env.SLACK_HOOK,
    method: "POST",
    json: true,   // <--Very important!!!
    body: options
}, function (error, response, body){
    console.log(response);
});
res.end("");

});
