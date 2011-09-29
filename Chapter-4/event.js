$(function () {
  $('div span').hide();
  var prices = {mango: 122, dosa: 10, idly: 30, apple: 40}
  $(':checkbox').click(function () {
    var check = this.checked;
    var checkbox_id = $(this).attr('id');
    var parent = $('#' + checkbox_id).parent().attr('id');
    if (check) {
      $('#' + parent + ' ' + 'span:first').show();
    } else {
      $('#' + parent + ' ' + 'span:first').hide();
    }
  });
  $(':radio').click(function () {
    var value = $(this).attr('value');
    var price = $(this).attr('data_price');
    //var price;
    var radio_id = $(this).attr('id');
    var parent = $('#' + radio_id).parent().parent().attr('id');
    //price = prices[value];
    $('#' + parent + ' ' + 'span .output').show();
    $('#' + parent + ' ' + '.quantity').val('1');
    $('#' + parent + ' ' +'span#price').show().text(price);
  });
  $('#foo').bind('click', function() {
    alert('User clicked on "foo."');
  });
  $('.quantity').change(function () {
    var parent_id = $(this).parent().parent().parent().attr('id');
    var radio = $('#' + parent_id + ' ' + ':radio:checked');
    var price = $(radio).attr('data_price');
    var quantity = $(this).val();
    var pattern = /^[0-9]+/;
    if (!pattern.test(quantity)) {
      alert('please enter number!');
      return false;
    }
    console.log(parent_id);
    console.log(quantity);
    $('#' + parent_id + ' ' +'span#price').text((price*quantity));
  });
});