$(document).ready(function()
{
    //CSS changes to page:
    makeCorrectSize();

    //Plays music on load:
    var music = new Audio('/sounds/whack/Mii Channel Music.mp3');
     
    //Starts whack sound
    var whackSound = new Audio('/sounds/whack/oww.wav');
    var whackMissSound = new Audio('/sounds/whack/whack.wav');
    
    var score = 0;
    $("#score").text("Score: " + score );
    var timer = 0;
    // $("#timer").text("Time Remaining: " + timer);
		var start_flag = false;
    var whackImages = [];
    var moleStateMap = [];
		var numMoles = 5;
    
    var recentlyWhacked = -1;
		var numMolesOnBoard = 0;
		
		$('body').css( 'cursor', 'url(/picture/whack/hammer-normal.png), auto' );		
		var cursorClicked = false;

    preloadMoles();
    displayMoles();

		start();
		
		
    window.setInterval(function()
    {
			// start game in non-timer based game
      if (start_flag)
      {
				if (numMolesOnBoard < 1) {
					setTimeout(raiseMole(), 2000)
				}
      } 
			
			if(cursorClicked = true) {
				cursorClicked = false;
			  $("body").css( 'cursor', 'url(/picture/whack/hammer-normal.png), auto' );		
			}
			
			/*
			// Timer-based game
      if (timer > 0)
      {
        raiseMole();
        updateTimer();
      } 
			
      if (timer === 0)
      {
          resetMoles();
          resetGame();
      }
			*/
    }, 1000);

    function preloadMoles() 
    {
        // Reads the 3 states of whack mole .../images: in hole, out of hole, whacked

			var imageObject = '<img src = "/picture/whack/hole.png">'; // moleInHole

        whackImages.push(imageObject);
        
        imageObject = '<img src = "/picture/whack/basicmole.png">'; // moleOutHole.gif

        whackImages.push(imageObject); 
        
        imageObject = '<img src = "/picture/whack/basicmolecorrect.png">'; // moleHurt.gif

        whackImages.push(imageObject); 
        
        for (var counter = 0; counter < numMoles; counter++)
            moleStateMap.push(false);
    }
    
		
    function displayMoles()
    {			
        $("#whackTable tbody").empty();
        $("#whackTable tbody").append("<tr class='row'>");
				
        for (var counter = 0; counter < numMoles; counter++)
        {
            if (moleStateMap[counter]) {
							// set to mole							
              $("#whackTable tbody tr").append("<td class='col' id='" +counter + "'>" + whackImages[1] + "</td>");
						} else {
							// set to grass
              $("#whackTable tbody tr").append("<td class='col' id='" +counter + "'>" + whackImages[0] + "</td>");
						}
        }
        $("#whackTable tbody").append("</tr>");
				
        $("#whackTable img").css('width', screen.width/6 + 'px');
        $("#whackTable img").css('height', screen.height/4 + 'px');
    }
		
    function showFeedback()
    {			
        $("#whackTable tbody").empty();
        $("#whackTable tbody").append("<tr class='row'>");
				
        for (var counter = 0; counter < numMoles; counter++)
        {
            if (moleStateMap[counter]) {
                console.log('here 1');
							// set to mole							
              $("#whackTable tbody tr").append("<td class='col' id='" +counter + "'>" + whackImages[1] + "</td>");
						} else if (counter == recentlyWhacked) {
                            console.log('here 2');
							// set to mole							
              $("#whackTable tbody tr").append("<td class='col' id='" +counter + "'>" + whackImages[2] + "</td>");
						} else {
							// set to grass
              $("#whackTable tbody tr").append("<td class='col' id='" +counter + "'>" + whackImages[0] + "</td>");
						}
        }
        $("#whackTable tbody").append("</tr>");
				
        $("#whackTable img").css('width', screen.width/6 + 'px');
        $("#whackTable img").css('height', screen.height/4 + 'px');
    }
		
    function raiseMole()
    {
	 			numMolesOnBoard++;
			
        var repetitionCounter = 0;
        var randomNumber = Math.floor(Math.random() * numMoles);
				
        while (randomNumber == recentlyWhacked)
        {
           randomNumber = Math.floor(Math.random() * numMoles); 
           repetitionCounter++;
        }
        moleStateMap[randomNumber] = true;
        displayMoles();
    }
    
	
    function updateTimer()
    {
        timer--;
        $("#timer").text("Timer: " + timer);    
    }
		
		function changeCursor() {
			$("body").css( 'cursor', 'url(/picture/whack/hammer-normal.png), auto' );		
		}
		
    $("#whackTable").on("click","td",function()
    {			
			cursorClicked = true;
		  $("body").css( 'cursor', 'url(/picture/whack/hammer-click.png), auto' );	
			
        var location = $(this).attr('id');
        if (moleStateMap[location])
        {					
            whackSound.play();
            socket.emit('bid on', {chatroom:'bid', buttonNo: '1'});
            recentlyWhacked = location;
            console.log('location', location);
            moleStateMap[location] = false;						
            updateScore();
						numMolesOnBoard--;			
						
						showFeedback();
        } else {					
          whackMissSound.play();
        }
    });
		
    
    function updateScore()
    {
        score += 10;
        $("#score").text("Score: " + score);
    }
    
    function resetMoles()
    {			
        for (var counter = 0; counter < numMoles; counter++) {
            moleStateMap[counter] = false;
					}
        displayMoles();
        recentlyWhacked = -1;
        music.pause();
    }
   
		function start() {
      //Starts the game
      $(this).css({"visibility":"hidden"});
      timer = 60;
      music.play();
			start_flag = true;
		}
		
    function resetGame()
    {
        //alert("Game over! Your score was: " + score);
				start();
        score = 0;
    }
    
    function makeCorrectSize()
    {   
        $('#whackDiv').css('height', screen.height + 'px');
        $("#whackDiv").css('width', screen.width + 'px');   
    }

     var socket = io();
        socket.connect('http://127.0.0.1:3000');
        socket.emit('buttons start', {chatroom: 'buttons'});
        socket.emit('bid start', {chatroom: 'bid'});
        socket.on('button load', function(msg){
            


            for (var counter = 0; counter < numMoles; counter++) {
            moleStateMap[counter] = false;
            console.log(moleStateMap[counter]);
                    }
            transformed = numMoles - Number(msg.buttonNo);
            console.log(recentlyWhacked);
            showFeedback();
            moleStateMap[transformed] = true;

            whackSound.play();
            recentlyWhacked = transformed;

            
            //setTimeout(updateScore(), 2000);
            updateScore();
            //numMolesOnBoard--;          
                        
            


            setTimeout(displayMoles, 2000);
            //displayMoles();
            console.log(msg);
            //letspin();
        });
        /*socket.on('button hit', function(msg){
            whackSound.play();
            recentlyWhacked = msg.buttonNo;
            moleStateMap[msg.buttonNo] = false;                     
            updateScore();
                        numMolesOnBoard--;          
                        
                        showFeedback();
            console.log(msg);
            //letspin();
        });*/






});
