var http = require('http');
var twilio = require('twilio');
http.createServer(function handler(req, res) {
	 //Create TwiML response
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
    
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
