var elem1 = document.getElementById("positive");
var elem2 = document.getElementById("negative");
var xhr = new XMLHttpRequest();
xhr.open('GET', config.video, true);
xhr.responseType = 'blob';
xhr.onload = function(e) {
    if (this.status == 200) {
        console.log("got it");
        var myBlob = this.response;
        var vid = (window.webkitURL ? webkitURL : URL).createObjectURL(myBlob);
        // myBlob is now the blob that the object URL pointed to.
        var video = document.getElementById("video");
        console.log("Loading video into element");
        video.src = vid;
        // not needed if autoplay is set for the video element
        // video.play()
        document.getElementById("prompt").style.display = "inline";
        document.addEventListener("click", function() {
            document.getElementById("preloadBlocker").style.display = "none";
            document.getElementById("prompt").style.display = "none";

            init();
            animate();
            document.removeEventListener("click", arguments.callee, false);
        }, false)
    }
}
xhr.onprogress = function(e) {
    if (e.lengthComputable) {
        var loadedPercentage = e.loaded / e.total;
        elem1.style.width = loadedPercentage * 100 + "%";
        elem2.style.width = 100 - (loadedPercentage * 100) + "%";
        elem1.getElementsByTagName("span")[0].innerHTML = Math.round(loadedPercentage * 100) + "%";
        elem2.getElementsByTagName("span")[0].innerHTML = Math.round(loadedPercentage * 100) + "%";
    }
}

xhr.send();

function changeValue(value, duration, startTime) {
    console.log("called changeValue")
    var startSpeed = parseInt(document.getElementById("speed").innerHTML);
    var intervals = duration * 2 / 1000;
    var valOverTime = value / intervals;
    var intervalTime = duration / intervals;

    setTimeout(function() {
        change(intervals, intervalTime, valOverTime, startSpeed, 1)
    }, startTime);

    // console.log(valOverTime + " : : : : " + intervals + " of " + intervalTime + " : : : : : " + valOverTime*intervals);
}

function change(intervals, intervalTime, valOverTime, startSpeed, counter) {

    startSpeed = document.getElementById("speed").innerHTML = startSpeed + valOverTime;
    console.log(document.getElementById("speed").innerHTML)
    console.log("RUN " + (counter));

    if (counter < intervals) {
        setTimeout(function() {
            change(intervals, intervalTime, valOverTime, startSpeed, counter + 1);
        }, intervalTime)
    }

}

changeValue(20, 5000, 5000);
changeValue(30, 1200, 11000);

// setTimeout(function() { 
//     changeValue(60, 10000) 
// }, 10000);
