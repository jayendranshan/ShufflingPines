$(document).ready(function(){
  var fizzbuzz = 0;
  $('#plus-btn').click(function(){
    fizzbuzz++;
    $('#fizzbuzz').html(fizzbuzz);
  });
  $('#fizzbuzz').html(fizzbuzz);
});
