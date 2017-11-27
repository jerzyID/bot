const express = require('express')
const bodyParser = require('body-parser')
const request = ('request')
const app = express()

const token = process.env.FV_VERIFY_TOKEN
const access = process.env.FB_ACCESS_TOKEN

app.set('port', (process.env.PORT))


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/', function (req,res) {
	res.send('Its working')
})

app.get('/webhook/', function(req, res){
	if(req.query['hub.verify_token'] === token) {
			res.send(req.query['hub.challenge'])
		}
	res.send ('No entry')	
})

app.post('/webhook', (req, res) => {  

  // Parse the request body from the POST
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

	// Gets the body of the webhook event
	let webhook_event = entry.messaging[0];
	console.log(webhook_event);

	// Get the sender PSID
	let sender_psid = webhook_event.sender.id;
	console.log('Sender PSID: ' + sender_psid);

	});

    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

app.listen(app.get('port'), function(){
	console.log('running on port', app.get('port'))
})