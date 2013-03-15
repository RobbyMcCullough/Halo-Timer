/**
 * Halo Timer Class
 * this class handles the timers and the styling
 */
function HaloTimer(element) {
    HaloTimer.looping = false;
    HaloTimer.sound = true;
    this.wrap = element;
    this.element = element.children('input');
}

// Play a beep
HaloTimer.prototype.beep = function () {
    soundHandle = document.getElementById('soundHandle');
    soundHandle.src = 'http://halo-timer.technobred.com/sound/beep.mp3';
    soundHandle.play();
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
    if (colon > 0)
        return mins + seconds;
    else
        return time;
};

// This code gets executed by the timer every second
HaloTimer.prototype.doTimer = function () {
    this.countDown -= 1;
    this.element.val(this.toMins(this.countDown));
    var beepTimes = [ 15, 3, 2, 1];

    // Do some stuff if the timer is counting down
    if (this.countDown <= 15) { this.wrap.addClass('almost'); }
    if (this.countDown <= 8) { this.wrap.addClass('final'); }


    if ($.inArray(this.countDown, beepTimes) > -1 && HaloTimer.sound === true) { this.beep(); }

    if (this.countDown === 0) {
        this.stopTimer(true);
    }
}

// Stop and reset the timer
HaloTimer.prototype.stopTimer = function (clicked) {
    this.element.val(this.toMins(this.startTime));    
    this.wrap.removeClass('going almost final');
    this.element.prop('disabled', false);
    $('body').focus();
    this.timer.stop();

    if (HaloTimer.looping === true && clicked === true) this.toggleTimer();
}

// Handles timer countdown
HaloTimer.prototype.toggleTimer = function () {
    var self = this;

    // The element and the amount of time from the button
    this.countDown = this.fromMins(this.element.val());
    if (this.countDown == NaN) return;

    // If we're already going on click, reset the timer
    if (this.wrap.hasClass('going') === true) {
        this.stopTimer();

    // Not already going, so start up the timer
    } else {

        // Set the start time for use later
        this.startTime = this.countDown;
        this.element.prop('disabled', true);
        this.wrap.addClass('going');

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

    // Prevent timer start on input box click
    $('input').click(function(e) {
        e.stopPropagation();
    }).keyup(function(e){
        e.stopPropagation();
    });

    $('input').change(function() {
        if (/^\d{0,2}:?\d{2}$/.test($(this).val()) === false) {
            alert('Please set the time in format XX:XX');
            $(this).focus();
        }
    });

    // Bind button click to setTimer
    $('.button').bind('click', function () {
        setTimer($(this).attr('id'));
    });

    // Settings Click
    $('#sound, #looping').click(function() {
        if ($(this).hasClass('checked')) {
            $(this).removeClass('checked');

            if ($(this).attr('id') === 'sound')
                HaloTimer.sound = false;
            else
                HaloTimer.looping = false;
        } else {
            $(this).addClass('checked');
            if ($(this).attr('id') === 'sound')
                HaloTimer.sound = true;
            else
                HaloTimer.looping = true;
        }
    });

    // Bind keypress to setTimer
    $('body').keyup(function (event) {
        console.log(event.keyCode);
        if (event.keyCode === 49 || event.keyCode === 100) setTimer('bOne');
        if (event.keyCode === 50 || event.keyCode === 101) setTimer('bTwo');
        if (event.keyCode === 51 || event.keyCode === 102) setTimer('bThree');
        if (event.keyCode === 52 || event.keyCode === 97) setTimer('bFour');
        if (event.keyCode === 53 || event.keyCode === 98) setTimer('bFive');
        if (event.keyCode === 54 || event.keyCode === 99) setTimer('bSix');
    });

});