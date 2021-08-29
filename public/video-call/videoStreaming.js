let self_stream
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
.then(newStream => { 
        self_stream = newStream
    })
    .catch((e) => {
    // location.reload()
})


let urlParams = new URLSearchParams(window.location.search);
let userID = urlParams.get('id') 
let user_type = "resident"
let SERVER_URL = 'https://braintagger.com:3001'
// let SERVER_URL = 'http://localhost:8000'
let socket = io("https://stream.braintagger.com:3000/",{
// let socket = io("http://localhost:3001/", {
    // below are engine.IO options
	transports: ['websocket'],
	reconnection: true,             // whether to reconnect automatically
    reconnectionAttempts: Infinity, // number of reconnection attempts before giving up
    reconnectionDelay: 1000,        // how long to initially wait before attempting a new reconnection
    reconnectionDelayMax: 5000,     // maximum amount of time to wait between reconnection attempts. Each attempt increases the reconnection delay by 2x along with a randomization factor
    randomizationFactor: 0.5,
})

const remote_socket22 = io.connect('http://35.182.51.66:3000');
console.log("connected to sockets")

function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

socket.on('profile-profile-login', (friend) => {
    if (inIframe()){
        window.parent.postMessage(friend,"*");
    }
    // sendCallRequest(friend.)
    console.log(friend.id+"logged on")
    console.log(video_stream_user_id+"my id");
    if (video_stream_user_id != friend.id && !checkIfInCall() && !my_session.receivedCallRequests.length && !my_session.sentCallRequests.length) {
        sendCallRequest(friend.user_type, friend.id)

        let IDObj = {
            userID: video_stream_user_id,
            friendID: friend.id
        }
        remote_socket2.emit('initiated yes', IDObj)
        let videoIframe = document.querySelector("#peerDiv");
        videoIframe.classList.remove("hidden")
        document.querySelector("#incoming").innerHTML = "CALLING SOMEONE"
        
        if (inIframe()){
            window.parent.postMessage("show_jajaja", '*');
        }
        console.log("!!!!!!!!!!!!!!SENT REQUEST TOOOOOOOOOOOOOOOOO " , friend.id)
        console.log(my_session)
    }
})

socket.on('connect',()=>{
    console.log(socket.id + " has connected")

})
socket.on('disconnected', () => {
    // emptyOnlineList()
    console.log(socket.id + " has disconnected")
})
socket.on('reconnect', () => {
    if(token){
        socket.emit('authentication', { token: token, unit_id: global.UNIT_ID })

    }
    console.log(socket.id + " has reconnected")
})
socket.on('connect_error', () => {
    // emptyOnlineList()
    console.log(socket.id + " has connect_error")
})
socket.on('connect_timeout	', () => {
    // emptyOnlineList()
    console.log(socket.id + " has connect_timeout")
})
socket.on('reconnect_attempt', () => {
    console.log(socket.id + " has reconnect_attempt")
})
socket.on('reconnect_error', () => {
    // emptyOnlineList()
    console.log(socket.id + " has reconnect_error")
})

socket.on('friends_online', (friends_online) => {
    console.log(friends_online)
})

socket.on('receive_notification', (notification) => {
    // displayMessageOnNotificationModal(notification.message, () => { selectedPersonToVideoCall = { id: notification.senderId, user_type: notification.senderType }; startVideoCall(); }, () => { selectedPersonToVideoCall = null })
    // appendNotification(notification)
})
// socket.on('profile_join_call', (friend) => {
//     console.log('friend_end_call', friend)
//     try{
//         changeFriendCard(friend,false)
//     }catch(e){
//         console.log(e)
//     }
// })
// socket.on('profile_end_call', (friend) => {
//     console.log('friend_end_call', friend)
//     try{
//         changeFriendCard(friend,true)
//     }catch(e){
//         console.log(e)
//     }
// })
socket.on('friend_login', (friend) => {
    console.log('friend login', friend)
    // try{
    //     addFriendOnline(friend)
    // }catch(e){
    //     console.log(e)
    // }
})
socket.on('friend_logoff', (friend) => {
    console.log('friend logoff', friend)
    // try{
    //     removeFriendOnline(friend)
    // }catch(e){
    //     console.log(e)
    // }
})


let my_session
let video_stream_user_type = user_type
let video_stream_user_id = userID

