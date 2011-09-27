$(function() {
  $('.bottom_button').click(function() {
    $('.bottom_content img:first').appendTo('.top_content');
    var tag1 = $('.bottom_content').find('img')
    if (tag1.length == 0) 
    {
      $('.bottom_button').addClass('hide_button');
    }
    var tag2 = $('.top_content').find('img')
    if (tag2.length >= 0)
    {
      $('.top_button').removeClass('hide_button');
    }
  });
  $('.top_button').click(function() {
    $('.top_content img:first').appendTo('.bottom_content');
    var tag3 = $('.top_content').find('img')
    if (tag3.length == 0)
    {
      $('.top_button').addClass('hide_button');
    }
    var tag4 = $('.bottom_content').find('img')
    if (tag4.length >= 0)
    {
      $('.bottom_button').removeClass('hide_button');
    }
  });
});