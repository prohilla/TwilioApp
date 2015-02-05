var express = require('express');
var twilio = require('twilio');
var app = express();
var Twitter = require('twitter');
var client = new Twitter({
	  consumer_key: '6ijcT3P8IqxkmWPEzT0v20VVo',
	  consumer_secret: '5MmnwTd5Qmg2MPY3uBoa4boa2zu1rYCICDh1GHfsb0JBSnOVBR',
	  access_token_key: '2916652344-eIJpB9xrKnVRDVRA0w5QgMixkYBTlObV3ErrHn2',
	  access_token_secret: '6tVR4SA6vqKIfEYGbbbc2U7l9REvVV6cPUub8wjmTIIVT'
	});

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendfile(__dirname + '/index.html');
});

app.get('/call', function(req, res) {
	var twiml = new twilio.TwimlResponse();
    twiml.say('Welcome to Peace Leaders')
    .gather({ action:'https://secure-hollows-8464.herokuapp.com/input',
        method:'GET'
    }, function() {
        this.say('Press 1 to hear Pope Francis latest tweet ')
            .say('Press 2 for to hear Dalai Lama latest tweet');
    });

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

app.get('/input', function(req, res) {
	var digit =req.query.Digits.toString();
	if(digit==="1"){
		var twiml2 = new twilio.TwimlResponse();
		var params = {screen_name: 'Pontifex', count: 1};
		client.get('statuses/user_timeline', params, function(error, tweets, response){
		  if (!error) {
			  twiml2.say(tweets[0].text);
			    res.writeHead(200, {'Content-Type': 'text/xml'});
			    res.end(twiml2.toString());
		  }
		  else{
			  twiml2.say('Sorry');
			    res.writeHead(200, {'Content-Type': 'text/xml'});
			    res.end(twiml2.toString());
		  }
		});
		
		
	}
	if(digit==="2"){
		var twiml2 = new twilio.TwimlResponse();
		var params = {screen_name: 'dalailama', count: 1};
		client.get('statuses/user_timeline', params, function(error, tweets, response){
		  if (!error) {
			  twiml2.say(tweets[0].text);
			    res.writeHead(200, {'Content-Type': 'text/xml'});
			    res.end(twiml2.toString());
		  }
		  else{
			  twiml2.say('Sorry');
			    res.writeHead(200, {'Content-Type': 'text/xml'});
			    res.end(twiml2.toString());
		  }
		});
	}
	
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});