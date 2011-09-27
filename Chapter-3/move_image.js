$(function() {
  $('.bottom_button').click(function() {
    $('.bottom_content img:first').appendTo('.top_content');
    $('this').addClass('hide');
  });
  $('.top_button').click(function() {
    $('.top_content img:first').appendTo('.bottom_content');
  });
  
});