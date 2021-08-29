$(document).ready(function()
{

  var video = document.getElementById('video');
  var rewindInterval;
  var forwardInterval;

  var rewindWorking = false;
  var rewindTimes= 0;

  var forwardWorking = false;
  var forwardTimes= 0;
  
     var socket = io();
        socket.connect('http://127.0.0.1:3000');
        socket.emit('slider start', {chatroom: 'slider'});
        socket.on('slider right', function(msg){

          clearInterval(rewindInterval);
          rewindWorking = false;
          rewindTimes= 0;
   
   
   if (!forwardWorking){
    forwardWorking = true;
    forwardInterval = setInterval(function(){
       forwardTimes++;
       //video.playbackRate = 1.0;
       video.pause();
       console.log(video.currentTime);
       if( Math.floor(video.currentTime) >= 31){
           clearInterval(forwardInterval);
           video.pause();
           forwardWorking = false;
       }
       else{
           video.currentTime += .9;
       }
       if (forwardTimes >3){
        forwardTimes = 0;
        clearInterval(forwardInterval);
        video.pause();
        forwardWorking = false;

       }
                },900);
   }

            
           
        });
        socket.on('slider left', function(msg){
          clearInterval(forwardInterval);
          forwardWorking = false;
          forwardTimes= 0;
   
   
   if (!rewindWorking){
    rewindWorking = true;
    rewindInterval = setInterval(function(){
       rewindTimes++;
       //video.playbackRate = 1.0;
       video.pause();
       console.log(video.currentTime);
       if( Math.floor(video.currentTime) <= 0){
           clearInterval(rewindInterval);
           video.pause();
           rewindWorking = false;
       }
       else{
           video.currentTime += -.9;
       }
       if (rewindTimes >3){
        rewindTimes = 0;
        clearInterval(rewindInterval);
        video.pause();
        rewindWorking = false;

       }
                },900);
   }

           
        });






});
