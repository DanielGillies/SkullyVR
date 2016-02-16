var elem1 = document.getElementById("positive");
var elem2 = document.getElementById("negative");
var xhr = new XMLHttpRequest();
xhr.open('GET', '360_1.mp4', true);
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
        document.getElementById("prompt").style.display = "block";
        document.addEventListener("click", function() {
            document.getElementById("preloadBlocker").style.display = "none";
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