function updateMySession(response) {
    console.log(response);
    my_session = response.user.session
    my_session.sentCallRequests = response.user.sentCallRequests
    my_session.receivedCallRequests = response.user.receivedCallRequests
}
function setupErrorHandling(
    failedToSendCallRequestHandler,
    failedToRevokeCallRequestHandler,
    failedToRejectCallRequestHandler,
    failedToAcceptCallRequestHandler,
    failedToEndCallHandler,
    criticalErrorHandler,
) {
    socket.on('error', ((error) => {
        if (error.error_type == global.video_streaming_error_failedToSendCallRequest) {
            failedToSendCallRequestHandler(error)
        }
        else if (error.error_type == global.video_streaming_error_failedToRevokeCallRequest) {
            failedToRevokeCallRequestHandler(error)
        }
        else if (error.error_type == global.video_streaming_error_failedToRejectCallRequest) {
            failedToRejectCallRequestHandler(error)
        }
        else if (error.error_type == global.video_streaming_error_failedToAcceptCallRequest) {
            failedToAcceptCallRequestHandler(error)
        }
        else if (error.error_type == global.video_streaming_error_failedToEndCall) {
            failedToEndCallHandler(error)
        }
        else if (error.error_type == global.video_streaming_error_critical) {
            criticalErrorHandler(error)
        }
        else {
            console.log(error)
            alert("Special kind of error?")
        }
    }))
}
function setupInitiatorHandling(
    initiateSendCallRequestHandler,
    initiateRevokeCallRequestHandler,
    initiateRejectCallRequestHandler,
    initiateAcceptCallRequestHandler,
    initiateEndCallHandler,
) {
    socket.on('initiator update', ((response) => {
        console.log({initiator_update: response})
        if (response.update_type == global.video_streaming_initiated_send_call_request) {
            updateMySession(response)
            initiateSendCallRequestHandler(response)
        }
        else if (response.update_type == global.video_streaming_initiated_revoke_call_request) {
            updateMySession(response)
            initiateRevokeCallRequestHandler(response)
        }
        else if (response.update_type == global.video_streaming_initiated_reject_call_request) {
            updateMySession(response)
            initiateRejectCallRequestHandler(response)
        }
        else if (response.update_type == global.video_streaming_initiated_accept_call_request) {
            updateMySession(response)
            initiateAcceptCallRequestHandler(response)
        }
        else if (response.update_type == global.video_streaming_initiated_end_call) {
            updateMySession(response)
            initiateEndCallHandler(response)
        }
        else if (response.update_type == global.video_streaming_initiated_login) {
            updateMySession(response)
        }
        else {
            console.log(response)
            alert("Special kind of initation?")
        }
    }))
}
/* response ={
    update_type:"",
    friend:{
        id:
        user_type:
    }
    user:{        
        id:
        user_type:
        received_call_requests:[{},{}]
    }
} */
function setupReceiverHandling(
    receiveSendCallRequestHandler,
    receiveRevokeCallRequestHandler,
    receiveRejectCallRequestHandler,
    receiveAcceptCallRequestHandler,
    receiveEndCallHandler,
) {
    socket.on("receiver update", (response) => {
        console.log(response)
        if (response.update_type == global.video_streaming_received_send_call_request) {
            updateMySession(response)
            receiveSendCallRequestHandler(response)
        }
        else if (response.update_type == global.video_streaming_received_revoke_call_request) {
            updateMySession(response)
            receiveRevokeCallRequestHandler(response)
        }
        else if (response.update_type == global.video_streaming_received_reject_call_request) {
            updateMySession(response)
            receiveRejectCallRequestHandler(response)
        }
        else if (response.update_type == global.video_streaming_received_accept_call_request) {
            updateMySession(response)
            receiveAcceptCallRequestHandler(response)
        }
        else if (response.update_type == global.video_streaming_received_end_call) {
            updateMySession(response)
            receiveEndCallHandler(response)
        }
        else if (response.update_type == global.video_streaming_received_unexpect_disconnection) {
            console.log("TRYING TO RECONNECT@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
            updateMySession(response)
            receiveEndCallHandler(response)
        }
        else {
            console.log(response)
            alert("Special kind of receival?")
        }
    })
}
// make call request twice to same person, on second one
function sendCallRequest(friend_type, friendId) {
    console.log(my_session)
    if (checkIfInCall()) {
        throw Error("Unable to request call when you're already within a call. Please end current call before requesting another one.")
    }
    if (my_session.sentCallRequests.length != 0/*  && document.getElementById('streaming-video-id') */) {
        throw Error("Unable to request call when you've already made a request. Please end current call before requesting another one.'")
	}
		let token = localStorage.getItem("token").split(" ")[1];
    socket.emit('send call request', {
        from_id: video_stream_user_id,
        from_ty: video_stream_user_type,
        to_id: friendId,
				to_ty: friend_type,
				token,
				unit_id: global.UNIT_ID
    })
}

function acceptCallRequest(friend_type, friendId) {
    console.log("acceptCallRequest", friend_type, friendId);
    if (checkIfInCall()) {
        console.log(my_session)
        throw Error("Unable to request call when you're already within a call. Please end current call before requesting another one.")
    }
    console.log(video_stream_user_id, userID);
    socket.emit('accept call request', {
        from_id: userID,
        from_ty: user_type,
        to_id: friendId,
				to_ty: friend_type,
			token: localStorage.getItem("token"),
			unit_id: global.UNIT_ID
    })
}

function revokeCallRequest(friend_type, friendId) {
    socket.emit('revoke call request', {
        from_id: userID,
        from_ty: user_type,
        to_id: friendId,
				to_ty: friend_type,
			token: localStorage.getItem("token"),
			unit_id: global.UNIT_ID
    })
}

function rejectCallRequest(friend_type, friendId) {
    socket.emit('reject call request', {
        from_id: userID,
        from_ty: user_type,
        to_id: friendId,
				to_ty: friend_type,
			token: localStorage.getItem("token").split(" ")[1],
			unit_id: global.UNIT_ID
    })
}

function endCall(friend_type=my_session.personCallingType, friendId=my_session.personCallingId) {
    if (checkIfInCall()) {
        document.getElementById('streaming-video-id').srcObject.getTracks().forEach((t) => {
            t.stop()
        })
        socket.emit('end call', {
            from_id: userID,
            from_ty: user_type,
            //to_id: friendId,
            //to_ty: friend_type,
            to_id: my_session.personCallingId,
						to_ty: my_session.personCallingType,
					token: localStorage.getItem("token").split(" ")[1],
					unit_id: global.UNIT_ID
        })
    } else {
        console.log("you're not in a call")
    }
}
function checkIfInCall() {
    console.log(my_session)
    if (my_session.personCallingId != 'null' || my_session.personCallingType != 'null') {
        return true
    }
    return false
}

/* SIMPLE PEER CONNECTIONS */
let client = {}
function addStreamToSimplePeer(stream) {
    client.peer.addStream(stream)
}
//used to initialize a peer
function InitPeer(type) {
    console.log("INIT PEER")
    let peer = new SimplePeer({ initiator: (type == 'init') ? true : false, stream: self_stream, trickle: false, iceTransportPolicy: 'relay',
    config: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:global.stun.twilio.com:3478?transport=udp' }, {
        urls: "turn:turn.braintagger.com:3478",
        username: "System",
        credential: "Pass1@"
    }] } }) // if type is true true then we send request, else we wait
    peer.on('stream', function (stream) {
        // when we get stream from other user we will create another video
        console.log("MAKE A NEW VIDEO")
        // setTimeout(window.parent.postMessage("takePlayerBackToMapSelection", '*'), 2000);
        createSecondVideo(stream)
    })
    peer.on('close', function () {
        RemovePeer()
        peer.destroy()
    })
    peer.on('data', function (data) {
        console.log("INIT PEER DATA")
        let decodedData = new TextDecoder('utf-8').decode(data)
    })
    
    peer.on('error', err => {
        InitPeer(type)
        console.log('ERROR DETECTED', err)

    })
    return peer
}

