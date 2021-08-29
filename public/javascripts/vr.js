class Data {
    constructor(userId, todo_style, off_road, speedEngine) {
        // userId: string
        this.userId = userId;
        // settings: object for config options
        this.settings = {};
        this.settings.todo_style = todo_style;
        // speed engine, with speed offset
        this.speedEngine = speedEngine;
        // dateTime: datetime at start of game
        this.dateTime = Date.now();
        this.time_stamps = [];
        // NPCs: list of NPCs met during the game
        this.NPCs = [];
        this.speed_report = [];
        // collisions: list of objects collided with?
        this.collisions = [];
        // input_aggregate and interactions: aggregate data, to be computed at
        //                                   end of game
        this.input_aggregate = {};
        this.interactions = {};
        // off_road: object associating name of map with whether or not it has off road enabled
        this.off_road = off_road;
    }

    get_time_stamps() {
        return this.time_stamps;
    }

    log_time_stamps(start_time, end_time, start_coor, end_coor, operation) {
        let obj = {
            start_time: start_time,
            end_time: end_time,
            start_coor: start_coor,
            end_coor: end_coor,
            operation: operation
        };
        this.time_stamps = [...this.time_stamps, obj]
    }

    get_speed_report() {
        return this.speed_report;
    }

    log_speed_report(start_time, end_time, speed, acc_acceleration) {
        let obj = {
            start_time: start_time,
            end_time: end_time,
            speed: speed,
            instant_end_acceleration: acc_acceleration
        };
        this.speed_report = [...this.speed_report, obj];
    }

    get_NPCs_list() {
        return this.NPCs;
    }

    log_NPC(start_time, NPC, x, y, complete) {
        let obj = {
            start_time: start_time,
            NPC: NPC,
            x: x,
            y: y,
            complete: complete
        };
        this.NPCs = [...this.NPCs, obj];
    }

    get_collisions() {
        return this.collisions;
    }

    log_collisions(start_time, end_time, object) {
        let obj = {
            start_time: start_time,
            end_time: end_time,
            object: object
        };
        this.collisions = [...this.collisions, obj];
    }

    // process data will process all data in raw and generate aggregated data,
    // can be overwritten any time
    process(num_todo_completed, total_num_todo_items) {
        this.input_aggregate.num_inputs = this.time_stamps.length;
        let maxTime = 0;
        if (this.time_stamps.length >= 2) {
            for (let i = 1; i < this.time_stamps.length; i += 1) {
                let timeBetween = this.time_stamps[i].start_time - this.time_stamps[i - 1].end_time;
                if (timeBetween > maxTime) {
                    maxTime = timeBetween;
                }
            }
        } 
        this.input_aggregate.max_time_without_input = maxTime;
        
        this.input_aggregate.collisions = this.collisions.length;

        this.input_aggregate.collision_time = 0;
        for (let temp of this.collisions) {
            this.input_aggregate.collision_time += temp.end_time - temp.start_time;
        }
        this.interactions.num_interactions = this.NPCs.length;
        this.interactions.completed_interactions = 0;
        for (let temp of this.NPCs) {
            if (temp.complete) {
                this.interactions.completed_interactions += 1;
            }
        }
        this.total_num_todo_items = total_num_todo_items;
        this.num_todo_completed = num_todo_completed;
    }


}

