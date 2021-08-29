// State
let requestingPersonId
let requestingPersonType
let personCallingId
let personCallingType
let receivedPersonId
let receivedPersonType 
function setSentCallRequestTo(friend_type, friendId) {
    requestingPersonId = friendId
    requestingPersonType = friend_type
}
function setReceivedCallRequestTo(friend_type, friendId) {
    console.log("setReceivedCallRequestTo", friend_type, friendId);
    receivedPersonId = friendId
    receivedPersonType = friend_type
}
function setInCallWith(friend_type, friendId) {
		console.log("set in call with", friend_type, friendId)
    personCallingId = friendId
    personCallingType = friend_type
}

function setIncomingCallInfo(callerName, callerImg) {
    name_p.innerText = callerName
    if (callerImg !== null) {
        try {
            let filename;
            getImageMetadata(callerImg).then( metadata => {
                filename = metadata.imageMeta.source
                profilePic.src = `${SERVER_URL}${filename}` 
            })
        }
        catch (err) {
            profilePic.src = '../images/peddler/profile_pic.png'
        }
    }
    else {
        profilePic.src= '../images/peddler/profile_pic.png'
    }
}

async function getImageMetadata(imageID) {
    const response = await fetch(`${SERVER_URL}/api/media/photos/${imageID}`, {
        method: "GET",
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrer: 'no-referrer'
    })
    const imageMetadata = await response.json()
    console.log("get image metadata")
    console.log(imageMetadata)
    return imageMetadata 
}

function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

///ERROR
function resetStates() {
	console.log("reset states");
    setInCallWith(null,null)
    setSentCallRequestTo(null,null)
    setReceivedCallRequestTo(null,null)
    clearTimeout(timer)
    if (inIframe()){
        window.parent.postMessage("hide_jajaja", '*');
    }
}
function failedToSendCallRequestHandler(err) {
    console.log(err)
    resetStates()
    // alert(err.error.message)
}
function failedToRevokeCallRequestHandler(err) {
    console.log(err)
    resetStates()
    // alert(err.error.message)
}
function failedToRejectCallRequestHandler(err) {
    console.log(err)
    resetStates()
    // alert(err.error.message)
}
function failedToAcceptCallRequestHandler(err) {
    console.log(err)
    // alert(err.error.message)
}
function failedToEndCallHandler(err) {
    console.log(err)
    resetStates()
    // alert(err.error.message)
}
function criticalErrorHandler(err){
    console.log(err)
    resetStates()
}

setupErrorHandling(
    failedToSendCallRequestHandler,
    failedToRevokeCallRequestHandler,
    failedToRejectCallRequestHandler,
    failedToAcceptCallRequestHandler,
    failedToEndCallHandler,
    criticalErrorHandler
)

// progress circle styling
let circle
let circumference
window.onload = () => {
    circle = document.querySelector('.progress-ring__circle');
    const radius = circle.r.baseVal.value;
    circumference = radius * 2 * Math.PI;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    name_p = document.querySelector('#name')
    profilePic = document.querySelector('#profilePic')
}
function setProgress(percent) {
    console.log(percent)
    const offset = circumference - percent / 100 * circumference;
    circle.style.strokeDashoffset = offset;
}

async function getCallerData(caller_type, callerID) {
    const response = await fetch(`${SERVER_URL}/api/${caller_type}/${callerID}`, {
        method: "GET",
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + token
        },
        redirect: 'follow',
        referrer: 'no-referrer'
    })
    const caller_data = await response.json()
    console.log("get caller data")
    console.log(caller_data)
    return caller_data
}
    