//for peer of type init
function MakePeer() {
    console.log("MAKE PEER")
    client.gotAnswer = false
    let peer = InitPeer('init')
    peer.on('signal', function (data) {
			console.log("makepeer signal")
			if (!client.gotAnswer) {
				data.token = localStorage.getItem("token").split(" ")[1];
				data.unit_id = global.UNIT_ID;
            socket.emit('Offer', data)
        }
    })
    client.peer = peer
    // if(document.getElementById('streaming-video-id')){
    //     console.log('adding stream')
    //     addStreamToSimplePeer(document.getElementById('streaming-video-id').srcObject)
    // }
}

//for peer of type not init
function FrontAnswer(offer) {
    console.log("FRONT ANSWER")

    let peer = InitPeer('notInit')
    peer.on('signal', (data) => {
        console.log("frontanswer signal")
        socket.emit('Answer', data)
    })
    peer.signal(offer)
    client.peer = peer
    // if(document.getElementById('streaming-video-id')){
    //     console.log('adding stream')
    //     addStreamToSimplePeer(document.getElementById('streaming-video-id').srcObject)
    // }
}

function SignalAnswer(answer) {
    console.log("Signal ANSWER")
    client.gotAnswer = true
    let peer = client.peer
    peer.signal(answer)
}

function SessionActive() {
    console.log("SESSION ACTIVE")
    document.write('Session Active. Please come back later')
}

function RemovePeer() {
    console.log("REMOVE PEER")
    // document.getElementById("peerVideo").remove();
    // document.getElementById("muteText").remove();
    if (client.peer) {
        console.log("destroy")
        client.peer.destroy()
    }
}
socket.on('BackOffer', FrontAnswer)
socket.on('BackAnswer', SignalAnswer)
socket.on('SessionActive', SessionActive)
socket.on('CreatePeer', MakePeer)
socket.on('RemovePeer', RemovePeer)
