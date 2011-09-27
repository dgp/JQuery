$(function() {
  $('.bottom_button').click(function() {
    $('.bottom_content img').appendTo('.top_content');
  });
  $('.top_button').click(function() {
    $('.top_content img').appendTo('.bottom_content');
  });
  
});