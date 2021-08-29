var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use('/video-call', express.static(path.join(__dirname, 'public/video-call')));

//Riyuchi

var fs = require('fs');
var mkdirp = require("mkdirp");
var base64 = require('urlsafe-base64');
var getDirName = require("path").dirname


var present_route = '/ds';

function writeFile(path, contents, cb) {
  console.log("Save image to DB");
  mkdirp(getDirName(path), function (err) {
    if (err) return cb(err)
    fs.writeFile(path, contents, cb);
  })
}





//added for express generator socketio
var io = require("socket.io")();
app.io = io;

//event management
io.on('connection', function (socket) {
	console.log("connected");
  io.clients(function (error, clients) {
    if (error) throw error;
    console.log("\nClients' are: " + clients + "\n"); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
    //socket.emit("clients", clients);
    io.emit("clients", clients);
  });
  //
  //socket.emit('rasp connect', { some: 'data' });
  //console.log('connected');
  //raspberry introduces itself, and is joined to a room with its id
  socket.on('lever start', function (data) {
    socket.join(data.chatroom);
    console.log(data.chatroom);
    console.log('joined');

  });

  socket.on('home load', function (data) {
    socket.join(data.room);
    console.log(data.room);
    console.log('joined home room');

  });

  socket.on('new person', function (data) {
    console.log(data);
    console.log(data.room);
    //socket.join(data.room);
    io.to(data.room).emit('welcome', { name: data.name });
    //socket.broadcast.to(data.raspID).emit("boro",data);

  });


  //event received from browser, and send to the room with the raspID (obtained from database)
  socket.on('lever down', function (data) {
    console.log(data);
    console.log(data.chatroom);
    socket.join(data.chatroom);
    io.to(data.chatroom).emit('lever down', { strength: data.strength });
    //socket.broadcast.to(data.raspID).emit("boro",data);

  });


  //event received from raspberry(console log), and send to the browser, this needs to be optimized
  socket.on('log', function (data) {
    console.log(data);
    console.log(data.raspID);
    socket.join(data.raspID);
    io.to(data.raspID).emit('update log', { log: data.log });
    //socket.broadcast.to(data.raspID).emit("boro",data);

  });


  socket.on('disconnect', function () {
    console.log('disconnected');
  });


  socket.on('buttons start', function (data) {
    socket.join(data.chatroom);
    console.log('joined');

  });

  socket.on('button load', function (data) {
    socket.join(data.chatroom);
    io.to(data.chatroom).emit('button load', { buttonNo: data.buttonNo });
    console.log(data);
  });

  socket.on('button hit', function (data) {
    socket.join(data.chatroom);
    io.to(data.chatroom).emit('button hit', { buttonNo: data.buttonNo });
  });


  socket.on('slider start', function (data) {
    socket.join(data.chatroom);
    console.log('joined');

  });

  socket.on('slider left', function (data) {
    socket.join(data.chatroom);
    io.to(data.chatroom).emit('slider left', { sliderPos: data.sliderPos });
    console.log(data);
  });

  socket.on('slider right', function (data) {
    socket.join(data.chatroom);
    io.to(data.chatroom).emit('slider right', { sliderPos: data.sliderPos });
  });


  socket.on('wheel start', function (data) {
    socket.join(data.chatroom);
    console.log('joined');

  });

  socket.on('wheel left', function (data) {
    socket.join(data.chatroom);
    io.to(data.chatroom).emit('wheel left', { sliderPos: data.sliderPos });
    console.log(data);
    //commented out for tristate switch version
    /*    if (present_route !== '/ds' && present_route !== '/vr'){
          present_route = '/ds';
          var destination = 'http://localhost:3000/ds';
          io.emit('redirect', destination);
        }*/

  });

  socket.on('wheel right', function (data) {
    socket.join(data.chatroom);
    io.to(data.chatroom).emit('wheel right', { sliderPos: data.sliderPos });
    console.log(data);
    //commented out for tristate switch version
    /*if (present_route !== '/ds' && present_route !== '/vr'){
      present_route = '/ds';
      var destination = 'http://localhost:3000/ds';
      io.emit('redirect', destination);
    }*/

  });

  socket.on('wheel horn', function (data) {
    socket.join(data.chatroom);
    io.to(data.chatroom).emit('wheel horn', { xy: data.xy });
    console.log(data);
    //commented out for tristate switch version
    /*if (present_route !== '/ds' && present_route !== '/vr'){
      present_route = '/ds';
      var destination = 'http://localhost:3000/ds';
      io.emit('redirect', destination);
    }*/

  });
  /*  socket.on('wheel idle', function(data){
      //var destination = '/';
      //io.emit('dstohome', destination);
      //var destination = 'http:///localhost:3000';
      //io.emit('rctohome', destination);
    });*/


  socket.on('joystick start', function (data) {
    socket.join(data.chatroom);
    console.log('joined');

  });

  socket.on('joystick press', function (data) {
    socket.join(data.chatroom);
    io.to(data.chatroom).emit('joystick press', { buttonNo: data.buttonNo });
    console.log(data);
    var destination = '/vr';
    io.emit('redirect', destination);
  });


  socket.on('RFID start', function (data) {
    socket.join(data.chatroom);
    console.log('RFID joined');

  });

  socket.on('RFID detection', function (data) {
    socket.join(data.chatroom);
    io.to(data.chatroom).emit('RFID detection', { landmark: data.landmark });
    console.log(data);

    if (present_route !== '/vr') {
      present_route = '/vr';
      var destination = 'http://192.168.0.100:3000/vr?vid=' + data.landmark;
      io.emit('redirect', destination);
    }

  });

  /* socket.on('RFID absent', function(data){
      var destination = '/';
      io.emit('vrtohome', destination);
    });*/


  /*socket.on('recom start', function(data){
      socket.join(data.chatroom);
      console.log('joined');
  
    });
  */
  /* socket.on('recom suggest', function(data){
      socket.join(data.chatroom);
      io.to(data.chatroom).emit('recom suggest', { vid: data.vid });
      console.log(data);
      var destination = '/recom';
      io.emit('redirect', destination);
    });
  */

  socket.on('bid start', function (data) {
    socket.join(data.chatroom);
    console.log('joined');

  });
  socket.on('bid on', function (data) {
    socket.join(data.chatroom);
    io.to(data.chatroom).emit('exec code', { buttonNo: data.buttonNo });
    io.emit('exec code', { buttonNo: data.buttonNo });

    console.log(data);
  });


  socket.on('bid hit', function (data) {
    socket.join(data.chatroom);
    io.to(data.chatroom).emit('bid hit', { buttonNo: data.buttonNo });
    console.log(data);
    //working code for version with recommender system
    /*if (present_route !== '/rc'){
      present_route = '/rc';
      var destination = 'http://35.182.254.43';
      io.emit('redirect', destination);
    }*/

    //temp for testing
    /* if (present_route !== '/vr'){
       present_route = '/vr';
       var destination = 'http://localhost:3000/vr?vid=' + data.landmark;
       io.emit('redirect', destination);
     }
 */

    if (present_route !== '/vr') {
      present_route = '/vr';
      var destination = 'http://192.168.0.100:3000/nav';
      io.emit('redirect', destination);
    }

  });

  socket.on('waiting for id', function (data) {
    socket.join(data.chatroom);
    console.log(data.chatroom);
    console.log('peddler waiting for id joined');

  });

  socket.on('person detected', function (data) {
    socket.join(data.chatroom);
    io.to(data.chatroom).emit('person detected', { id: data.id });
    console.log(data);
  });


  socket.on('peddler start', function (data) {
    socket.join(data.chatroom);
    console.log("\nNumber of Users: " + io.sockets.adapter.rooms[data.chatroom].length + "\n");
    // var connectionsLimit = 2;
    // if (io.sockets.adapter.rooms[data.chatroom].length > connectionsLimit) {
    //   socket.emit('err', { message: 'Limit has been reached' });
    //   console.log('Limit of users has been reached');
    //   socket.leave(data.chatroom);
    //   socket.disconnect();
    //   return;
    // }
    console.log('peddler joined');
  });

  socket.on('peddler turned', function (data) {
    socket.join(data.chatroom);
    io.to(data.chatroom).emit('peddler turned', { count: data.count, id: data.id });
    socket.broadcast.emit('peddler turned 2', data);
    console.log(data);
    //commented out for tristate switch version
    /*if (present_route !== '/peddler'){
      present_route = '/peddler';
      var destination = 'http://localhost:3000/peddler';
      io.emit('redirect', destination);
    }*/

  });

  socket.on('input from local', function (data) {
    socket.broadcast.emit('output from remote', data);
    console.log("Got the input from local with value: " + data);
  })

  socket.on('output from remote', function (data) {
    console.log("this is the output from remoteee that has been gone through the remote server");
  })
  
  socket.on('ped button pressed', function (data) {
    console.log("PEDDLER BUTTON PRESSSED");
    console.log("this is the msg of pressed button FROM RMOTEE" + data);
    io.emit('ped button received', data);
    io.emit('input from local', 'p');

  })
  //console.log(data);
  //})

  //added for bluetooth buttons so present-route is updated when hid keyboard button pressed
  socket.on('update route', function (data) {
    if (present_route !== '/vr') {
      present_route = '/vr';
      //var destination = 'http://localhost:3000/nav';
      //io.emit('redirect', destination);
    }
    console.log('route updated');

  });

  socket.on('test', function (msg) {
   console.log(msg);
  })

   //socket.emit('test', 'hi');

  //Riyuchi

  socket.on('load pictures', function (userName) {
    console.log("load picturres SERVER");
    console.log("userName :" + userName);
    /*        Account.findOne({"username" : userName},function(err, docs){
                socket.emit('open pictures', docs);
            });*/
  });

  socket.on('save one data', function (userName, num, data, image, address) {
    switch (num) {
      case 1:
        /*          Account.update(
                    {username : userName},
                    {$set: {picture1: data }},
                    function(err){  if(err)  throw err; }
                  );*/
        var A = image.split(',');
        var img = base64.decode(A[1]);
        writeFile("public/" + address, img, function (err) {
          if (err) throw err;
        });
        /*          Account.update(
                    {username : userName},
                    {$set: {place1: address }},
                    function(err){  if(err)  throw err; }
                  );*/
        break;
      case 2:
        /*          Account.update(
                    {username : userName},
                    {$set: {picture2: data }},
                    function(err){  if(err)  throw err; }
                  );*/
        var A = image.split(',');
        var img = base64.decode(A[1]);
        writeFile("public/" + address, img, function (err) {
          if (err) throw err;
        });
        /*          Account.update(
                    {username : userName},
                    {$set: {place2: address }},
                    function(err){  if(err)  throw err; }
                  );*/
        break;
      case 3:
        /*          Account.update(
                    {username : userName},
                    {$set: {picture3: data }},
                    function(err){  if(err)  throw err; }
                  );*/
        var A = image.split(',');
        var img = base64.decode(A[1]);
        writeFile("public/" + address, img, function (err) {
          if (err) throw err;
        });
        /*          Account.update(
                    {username : userName},
                    {$set: {place3: address }},
                    function(err){  if(err)  throw err; }
                  );*/
        break;
      case 4:
        /*          Account.update(
                    {username : userName},
                    {$set: {picture4: data }},
                    function(err){  if(err)  throw err; }
                  );*/
        var A = image.split(',');
        var img = base64.decode(A[1]);
        writeFile("public/" + address, img, function (err) {
          if (err) throw err;
        });
        /*          Account.update(
                    {username : userName},
                    {$set: {place4: address }},
                    function(err){  if(err)  throw err; }
                  );*/
        break;
      case 5:
        /*          Account.update(
                    {username : userName},
                    {$set: {picture5: data }},
                    function(err){  if(err)  throw err; }
                  );*/
        var A = image.split(',');
        var img = base64.decode(A[1]);
        writeFile("public/" + address, img, function (err) {
          if (err) throw err;
        });
        /*          Account.update(
                    {username : userName},
                    {$set: {place5: address }},
                    function(err){  if(err)  throw err; }
                  );*/
        break;
    }
  });






});










