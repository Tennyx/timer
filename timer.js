function addZero(num){
  num = num.toString();
  if(num.length == 1){
    return '0' + num;
  }
  else{
    return num;
  }
}

function handleTimeClick() {
  $('#time').replaceWith($('<input id="edit" value="' + $('#time').html() + '" maxlength="8">'));
  $('#edit').focus();
}

$(document).ready(function(){
  
  $('#time').click(handleTimeClick);

  $(document).on('blur', '#edit', function() {
    var newVal = $('#edit').val();
    if(
       newVal[2] != ':' || 
       newVal[5] != ':' || 
       isNaN(newVal[0]) || 
       isNaN(newVal[1]) || 
       isNaN(newVal[3]) || 
       isNaN(newVal[4]) || 
       isNaN(newVal[6]) || 
       isNaN(newVal[7]) 
      ){
        newVal = '00:25:00'
      }
    $('#edit').replaceWith($('<div id="time">' + newVal + '</div>'));
    $('#time').click(handleTimeClick);
  });
  
$('#start').click(function(){
      var divVal = $('#time').html();
      var startSeconds = parseInt(divVal.split(':')[2]);
      var startMinutes = parseInt(divVal.split(':')[1]);
      var startHours = parseInt(divVal.split(':')[0]);
      var totalSecs = startSeconds + (startMinutes * 60) + (startHours * 60 * 60);
      var timerStart = setInterval(function(){ 
        if(totalSecs == 1){
           clearInterval(timerStart);
        }
          totalSecs -= 1;
          var min = Math.floor(totalSecs / 60);
          var hour = Math.floor((totalSecs / 60) / 60);
          min -= hour * 60;
          var sec = totalSecs - (min * 60) - (hour * 60 * 60);
          min = addZero(min);
          hour = addZero(hour);
          sec = addZero(sec);
          $('#time').html(hour + ':' + min + ':' + sec); 
      }, 1000);

      $('#stop').click(function(){
          clearInterval(timerStart);
      });  
  
      $('#reset').click(function(){
         $('#time').html(divVal);
      });
    
  });  
});