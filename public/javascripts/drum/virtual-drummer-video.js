function updateWinner() {
    document.getElementById("Virtual-Drummer-Video").href = "https://youtu.be/sJxSWnalV_I",
    document.getElementById("Virtual-Drummer-Winner").innerHTML = "November 2017<br>Virtual Drummer Winner<br>Let's Rock!";
    var e = document.createElement("img");
    e.src = "http://www.virtualdrumming.com/drums/drum-lessons-images/virtual-drummer-video.jpg",
    e.setAttribute("alt", "Virtual Drummer Video"),
    document.getElementById("Virtual-Drummer-Video").appendChild(e),
    e.onmouseover = function() {
        e.src = "http://www.virtualdrumming.com/drums/drum-lessons-images/virtual-drummer-over.jpg"
    }
    ,
    e.onmouseout = function() {
        e.src = "http://www.virtualdrumming.com/drums/drum-lessons-images/virtual-drummer-video.jpg"
    }
}
window.onload = updateWinner();