var engines = require('consolidate');

app.engine('ejs', engines.ejs);
app.engine('html', require('ejs').renderFile);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//IMPORTANT GOLD SOLUTION for using socket in REST router
app.use(function (req, res, next) {
  req.io = io;
  next();

});



app.use('/', routes);
app.use('/users', users);


app.get('/conf', function (req, res) {
  console.log('bezan');
  res.send('havij');
});


var exec = require('child_process').exec;
app.post('/api/configurewifi', function (req, res) {
  var ssid = req.body.ssid;
  var pass = req.body.pass;
  console.log(ssid);

  // var newText = `new ${text} `;
  // var command = 'echo '+ newText + ' > ' + '/Users/brian/developer/node/wifi/read.txt';
  var text = String.raw`
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=CA

network={
        ssid="` + ssid + String.raw`"
        psk="`+ pass +
String.raw`"
        key_mgmt=WPA-PSK
}
EOF`
var command = 'cat > /etc/wpa_supplicant/wpa_supplicant.conf << EOF' + text;
//var text1 = 'nth';
//var command = 'echo ' + text1 + ' > ' + '/home/pi/developer/test.txt';  
 
console.log(command);
//var cmd = 'ifconfig';
  exec(command, function (error, stdout, stderr) {
    console.log(stdout);
  });

  console.log("resid be post");
  res.send('SSID ' +ssid + ' and Password ' + pass + ' were set. Restarting in few seconds... ');
  var rebootCmd = 'reboot';
  exec(rebootCmd, function (error, stdout, stderr) {
    console.log(stdout);
  });
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
