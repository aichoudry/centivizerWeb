$(document).ready(function()
{

var data = {"1":[
{"title":"EVEREST", "link":"everest", "image":"url('/images/nav/everest.jpg')"},
{"title":"SHANGHAI", "link":"shanghai", "image":"url('/images/nav/shanghai.jpg')"},
{"title":"TOKYO", "link":"tokyo", "image":"url('/images/nav/tokyo.jpg')"},
{"title":"INDONESIA", "link":"indonesia", "image":"url('/images/nav/indonesia.jpg')"},
{"title":"BEARS KAMCHATKA", "link":"bear", "image":"url('/images/nav/bear.jpg')"},
{"title":"GREAT WALL CHINA", "link":"china", "image":"url('/images/nav/wall.jpg')"}
],
"2":[
{"title":"PYRAMIDS", "link":"pyramid", "image":"url('/images/nav/camel.jpg')"},
{"title":"PENGUINS", "link":"penguin", "image":"url('/images/nav/penguin.jpg')"},
{"title":"SAFARI", "link":"safari", "image":"url('/images/nav/safari.jpg')"},
{"title":"SOUTH AFRICA", "link":"southafrica", "image":"url('/images/nav/southafrica.jpg')"},
{"title":"MAURITIUS", "link":"mauritius", "image":"url('/images/nav/mauritius.jpg')"},
{"title":"ELEPHANTS", "link":"elephants", "image":"url('/images/nav/elephants.jpg')"}
],
"3":[
{"title":"PUPPIES", "link":"puppies", "image":"url('/images/nav/puppies.jpg')"},
{"title":"COLUMBIA ICE FIELD", "link":"columbiaicefield", "image":"url('/images/nav/columbiaicefield.jpg')"},
{"title":"NEW YORK", "link":"newyork", "image":"url('/images/nav/NA.jpg')"},
{"title":"NORTHERN LIGHTS", "link":"northern", "image":"url('/images/nav/northern.jpg')"},
{"title":"HORSES", "link":"horse", "image":"url('/images/nav/horses.jpg')"},
{"title":"TORONTO", "link":"toronto", "image":"url('/images/nav/toronto.jpg')"}
],
"4":[
{"title":"VENEZUELA", "link":"venezuela", "image":"url('/images/nav/venezuela.jpg')"},
{"title":"DOLPHINS", "link":"dolphins", "image":"url('/images/nav/dolphins.jpg')"},
{"title":"CUBA", "link":"cuba", "image":"url('/images/nav/cuba.jpg')"},
{"title":"PERU", "link":"peru", "image":"url('/images/nav/peru.jpg')"},
{"title":"RIO", "link":"rio", "image":"url('/images/nav/SA.jpg')"},
{"title":"LOST CITY", "link":"lost", "image":"url('/images/nav/SA1.jpg')"}
],
"5":[
{"title":"VENICE", "link":"venice", "image":"url('/images/nav/venice.jpg')"},
{"title":"ALPS", "link":"alpsOriginal", "image":"url('/images/nav/alps.jpg')"},
{"title":"COLOSEUM", "link":"colos", "image":"url('/images/nav/colos.jpg')"},
{"title":"SWITZERLAND", "link":"switzerland", "image":"url('/images/nav/switzerland.jpg')"},
{"title":"ROMA", "link":"rome", "image":"url('/images/nav/rome.jpg')"},
{"title":"CROATIA", "link":"croatia", "image":"url('/images/nav/croatia.jpg')"}
],
"6":[
{"title":"NATURE", "link":"nature", "image":"url('/images/nav/nature.jpg')"},
{"title":"ANTARCTICA", "link":"antarctica", "image":"url('/images/nav/antarctica.jpg')"},
{"title":"HAMILTON ISLAND", "link":"hamilton", "image":"url('/images/nav/hamilton.jpg')"},
{"title":"KANGAROO ISLAND", "link":"kangaroo", "image":"url('/images/nav/kangaroo.jpg')"},
{"title":"SYDNEY", "link":"sydney", "image":"url('/images/nav/australia3.jpg')"},
{"title":"BARRIER REEF", "link":"reef", "image":"url('/images/nav/australia4.jpg')"}
]
}

var firstBIDNo = -1;
let keyMapp = ' qweasd'

$(document).keypress(function(event){

//if ('p'.indexOf(String.fromCharCode(event.which)) !== -1 ){
//    window.location.href = '/peddler'
//  }

if ('qweasd'.indexOf(String.fromCharCode(event.which)) !== -1 ){


        if (firstBIDNo === -1){
          var i;
          for (i = 0; i < 6; i++) {
            $("#box"+ (i+1).toString()).css("background-image", data[keyMapp.indexOf(String.fromCharCode(event.which))][i]["image"]);
            $("#title"+ (i+1).toString()).text(data[keyMapp.indexOf(String.fromCharCode(event.which))][i]["title"]);
            firstBIDNo = keyMapp.indexOf(String.fromCharCode(event.which));
          }


        } else {
          var boro = 'http://localhost:3000/vr?vid=' + data[firstBIDNo][Number(keyMapp.indexOf(String.fromCharCode(event.which))) -1]["link"];
          window.location.href = boro;


        }

  console.log(String.fromCharCode(event.which));

} else if ('012'.indexOf(String.fromCharCode(event.which)) !== -1 ){
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

     var socket = io();
        socket.connect('http://127.0.0.1:3000');
        socket.emit('bid start', {chatroom: 'bid'});
        //not usable becasue not changing present route
        /*//this line is to navagate from nav page to ds when wheel touched
        socket.emit('wheel start', {chatroom: 'wheel'});
        // navage when whell turned to ds
        socket.on('wheel right', function(msg){
          window.location.href = 'http://localhost:3000/ds';
        });
        socket.on('wheel left', function(msg){
          window.location.href = 'http://localhost:3000/ds';
        });
        */
        socket.on('bid hit', function(msg){
          console.log(msg.buttonNo);

        if (firstBIDNo === -1){
          var i;
          for (i = 0; i < 6; i++) {
            $("#box"+ (i+1).toString()).css("background-image", data[msg.buttonNo][i]["image"]);
            $("#title"+ (i+1).toString()).text(data[msg.buttonNo][i]["title"]);
            firstBIDNo = msg.buttonNo;
          }


        } else {
          var boro = 'http://localhost:3000/vr?vid=' + data[firstBIDNo][Number(msg.buttonNo) -1]["link"];
          window.location.href = boro;


        }

/*
          if (msg.buttonNo === '1'){
            //working
            //$("#box1").css("background-image", "url('/images/nav/australia.jpg')");
            
            console.log(1);
          }
          else if (msg.buttonNo === '2'){
            window.navigator.getVRDisplays().then(function (display) {
              return display[0].animatePhi_(display[0].phi_ + 0.15);})
          }
          else if (msg.buttonNo === '3'){
            window.navigator.getVRDisplays().then(function (display) {
              return display[0].animateTheta_(display[0].theta_ - 0.15);})
          }
          else if (msg.buttonNo === '4'){
            window.navigator.getVRDisplays().then(function (display) {
              return display[0].animateTheta_(display[0].theta_ + 0.15);})
          }
          else if (msg.buttonNo === '5'){
            console.log(5);
          }
          else if (msg.buttonNo === '6'){
            console.log(6);
          }*/



           
        });






        socket.on('redirect', function(destination) {
          window.location.href = destination;
        });




        socket.emit('RFID start', {chatroom: 'RFID'});
        socket.on('RFID detection', function(msg){
          console.log(msg.landmark);

          if (msg.landmark === 'venezuela'){

            playNewLandmark(msg.landmark);
            PlayNewAudio('Energy');
            

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
