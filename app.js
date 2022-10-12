var express  = require('express');

var app      = express();

//var app      = require('express')();

 

//var http     = require('http');

//var server   = http.Server(app);

var http     = require('http').Server(app);

 

//var socketio = require('socket.io');

//var io       = socketio(server);

var io       = require('socket.io')(http);

 

const path = require('path');

 

var SerialPort = require('serialport').SerialPort;

var ReadlineParser = require('@serialport/parser-readline').ReadlineParser;

var parsers    = SerialPort.parsers;

var sp = new SerialPort( {

  path:'COM7',

  baudRate: 9600

});

var parser     = sp.pipe(new ReadlineParser({

  delimiter: '\r\n'

}));

 

 

 

var port = 3000;

 

sp.pipe(parser);

 

sp.on('open', () => console.log('Port open'));

 

parser.on('data', function(data)

{

	console.log(data.toString());

	if(data.substring(0,5) == "servo"){

		if(data.substring(5,6) == "0")	servoStatus = "0";

		else if(data.substring(5,7) == "30")	servoStatus = "30";
		
		else if(data.substring(5,7) == "60")	servoStatus = "60";
		
		else if(data.substring(5,7) == "90")	servoStatus = "90";
		
		else if(data.substring(5,8) == "120")	servoStatus = "120";
		
		else if(data.substring(5,8) == "150")	servoStatus = "150";

		else if(data.substring(5,8) == "180")	servoStatus = "180";
		else
		io.emit('servo', servoStatus);

	}
	
	else if(data.substring(0,5) == "servo"){

		servoStatus = data.substring(5);

		io.emit('servo', servoStatus);

		console.log('servoStatus: ' + servoStatus);

	}
	
	else if(data.substring(0,4) == "mode"){

		if(data.substring(4,5) == "a")	modeStatus = "auto";
		else if(data.substring(4,5) == "b")	modeStatus = "manual";
		io.emit('mode', modeStatus);

		console.log('mode Status: ' + modeStatus);

	}
	
	else if(data.substring(0,3) == "adc"){

		adcValue = data.substring(3);

		io.emit('adc', adcValue);

		console.log('adc value: ' + adcValue);

	}

});


app.get('/a',function(req,res)

{

	sp.write('a\n\r', function(err){

		if (err) {

            return console.log('Error on write: ', err.message);

        }

        console.log('send: auto');

		res.writeHead(200, {'Content-Type': 'text/plain'});

		res.end('auto\n');
		

	});

});

app.get('/b',function(req,res)

{

	sp.write('b\n\r', function(err){

		if (err) {

            return console.log('Error on write: ', err.message);

        }

        console.log('send: manual');

		res.writeHead(200, {'Content-Type': 'text/plain'});

		res.end('manual\n');
		

	});

});

app.get('/up',function(req,res)

{

	sp.write('.\n\r', function(err){

		if (err) {

            return console.log('Error on write: ', err.message);

        }

        console.log('send: up');

		res.writeHead(200, {'Content-Type': 'text/plain'});

		res.end('up\n');
		

	});

});

app.get('/down',function(req,res)

{

	sp.write(',\n\r', function(err){

		if (err) {

            return console.log('Error on write: ', err.message);

        }

        console.log('send: down');

		res.writeHead(200, {'Content-Type': 'text/plain'});

		res.end('down\n');
		

	});

});

app.get('/servo0',function(req,res)

{

	sp.write('0\n\r', function(err){

		if (err) {

            return console.log('Error on write: ', err.message);

        }

        console.log('send: servo0');

		res.writeHead(200, {'Content-Type': 'text/plain'});

		res.end('Servo 0\n');
		

	});

});

app.get('/servo30',function(req,res)

{

	sp.write('1\n\r', function(err){

		if (err) {

            return console.log('Error on write: ', err.message);

        }

        console.log('send: servo30');

		res.writeHead(200, {'Content-Type': 'text/plain'});

		res.end('Servo 30\n');

	});

});


app.get('/servo60',function(req,res)

{

	sp.write('2\n\r', function(err){

		if (err) {

            return console.log('Error on write: ', err.message);

        }

        console.log('send: servo60');

		res.writeHead(200, {'Content-Type': 'text/plain'});

		res.end('Servo 60\n');

	}); 

});

app.get('/servo90',function(req,res)

{

	sp.write('3\n\r', function(err){

		if (err) {

            return console.log('Error on write: ', err.message);

        }

        console.log('send: servo90');

		res.writeHead(200, {'Content-Type': 'text/plain'});

		res.end('Servo 90\n');

	}); 

});

app.get('/servo120',function(req,res)

{

	sp.write('4\n\r', function(err){

		if (err) {

            return console.log('Error on write: ', err.message);

        }

        console.log('send: servol20');

		res.writeHead(200, {'Content-Type': 'text/plain'});

		res.end('Servo 120\n');

	}); 

});

app.get('/servo150',function(req,res)

{

	sp.write('5\n\r', function(err){

		if (err) {

            return console.log('Error on write: ', err.message);

        }

        console.log('send: servo150');

		res.writeHead(200, {'Content-Type': 'text/plain'});

		res.end('Servo 150\n');

	}); 

});

app.get('/servo180',function(req,res)

{

	sp.write('6\n\r', function(err){

		if (err) {

            return console.log('Error on write: ', err.message);

        }

        console.log('send: servo180');

		res.writeHead(200, {'Content-Type': 'text/plain'});

		res.end('Servo 180\n');

	});

});

 

app.use(express.static(__dirname + '/public'));

 

http.listen(port, function() {  // server.listen(port, function() {

    console.log('listening on *:' + port);

});