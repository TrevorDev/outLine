var config = require('./lib/config')
//var database = require('./lib/database')
var logger = require('koa-logger')
var router = require('koa-router')
var serve = require('koa-static')
var session = require('koa-session')
var views = require('co-views')
var parse = require('co-body')
var jsonResp = require('koa-json-response')
var koa = require('koa')
var swig = require('swig')
var https = require('https')
var http = require('http')
var request = require('request');
var fs = require('fs')
var app = koa()

//Add database
// si = database.getSequelizeInstance()
//si.sync()

//var userCtrl = require('./controller/user')

//REMOVE IN PRODUCTION??
swig.setDefaults(config.templateOptions)

//ROUTES
app.keys = [config.sessionSecret]
app.use(session())
app.use(jsonResp())
app.use(router(app))

//PAGE ROUTES
app.get('/', defaultPageLoad('index'))
app.get('/3d', defaultPageLoad('3d'))
app.get(/\/public\/*/, serve('.'))

//API ROUTES
//app.get('/testUser', userCtrl.getUsers)

//PAGE HANDLERS
function defaultPageLoad(pageName, requiresLogin) {
	return function *(){
		/*if(requiresLogin===true && !sessionHelper.isLoggedIn(this.session)){
			this.redirect('/login')
			return
		}*/

		var temp = {};
		this.body = yield render(pageName, temp)
	}
}

function render(page, template){
	return views(__dirname + '/view', config.templateOptions)(page, template)
}

var server = http.createServer(app.callback())

//SOCKETIO
var io = require('socket.io').listen(server);
var roomNumber = 0;
var rooms = {}
io.on('connection', function(socket){

	//JOIN ROOM
  var roomName = "room"+roomNumber
  if(!rooms[roomName]){
  	rooms[roomName] = {
  		users: {}
	  }
  }
  socket.emit('otherUsers', {users: rooms[roomName].users})
  socket.broadcast.to(roomName).emit('playerJoined', {id: socket.id, name: ""})
  rooms[roomName].users[socket.id] = {userName: "test"}
  socket.join(roomName)

  if(Object.keys(rooms[roomName].users).length >= 2){
  	roomNumber++;
  	room = io.sockets.adapter.rooms[roomName];
  	var i = 0;
  	for (var id in room) {
    	io.sockets.adapter.nsp.connected[id].emit("gameStart", {playerNum: i})
    	i++
    }
  }

  socket.on('updatePos', function(data){
  	socket.broadcast.to(roomName).emit('updatePos', {id: socket.id, pos: data.pos})
  })

  socket.on('disconnect', function(){
  	socket.broadcast.to(roomName).emit('playerLeft', {id: socket.id})
  	delete rooms[roomName].users[socket.id];
  });
});

server.listen(config.appPort);
console.log('Started ----------------------------------------------'+config.appPort)
