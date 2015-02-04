var express = require('express');
var twilio = require('twilio');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	var twiml = new twilio.TwimlResponse();
    twiml.say('Welcome to Peace Leaders')
    .gather({
        finishOnKey:'*'
    }, function() {
        this.say('Press 1 to hear Pope Francis latest tweet ')
            .say('Press 2 for to hear Dalai Lama latest tweet');
    });

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

app.post('/', function(req, res) {
	var digit =request.param('Digits');
	if(digit===1){
		var twiml1 = new twilio.TwimlResponse();
	    twiml1.say('you have chosen Pope francis');

	    res.writeHead(200, {'Content-Type': 'text/xml'});
	    res.end(twiml1.toString());
		
	}
	if(digit===2){
		var twiml2 = new twilio.TwimlResponse();
	    twiml2.say('you have chosen dalai lama');

	    res.writeHead(200, {'Content-Type': 'text/xml'});
	    res.end(twiml2.toString());
		
	}
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});