$(document).ready(function()
{







var loggedData = new Data("temp", '3', '5');

  //var vrLoggedDataArray = JSON.parse(window.localStorage.getItem("vrLoggedDataArray"));
  var vrLoggedDataArray = JSON.parse(window.localStorage.getItem("vrLoggedDataArray"));

  // the following is for development purposes
  var dataToBeCleared = false;
  console.log("call 'window.clearData()' to clear all saved data from localStorage and not save current game's data");
  var clearData = function() {
    vrLoggedDataArray = [];
    dataToBeCleared = true;
  };
  window.clearData = clearData;

  // make gameEnd function run when window is closed
  window.onbeforeunload = gameEnd;

  // loggedDataArray is null if no logged data has been saved offline before
  if (vrLoggedDataArray === null) {
    console.log('in', vrLoggedDataArray);
    vrLoggedDataArray = [];
  }
  
  let failedData = [];
  for (let i = vrLoggedDataArray.length - 1; i >= 0; i -= 1) {
    // onSucc: function to be called if the data is successfully uploaded
    // if the data is successfully uploaded, remove it from vrLoggedDataArray
    let onSucc = function () {
      // console.log('success!', i);
    };

    let onErr = function() {
      // console.log('data was not logged :(', i)
      failedData.push(vrLoggedDataArray[i]);
      window.localStorage.setItem("vrLoggedDataArray", JSON.stringify(failedData))
    }

    makeRequest(vrLoggedDataArray[i], onSucc, onErr);
  }


window.localStorage.setItem("vrLoggedDataArray", JSON.stringify(vrLoggedDataArray));




  function gameEnd() {
    //loggedData.process(todoList.numCompleted(), todoList.numItems());
    loggedData.process(3, 5);
    console.log(loggedData);

    // get previously cached requests
    if (!dataToBeCleared) {
      vrLoggedDataArray.push(loggedData);
    }

    let onSucc = function() {
      console.log('success!');
      vrLoggedDataArray.pop();
    };

    // sendData(loggedData, onSucc);

    /* set cached requests array to vrLoggedDataArray - will be the same if the api call was successful, otherwise
       will include the loggedData object from the current game
     */
    window.localStorage.setItem("vrLoggedDataArray", JSON.stringify(vrLoggedDataArray));
  }

  async function makeRequest (data, successFunction, errorFunction) {
    const res = await fetch("http://99.79.49.40:8000/api/experiential-centivizer", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    }).then(function(response) {
      if (!response.ok) {
        console.log('data was not logged :(');
        errorFunction();
      }
      return response;
    }).then(function(response) {
      successFunction();
    })
    return res
  }












  $(document).keypress(function(event){
  console.log(String.fromCharCode(event.which));
  if ('qweasd'.indexOf(String.fromCharCode(event.which)) !== -1 ){
    window.location.href = '/nav'
  } 
  //else if ('p'.indexOf(String.fromCharCode(event.which)) !== -1 ){
  //  window.location.href = '/peddler'
  //}
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
            //window.videojs.players = {};
            //delete window.videojs.players;
            /*try { 
              delete window.player; 
            } 
            catch(e) 
            { 
              window["player"] = undefined; 
            }*/
            //window.player.delete;
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
            
           /* //var pak = document.getElementById("videojs-vr-player");
            var vrVidContainer = document.getElementById("vr-vid-container");
            console.log(vrVidContainer.lastChild);
            while (vrVidContainer.hasChildNodes()) {
              vrVidContainer.removeChild(vrVidContainer.firstChild);
            }
            //vrVidContainer.removeChild(vrVidContainer.childNodes[0]);
            var source = document.createElement('source');
            source.setAttribute('src', '/videos/vr/venezuela.mp4');
            var video = document.createElement('video');
            video.id = 'videojs-vr-playe';
            video.appendChild(source);
            vrVidContainer.appendChild(video);




            //var video = document.getElementsByTagName("video")[0];
            //var source = document.getElementsByTagName("source")[0];
            //console.log(document.getElementsByTagName("source")[0].src);

            //document.getElementsByTagName("source")[0].src = "http://127.0.0.1:3000/videos/vr/venezuela.mp4"
            //var pooh = document.getElementsByTagName("source")[0]
            //document.getElementById('videojs-vr-player').src = "/videos/vr/venezuela.mp4" ;
            //pooh.setAttribute("src", "http://127.0.0.1:3000/videos/vr/venezuela.mp4");
            
            //source.src = "http://127.0.0.1:3000/videos/vr/venezuela.mp4";
            var playe = window.player = window.videojs('videojs-vr-playe');
            //playe.pause();
            //source.src = "http://127.0.0.1:3000/videos/vr/venezuela.mp4";
            //playe.children_[0].src = "http://127.0.0.1:3000/videos/vr/venezuela.mp4";
            //console.log(player.mediainfo);
            playe.mediainfo = playe.mediainfo || {};
            playe.mediainfo.projection = '360';
            //console.log(player.mediainfo);

            //console.log(playe);
            //console.log(player.vr());
            playe.vr({projection: 'AUTO', debug: false, forceCardboard: false});
            //playe.load();
            playe.play();
            //video.load();
            //video.play();
            //window.player.load();
            //window.player.play();*/
          }
          else if (msg.landmark === 'colos'){
            playNewLandmark(msg.landmark);
            PlayNewAudio('Tina');
          }
          else if (msg.landmark === 'venice'){
            playNewLandmark(msg.landmark);
            PlayNewAudio('Gondola');
          }

          else if (msg.landmark === 'newyork'){
            playNewLandmark(msg.landmark);
            PlayNewAudio('newyork');
          }

          else if (msg.landmark === 'dolphins'){
            playNewLandmark(msg.landmark);
            PlayNewAudio('Summer');
          }
          else if (msg.landmark === 'brain'){
            //playNewLandmark('puppies');
            PlayNewAudio('brain');
          } else {
            playNewLandmark(msg.landmark);
          }
           
        });
          
       


});


