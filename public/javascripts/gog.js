$(document).ready(function()
{



  $(document).keypress(function(event){
  console.log(String.fromCharCode(event.which));
  if ('qweasd'.indexOf(String.fromCharCode(event.which)) !== -1 ){
    window.location.href = '/nav'
  } 
  else if ('p'.indexOf(String.fromCharCode(event.which)) !== -1 ){
    window.player.play();
  }

   else if ('o'.indexOf(String.fromCharCode(event.which)) !== -1 ){
    window.player.pause();
  }
    else if ('012'.indexOf(String.fromCharCode(event.which)) !== -1 ){
    if (String.fromCharCode(event.which) === '0') {
      navPath = '/nav'
    } else if (String.fromCharCode(event.which) === '1') {
      navPath = '/peddler'
    } else if (String.fromCharCode(event.which) === '2') {
      navPath = '/ds'
    }

          function navigate() {
            window.location.href = navPath;
        }
        setTimeout(navigate, 1000);
        
  }
});


  (function(window, videojs) {
      var player = window.player = videojs('videojs-vr-player');
      player.mediainfo = player.mediainfo || {};
      player.mediainfo.projection = '360';

      // AUTO is the default and looks at mediainfo
      player.vr({projection: 'AUTO', debug: false, forceCardboard: false});
    
    player.play();
    }(window, window.videojs));


     var socket = io();
        socket.connect('http://127.0.0.1:3000');
        socket.emit('joystick start', {chatroom: 'joystick'});
        //only for new version with bid for 360 videos
        socket.emit('bid start', {chatroom: 'bid'});
        socket.on('joystick press', function(msg){
          console.log(msg.buttonNo);

          if (msg.buttonNo === '8'){
            window.navigator.getVRDisplays().then(function (display) {
              return display[0].animatePhi_(display[0].phi_ - 0.15);})
          }
          else if (msg.buttonNo === '9'){
            window.navigator.getVRDisplays().then(function (display) {
              return display[0].animatePhi_(display[0].phi_ + 0.15);})
          }
          else if (msg.buttonNo === '10'){
            window.navigator.getVRDisplays().then(function (display) {
              return display[0].animateTheta_(display[0].theta_ - 0.15);})
          }
          else if (msg.buttonNo === '11'){
            window.navigator.getVRDisplays().then(function (display) {
              return display[0].animateTheta_(display[0].theta_ + 0.15);})
          }
           
        });





        socket.emit('wheel start', {chatroom: 'wheel'});
        socket.on('wheel left', function(msg){
           window.navigator.getVRDisplays().then(function (display) {
              return display[0].animateTheta_(display[0].theta_ + 0.05);})
        });
        socket.on('wheel right', function(msg){
           window.navigator.getVRDisplays().then(function (display) {
              return display[0].animateTheta_(display[0].theta_ - 0.05);})
        });

        socket.on('redirect', function(destination) {
          window.location.href = destination;
        });
        //only for new version to go back to nav page when bid pressed on vr page
        socket.on('bid hit', function(destination) {
          window.location.href = 'http://localhost:3000/nav';
        });


        socket.emit('peddler start', {chatroom: 'peddler'});
        peddlerVideo = window.player;
        socket.on('peddler turned', function(msg){
          peddlerVideo.play();
          endTime = peddlerVideo.currentTime + 3.5;
          function checkTime() {
            console.log(peddlerVideo.currentTime, endTime);
            if (peddlerVideo.currentTime >= endTime) {
              peddlerVideo.pause();
            } else {
            /* call checkTime every 1/10th 
            second until endTime */
            setTimeout(checkTime, 100);
          }
        }
        checkTime();
        console.log('beche', msg.count);
    

            
           
        });




        function playNewLandmark(landmark){
            var vrVidContainer = document.getElementById("vr-vid-container");
            while (vrVidContainer.hasChildNodes()) {
              vrVidContainer.removeChild(vrVidContainer.firstChild);
            }

            var playImg = document.getElementsByTagName("img");
            for(var i = playImg.length - 1; 0 <= i; i--) {
              if(playImg[i] && playImg[i].parentElement){
                playImg[i].parentElement.removeChild(playImg[i]);
              }
            }
            
            console.log(playImg);
            /*playImg.outerHTML = "";
            delete playImg;*/
            //playImg.parentNode.removeChild(playImg);
            var source = document.createElement('source');
            var landmarkVidName = '/videos/vr/'+ landmark +'.mp4';
            source.setAttribute('src', landmarkVidName);
            var video = document.createElement('video');
            randomID = landmark + Date.now();
            console.log(randomID);
            video.id = randomID;
            video.controls = true;
            video.loop = true;
            video.muted = true;
            video.crossOrigin = "anonymous";
            source.setAttribute('type', 'video/mp4');
            video.classList.add("video-full");
            video.appendChild(source);
            vrVidContainer.appendChild(video);

            var playe = window.player = window.videojs(randomID);
            playe.mediainfo = playe.mediainfo || {};
            playe.mediainfo.projection = '360';
            playe.vr({projection: 'AUTO', debug: false, forceCardboard: false});
            playe.play();
            //setTimeout(function(){ playe.play(); }, 5000);
        }
        function PlayNewAudio(audioTrack){
          var initialAudioPlayer = document.getElementsByTagName("audio")[0];
          //initialAudioPlayer.pause();
          //audio.pause();


          var aduioName = '/sounds/vr/'+ audioTrack +'.mp3';
          initialAudioPlayer.src = aduioName;
          //var audio = new Audio(aduioName);
          initialAudioPlayer.play();
        }

        socket.emit('RFID start', {chatroom: 'RFID'});
        socket.on('RFID detection', function(msg){
          console.log(msg.landmark);

          if (msg.landmark === 'venezuela'){

            playNewLandmark(msg.landmark);
            PlayNewAudio('Energy');
            


          }

           
        });
          
       


});


