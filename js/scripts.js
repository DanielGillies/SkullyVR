var speedElem;
var distancElem;
var speedElem2;
var distanceElem2;

function initScripts() {
    speedElem = document.getElementById("speed");
    distanceElem = document.getElementById("distance");
    speedElem2 = document.getElementById("speed2");
    distanceElem2 = document.getElementById("distance2");
}

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

function speedChange() {
    changeValue(7, 5000, 4000); // 9 mph @ 7s
    changeValue(15, 5000, 9000); // 22 mph @ 10s
    changeValue(13, 5000, 14000); // 37 mph @ 15s
    changeValue(10, 5000, 19000); // 50 mph @ 20s
    jiggle(22000, true);
    jiggle(25000, true);
    jiggle(27000, false);
    jiggle(30000, true);
    jiggle(35000, false);
    jiggle(40000, true);
    jiggle(44000, true);
    jiggle(52000, false);
    jiggle(56000, true);
}

function startTooltips() {
    setTimeout(function() {
        $("#hudTooltip .tooltipDot").fadeIn(1000, function() {
            $("#hudTooltip .tooltipText").fadeIn(1000);
        })
        $("#hudTooltipC .tooltipDot").fadeIn(1000, function() {
            $("#hudTooltipC .tooltipText").fadeIn(1000);
        })
    }, 12000);

    setTimeout(function() {
        $("#hudTooltip .tooltipText").fadeOut(1000, function() {
            $("#hudTooltip .tooltipDot").fadeOut(1000);
        })
        $("#hudTooltipC .tooltipText").fadeOut(1000, function() {
            $("#hudTooltipC .tooltipDot").fadeOut(1000);
        })
    }, 22000);
}

function resetHUD() {
    distanceElem.innerHTML = "12.3";
    speedElem.innerHTML = "0";
    distanceElem2.innerHTML = "12.3";
    speedElem2.innerHTML = "0";
    document.getElementById("video").play();
    speedChange();
    startTooltips();
}
