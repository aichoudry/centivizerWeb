$(document).ready(function()
{

  var recomVideo = document.getElementById('recomVideo');

  
     var socket = io();
        socket.connect('http://127.0.0.1:3000');
        socket.emit('recom start', {chatroom: 'recom'});
        socket.on('recom suggest', function(msg){
          recomVideo.src = msg.vid;
          console.log('beche', msg.vid);
          //recomVideo.play();

            
           
        });



});
