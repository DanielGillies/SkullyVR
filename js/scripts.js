var elem1 = document.getElementById("positive");
var elem2 = document.getElementById("negative");
var speedElem = document.getElementById("speed");
var distanceElem = document.getElementById("distance");
var speedElem2 = document.getElementById("speed2");
var distanceElem2 = document.getElementById("distance2");


function changeValue(value, duration, startTime) {
    var intervals = duration * 2 / 1000;
    var valOverTime = value / intervals;
    var intervalTime = duration / intervals;

    setTimeout(function() {
        change(intervals, intervalTime, valOverTime, 1)
    }, startTime);

    // console.log(valOverTime + " : : : : " + intervals + " of " + intervalTime + " : : : : : " + valOverTime * intervals);
}

function change(intervals, intervalTime, valOverTime, counter) {

    startSpeed = parseInt(speedElem.innerHTML) + valOverTime;
    speedElem.innerHTML = Math.round(startSpeed);
    speedElem2.innerHTML = Math.round(startSpeed);

    if (counter < intervals) {
        setTimeout(function() {
            change(intervals, intervalTime, valOverTime, counter + 1);
        }, intervalTime)
    }

}

function jiggle(time, downFirst) {
    if (downFirst) {
        changeValue(-2, 1000, time);
        changeValue(1, 1000, time + 2000);
    } else {
        changeValue(1, 1000, time);
        changeValue(-2, 1000, time + 2000);
    }
}

function startGPS() {
    setTimeout(decreaseDistance, 6000);
}

function decreaseDistance() {
    var currDist = parseFloat(distanceElem.innerHTML);
    var temp = currDist - 0.1;
    temp = temp.toFixed(1);
    distanceElem.innerHTML = temp;
    distanceElem2.innerHTML = temp;
    setTimeout(decreaseDistance, 6000);
}

function resetHUD() {
    distanceElem.innerHTML = "13.2";
    speedElem.innerHTML = "0";
    distanceElem2.innerHTML = "13.2";
    speedElem2.innerHTML = "0";
    changeValue(2, 1000, 1000);
    changeValue(30, 6000, 11000);
    changeValue(25, 9000, 17000);
    jiggle(30000, true);
    jiggle(36000, false);
    jiggle(40000, false);
    document.getElementById("video").play();
}