///SUCCESS
let time_remain
let timer 
async function acceptCallRequestTimeout(friendId, friendType){
    console.log(friendId, friendType)
    time_remain -= 1000
    setProgress((7000-time_remain)/60)
    //setProgress(((7000-time_remain)/70) + (100/7))
    if (time_remain > 0){
        clearTimeout(timer)
        timer = setTimeout(()=>{
            acceptCallRequestTimeout(friendId, friendType)
        }, 1000)
        document.getElementById('accepter').innerHTML = "Connecting call in " + time_remain/1000 + " seconds. Press any button to cancel."
    }else {
        clearTimeout(timer)
        setProgress(0)
        document.getElementById('peerDiv').classList.remove('hidden')
        acceptCallRequest(friendType, friendId)
        // setInCallWith(res.friend.user_type, res.friend.userId)
    }
}
function receiveSendCallRequestHandler(res) {
    // If already in a call reject incoming 
    res.userId = res.id;
    if (checkIfInCall()) {
        console.log("HERE1")
        rejectCallRequest(res.friend.user_type, res.friend.userId)
        return 
    }
    if(receivedPersonId && receivedPersonType){
        console.log("HERE2")
        rejectCallRequest(res.friend.user_type, res.friend.userId)
        return 
    }
    if (inIframe()){
        window.parent.postMessage("show_jajaja", '*');
    }
    setReceivedCallRequestTo(res.friend.user_type, res.friend.userId)
    console.log("remain set")
    time_remain = 7000
    //setProgress(((7000-time_remain)/70) + (100/7))
    setProgress(0)
    document.getElementById('accepter').innerHTML = "Connecting call in 7 seconds. Press any button to cancel."
    timer = setTimeout(()=>{
        acceptCallRequestTimeout(res.friend.userId,res.friend.user_type)
    },1000)
    getCallerData(res.friend.user_type, res.friend.userId).then( caller => {
        console.log("caller info")
        console.log(caller[res.friend.user_type.toLowerCase()])
        caller_info = caller[res.friend.user_type.toLowerCase()]
        setIncomingCallInfo(caller_info.first_name + " " + caller_info.last_name, caller_info.profilePicture)
    })
}
function receiveRevokeCallRequestHandler(res) {
    console.log('receiveRevokeCallRequestHandler', res)
    clearTimeout(timer)
    if (inIframe()){
        window.parent.postMessage("hide_jajaja", '*');
    }
    setReceivedCallRequestTo(null,null)
}
function receiveRejectCallRequestHandler(res) {
    console.log('receiveRejectCallRequestHandler', res)
    setSentCallRequestTo(null,null)
}

function receiveAcceptCallRequestHandler(res) {
    // Don't do anything because simple-peer will call someone and videoStreaming.js will create the second video
		console.log('receiveAcceptCallRequestHandler', res)
    setInCallWith(res.friend.user_type, res.friend.userId)
    setSentCallRequestTo(null, null)
   
}

function receiveEndCallHandler(res) {
    console.log('receiveEndCallHandler', res)
    document.getElementById('peerDiv').classList.add('hidden')
    if (inIframe()){
        window.parent.postMessage("hide_jajaja", '*');
    }
    setInCallWith(null, null)
}

setupReceiverHandling(
    receiveSendCallRequestHandler,
    receiveRevokeCallRequestHandler,
    receiveRejectCallRequestHandler,
    receiveAcceptCallRequestHandler,
    receiveEndCallHandler
)

function initiateSendCallRequestHandler(res) {
    // remove all modals
    console.log('initiateSendCallRequestHandler', res)
    setSentCallRequestTo(res.friend.user_type, res.friend.userId)
}
function initiateRevokeCallRequestHandler(res) {
    console.log('initiateRevokeCallRequestHandler', res)
    // window.parent.postMessage("hide_jajaja", '*');
    setSentCallRequestTo(null,null)
}
function initiateRejectCallRequestHandler(res) {
    // Don't need to do anything here
    console.log("HERE")
    console.log('initiateRejectCallRequestHandler', res)

    // if(!checkIfInCall() && receivedPersonId){
    //     window.parent.postMessage("hide_jajaja", '*');
    // }
    if(res.friend.userId == receivedPersonId && res.friend.user_type == receivedPersonType){
        setProgress(0)
        time_remain = 7000
        setReceivedCallRequestTo(null, null)
    }
}
function initiateAcceptCallRequestHandler(res) {
    // don't need to do anything here
		console.log('initiateAcceptCallRequestHandler', res)
    setInCallWith(res.friend.user_type, res.friend.userId)
    setReceivedCallRequestTo(null, null)
}
function initiateEndCallHandler(res) {
    console.log('initiateEndCallHandler', res)
    document.getElementById('peerDiv').classList.add('hidden')
    if (inIframe()){
        window.parent.postMessage("hide_jajaja", '*');
    }
    setInCallWith(null, null)
}

setupInitiatorHandling(
    initiateSendCallRequestHandler,
    initiateRevokeCallRequestHandler,
    initiateRejectCallRequestHandler,
    initiateAcceptCallRequestHandler,
    initiateEndCallHandler
)
