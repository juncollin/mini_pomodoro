//POMODORO_TIMER_COUNT = 5;
//INTERVAL_TIMER_COUNT = 3;
//RINGING_TIME = 2;
POMODORO_TIMER_COUNT = 25 * 60;
INTERVAL_TIMER_COUNT = 5 * 60;
RINGING_TIME = 5;
NEUTRAL = 0;
FOCUSING = 1;
TAKING_INTERVAL = 2;

var timeout_id;
var timer_count = POMODORO_TIMER_COUNT;
var status = NEUTRAL;

function changeBgcolorToWhite() {
  document.getElementById("this_body").style.backgroundColor = "white";
}

function changeBgcolorToRed() {
  document.getElementById("this_body").style.backgroundColor = "red";
}

function changeBgcolorToOrange() {
  document.getElementById("this_body").style.backgroundColor = "#ffcccc";
}

function changeBgcolorToLightBlue() {
  document.getElementById("this_body").style.backgroundColor = "#99ffff";
}

function changeBgcolorToBlue() {
  document.getElementById("this_body").style.backgroundColor = "#6699ff";
}

function showNeutral() {
  changeBgcolorToWhite();
  timer_count = POMODORO_TIMER_COUNT;
//  document.getElementById("focus_button").value = "Focus Start";
  document.getElementById("focus_button").src = './images/work_start.png'
//  document.getElementById("interval_button").value = "Break Start";
  document.getElementById("interval_button").src = "./images/rest_start.png";
  document.getElementById("pomodoro_timer").innerHTML = timeText();
  document.getElementById("pomodoro_timer").style.color = "#f66";
  document.getElementById("circle").style.borderColor = "#c99";
  document.getElementById("point").style.backgroundColor = "#f00";
  document.getElementById("timer_part").style.cssText = 'transform: rotate(0deg)';
  document.getElementById("point").style.cssText = 'background-image: url(./images/red_point.png)';
}

function showFocusing() {
  changeBgcolorToWhite();
  document.getElementById("pomodoro_timer").style.color = "#f66";
  document.getElementById("circle").style.borderColor = "#c99";
//  document.getElementById("focus_button").value = "Focus Stop";
document.getElementById("focus_button").src = './images/work_stop.png'


  document.getElementById("circle").style.cssText = 'border: 2px solid #c99;';
//  document.getElementById("point").style.cssText = 'background-color: #f00';
  document.getElementById("point").style.cssText = 'background-image: url(./images/red_point.png)';
}

function showTakingInterval() {
  changeBgcolorToWhite();
//  document.getElementById("interval_button").value = "Break Stop";
  document.getElementById("interval_button").src = "./images/rest_stop.png";
  document.getElementById("circle").style.cssText = 'border: 2px solid #69c;';
//  document.getElementById("point").style.cssText = 'background-color: blue';
  document.getElementById("point").style.cssText = 'background-image: url(./images/blue_point.png)';
}

function rotate() {
  document.getElementById("timer_part").style.cssText = 'transform: rotate(360deg);transition: ' + timer_count  + 's;-moz-transition:' + timer_count + 's;-webkit-transition:' + timer_count + 's;transition-timing-function: cubic-bezier(0.0, 0.0, 1.0, 1.0) ;';
}

function focusAction() {
  clearInterval(timeout_id);
  if (status == FOCUSING || status == TAKING_INTERVAL) {
    status = NEUTRAL;
    showNeutral();
    return;
  }
  status = FOCUSING;
  timer_count = POMODORO_TIMER_COUNT;
  document.getElementById("pomodoro_timer").innerHTML = timeText();
  rotate();
  timer_count = timer_count - 1;
  showFocusing();
  timeout_id = setInterval(function() {
    document.getElementById("pomodoro_timer").innerHTML = timeText();
    timer_count = timer_count - 1;
    if (timer_count < 0) {
      sound();
      status = NEUTRAL;
      clearInterval(timeout_id);
//      document.getElementById("focus_button").value = "Focus Start";
      document.getElementById("focus_button").src = './images/work_start.png'

      document.getElementById("pomodoro_timer").style.color = "#666";
      document.getElementById("timer_part").style.cssText = 'transform: rotate(0deg)';
      changeBgcolorToRed();
      timeout_id = setTimeout(nextInterval, RINGING_TIME * 1000);
    }
  }, 1000);
}

function intervalAction() {
  clearInterval(timeout_id);
  if (status == FOCUSING || status == TAKING_INTERVAL) {
    status = NEUTRAL;
    showNeutral();
    return;
  }
  status = TAKING_INTERVAL;
  timer_count = INTERVAL_TIMER_COUNT;
  document.getElementById("pomodoro_timer").innerHTML = timeText();
  document.getElementById("pomodoro_timer").style.color = "#66f";
  rotate();
  timer_count = timer_count - 1;
  showTakingInterval();
  timeout_id = setInterval(function() {
    document.getElementById("pomodoro_timer").innerHTML = timeText();
    timer_count = timer_count - 1;
    if (timer_count < 0) {
      sound();
      status = NEUTRAL;
      clearInterval(timeout_id);
//      document.getElementById("interval_button").value = "Break Start";
      document.getElementById("interval_button").src = "./images/rest_start.png";
      document.getElementById("timer_part").style.cssText = 'transform: rotate(0deg)';
      changeBgcolorToBlue();
      timeout_id = setTimeout(nextFocus, RINGING_TIME * 1000);
    }
  }, 1000);
}

function timeText() {
  var min = Math.floor(timer_count / 60);
  var sec = timer_count % 60;
  return (("0" + min).slice(-2)) + ":" + (("0" + sec).slice(-2));
}

function nextFocus() {
  clearTimeout(timeout_id);
    timer_count = POMODORO_TIMER_COUNT;
    focusAction();
}

function nextInterval() {
  clearTimeout(timeout_id);
    timer_count = INTERVAL_TIMER_COUNT;
    intervalAction();
}

function sound()
{
	document.getElementById( 'sound-file' ).play() ;
}
