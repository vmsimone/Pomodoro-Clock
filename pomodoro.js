$(document).ready(function() {
  var minutes = parseInt($('#min').text());
  var seconds = parseInt($('#sec').text());
  var bgWidth = 0;
  var workInterval = 0;
  var breakInterval = 0;
  var onBreak = false;
  var ticktock;
  var clockSet = "work";
  var breakMin = $('#brk-clock').text().split(':');
  breakMin = parseInt(breakMin[0]);
  var running = false;
  var userMin = 0;

  $('.set').on("click", function(){
    if(clockSet == "work") {
      clockSet = "break";
      $('.set').text("Set break");
    } else if (clockSet == "break") {
      clockSet = "done";
      $('.set').text("Start");
    } else {
      begin();
    }
  });

  //for organization; clock starts ticking
  function begin(){
    if(running === false) {
      userMin = minutes;
      workInterval = 100 / (minutes * 60);
      breakInterval = 100 / (breakMin * 60);
      countdown();  //line 61
      $('.btn').fadeOut();
      $('#brk-clock').fadeOut();
      $('.btn').fadeOut(400, function(){
        clockSet = "work";
        $('.set').text("Set work");
      });
      running = true;
    }
  }

  //plus button function
  $('.add').on('click', function(){
    if (clockSet == "work") {
      if(minutes < 90) {
        minutes += 1;
        $('#min').text(minutes);
      }
    } else {
      if(breakMin < 60) {
        breakMin += 1;
        $('#brk-clock').text(breakMin + ":00");
      }
    }
  });

  //minus button function
  $('.subt').on('click', function() {
    if (clockSet == "work") {
      if(minutes > 1) {
        minutes -= 1;
        $('#min').text(minutes);
      }
    } else {
      if(breakMin > 1) {
        breakMin -= 1;
        $('#brk-clock').text(breakMin + ":00");
      }
    }
  });

  //runs after clicking start
  function countdown() {
    ticktock = setInterval(frame, 1000);
    function frame() {
      //stops running countdown at 0:00
      if(minutes === 0 && seconds === 0) {
        //switches to break
        if(onBreak === false) {
          clearInterval(ticktock);
          running = false;
          onBreak = true;
          $('#clk').fadeOut('400', function(){
            minutes = breakMin;
            $('#min').text(minutes);
            $('#clk').fadeIn();
            begin();
          });
          //resets to beginning
        } else {
          clearInterval(ticktock);
          running = false;
          onBreak = false;
          minutes = userMin;
          $('#min').text(minutes);
          $('.btn').fadeIn();
          $('#brk-clock').fadeIn();
        }
      } else {
        seconds -= 1;
        if (seconds === -1) {
          seconds = 59;
          minutes -= 1;
          $('#min').text(minutes);
        }
        if (seconds > 9) {
          $('#sec').text(seconds);
       } else {
         //displays number as 0n instead of n
         $('#sec').text("0" + seconds);
       }
        //moves the background
        bgEffects();
      }
    }
  }

  function bgEffects() {
    if(onBreak === false) {
      bgWidth += workInterval;
      $('.bg').css('width', bgWidth + '%');
    } else {
      bgWidth -= breakInterval;
      $('.bg').css('width', bgWidth + '%');
    }
  }
});
