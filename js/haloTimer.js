/**
 * Halo Timer Class
 * this class handles the timers and the styling
 */
function HaloTimer(element) {
    this.element = element;
}

// Play a beep
HaloTimer.prototype.beep = function () {
    $('#dummy').html('<embed src="sound/beep.mp3" hidden="true" autostart="true" loop="false" />');
}

// Calculates seconds to minutes
HaloTimer.prototype.toMins = function (seconds) {
    var sec_numb    = parseInt(seconds, 10),
        hours   = Math.floor(sec_numb / 3600),
        minutes = Math.floor((sec_numb - (hours * 3600)) / 60),
        time;

    seconds = sec_numb - (hours * 3600) - (minutes * 60);

    if (seconds < 10) { seconds = "0" + seconds; }
    time = minutes + ':' + seconds;
    return time;
};

// Calculates minutes from seconds
HaloTimer.prototype.fromMins = function (time) {
    var colon = time.indexOf(':'),
        mins = parseInt(time.substring(0, colon), 10) * 60,
        seconds = parseInt(time.substring(colon + 1), 10);
    return mins + seconds;
};

// This code gets executed by the timer every second
HaloTimer.prototype.doTimer = function () {
    this.countDown -= 1;
    this.element.html(this.toMins(this.countDown));
    var beepTimes = [ 15, 3, 2, 1];

    // Do some stuff if the timer is counting down
    if (this.countDown <= 15) { this.element.addClass('almost'); }
    if (this.countDown <= 8) { this.element.addClass('final'); }

    if ($.inArray(this.countDown, beepTimes) > 0) { this.beep(); }

    if (this.countDown === 0) {
        this.timer.stop();
        this.element.removeClass('going almost final');
        this.element.html(this.toMins(this.startTime));
    }
}

// Handles timer countdown
HaloTimer.prototype.toggleTimer = function () {
    var self = this;

    // The element and the amount of time from the button
    this.countDown = this.fromMins(this.element.html());

    // If we're already going on click, reset the timer
    if (this.element.hasClass('going') === true) {
        this.element.removeClass('going almost final');
        this.element.html(this.toMins(this.startTime));
        this.timer.stop();

    // Not already going, so start up the timer
    } else {

        // Set the start time for use later
        this.startTime = this.countDown;
        this.element.addClass('going');

        // Create timer/countdown
        this.timer = $.timer($.proxy(this.doTimer, this), 1000, true);
    }
}

$(document).ready(function () {

    // Object to hold the timer instance for each element
    var Timers = {};

    // Set the timer
    function setTimer(theId) {
        // If the timer hasn't been instanciated, instanciate it
        if (Timers[theId] === undefined)
            Timers[theId] = new HaloTimer($('#' + theId));

        // Call countdown
        Timers[theId].toggleTimer(); 
    }

    // Bind button click to setTimer
    $('.button').bind('click', function () {
        setTimer($(this).attr('id'));
    });

    // Bind keypress to setTimer
    $('body').keyup(function (event) {
        if (event.keyCode === 49 || event.keyCode === 103) setTimer('bOne');
        if (event.keyCode === 50 || event.keyCode === 104) setTimer('bTwo');
        if (event.keyCode === 51 || event.keyCode === 105) setTimer('bThree');
        if (event.keyCode === 52 || event.keyCode === 100) setTimer('bFour');
        if (event.keyCode === 53 || event.keyCode === 101) setTimer('bFive');
        if (event.keyCode === 54 || event.keyCode === 102) setTimer('bSix');
    });

});