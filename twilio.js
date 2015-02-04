var express = require('express');
var twilio = require('twilio');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	var twiml = new twilio.TwimlResponse();
    twiml.say('Welcome to Peace Leaders')
    .gather({ action:'https://secure-hollows-8464.herokuapp.com',
        finishOnKey:'*'
    }, function() {
        this.say('Press 1 to hear Pope Francis latest tweet ')
            .say('Press 2 for to hear Dalai Lama latest tweet');
    });

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});