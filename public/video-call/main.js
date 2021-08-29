let token;
console.log("main");
$(document).ready(async function () {
    init_profile()
})// init_video()
// function init_video(){
//     let video =  document.getElementById('second-streaming-video-id')
//     video.autoplay = true
//     video.muted = true
//     video.playsinline = true
// }
async function init_profile() {
	console.log("starting init profile");
    let unitUserType = user_type;
    let unitUserId = userID;
    if (userID === "null") {
        user_type = "unit";
        userID = global.UNIT_ID
        unitUserId = "null";
        unitUserType = "unit"
    }
    console.log(userID, user_type);
    let res = await fetch(`${SERVER_URL}/api/profile/login/${user_type}/${userID}`,{
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        //   body: JSON.stringify(data), // body data type must match "Content-Type" header
		})
    if (!res.ok) {
        console.log(res.statusText)
    }
	res = await res.json()
	console.log({ res });
	token = "Bearer " + res.token
		const res2 = await fetch(`${SERVER_URL}/api/physical-units/set-user/${unitUserType}/${global.UNIT_ID}/${unitUserId}`,{
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, cors, *same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
				'Content-Type': 'application/json',
				'Authorization': token,
		},
		redirect: 'follow', // manual, *follow, error
		referrer: 'no-referrer', // no-referrer, *client
	})
		if (!res2.ok) {
			console.log(res2.statusText)
		}
	
		localStorage.setItem("token", token);
    socket.emit('authentication', { token: token, unitId: global.UNIT_ID }) // for volunteerrs 
		socket.emit('sendEmailToEPAUController', { token: token, unitId: global.UNIT_ID }) // for family
		console.log("finished init profile");
}

function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

// document.getElementById("Notify").style.display = "none"
let receiveMessage = function (e) {
    // if (e.data == "find") init_profile()

    if (checkIfInCall()){
        clearTimeout(timer)
        endCall()
    }else{
        if (inIframe()){
            window.parent.postMessage("hide_jajaja", '*');
        }
        clearTimeout(timer)
        console.log(e)
        rejectCallRequest(receivedPersonType,receivedPersonId)
    }
}
try {
    window.addEventListener('message', receiveMessage, false);
} catch (e) {
    window.onload = receiveMessage
}
document.addEventListener("keydown", async function(event){ // adding listener to listen to key presses to reject calls
    if (event.key == 'q' || event.key == 'w' || event.key == 'e' || event.key == 'a' || event.key == 's' || event.key == 'd') {   
			console.log("pressed q");
        if (checkIfInCall()){
            clearTimeout(timer)
            // endCall()
        }else{
            if (inIframe()){
                window.parent.postMessage("hide_jajaja", '*');
            }
            clearTimeout(timer)
            rejectCallRequest(receivedPersonType,receivedPersonId)
        }
    }
});

function createSecondVideo(stream) {
    // document.getElementById('second-streaming-picture-id').style.display = 'none'
    document.getElementById('second-streaming-video-id').style.display = 'block'
    document.getElementById('second-streaming-video-id').srcObject = stream
    document.getElementById('second-streaming-video-id').play()
}

