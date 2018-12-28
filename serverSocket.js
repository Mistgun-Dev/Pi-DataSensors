//Déclaration des chargements des librairies
var express = require("express");
var app     = express();
var path    = require("path");
var http = require('http').Server(app);
var port = 1234;
var net = require('net');
var io = require('socket.io')(http);
var ss = require('socket.io-stream');
const moduleUltrason = require('./ultrason.js');
const moduleTemperature = require('./temperature.js');
const moduleInfraRed = require('./infrarouge.js');

//Serveur Socket Prof
var serverProf = net.createServer(function(socket) {
	socket.write('Echo server\r\n');
	socket.pipe(socket);
});

serverProf.listen(55555, '127.0.0.1');

//Utilisation du dossier web/ pour la partie HTML 
app.use(express.static(__dirname + '/web'));

//Déclaration des fichiers .html pour les références
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/web/index.html'));
});

app.get('/distance',function(req,res){
  res.sendFile(path.join(__dirname+'/web/distance.html'));
});

app.get('/temperature',function(req,res){
  res.sendFile(path.join(__dirname+'/web/temperature.html'));
});

app.get('/infrared',function(req,res){
  res.sendFile(path.join(__dirname+'/web/infrared.html'));
});

var dataGlobal = { distance : -1,
		   temperature : -1,
		   code : -1
		 }

//Récupération et envoi des données ultrason en JSON au serveur
moduleUltrason.getDistance(function(result)
{
  dataGlobal.distance = result
  let data = { distance: result }
  io.emit('dataDistance', data)

});

//Récupération et envoi des données de température en JSON au serveur
setInterval(function()
{
  moduleTemperature.getTemperature(function(result)
  {
    dataGlobal.temperature = result
    let data = { temperature: result }
    io.emit('dataTemperature', data)
  });
}, 1000);


//Récupération et envoi des données infrarouge en JSON au serveur
moduleInfraRed.getCodeInfraRed(function(result)
{
  dataGlobal.code = result
  let data = { code: result }
  if(result != -1)
  io.emit('dataInfraRed', data)
});

// Once a new connection is made, send serialData
/*
io.on('connection', () => {
  io.emit('dataSensors', dataSensors)
})
*/

//Lancement du serveur
http.listen(port, function(){
  console.log('listening on *:1234');
});
