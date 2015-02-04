var express = require('express');
var twilio = require('twilio');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	var twiml = new twilio.TwimlResponse();
    twiml.say('Welcome to Peace Leaders')
    .gather({ action:'https://ancient-beyond-7874.herokuapp.com/input',
        finishOnKey:'*'
    }, function() {
        this.say('Press 1 to hear Pope Francis latest tweet ')
            .say('Press 2 for to hear Dalai Lama latest tweet');
    });

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

app.post('/input', function(req, res) {
	var digit =req.param('Digits');
	var leader="none";
	if(digit===1){
		this.leader="Pope Francis";
		
	}
	if(digit===2){
		this.leader="Dalai Lama";
		
	}
	
	var twiml2 = new twilio.TwimlResponse();
    twiml2.say('you have chosen'+this.leader+'');

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml2.toString());
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});