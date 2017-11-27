const express = require('express')
const bodyParser = require('body-parser')
const request = ('request')
const app = express()

app.set('port', (process.env.PORT))


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/', function (req,res) {
	res.send('Its working')
})

app.get('/webhook/', function(req, res){
	if(req.query['hub.verify_token'] === 
		'my_token') {
			res.send(req.query['hub.challenge'])
		}
	res.send ('No entry')	
})

app.listen(app.get('port'), function(){
	console.log('running on port', app.get('port'))
})