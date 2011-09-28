$(function () {
  $('.top_button').addClass('hide_button');
  $('.bottom_button').click( function () {
    $('.bottom_content img:first').appendTo('.top_content');
    var length = 0;
    length = $('.bottom_content').find('img').length
    if (length === 0) {
      $('.bottom_button').addClass('hide_button');
    }
    length = $('.top_content').find('img').length
    if (length >= 0) {
      $('.top_button').removeClass('hide_button');
    }
  });
  $('.top_button').click(function() {
    $('.top_content img:first').appendTo('.bottom_content');
    var length;
    length = $('.top_content').find('img').length
    if (length == 0) {
      $('.top_button').addClass('hide_button');
    }
    length = $('.bottom_content').find('img').length
    if (length >= 0) {
      $('.bottom_button').removeClass('hide_button');
    }
  });
});