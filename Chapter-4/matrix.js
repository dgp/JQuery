$(function() {
  var row = 10;
  var column = 10;
  var total = 0;
  $('#input').hide();
  $('#form_grid').click( function() {
    $('#grid').append("<ul> </ul>");
    for (var i = 0; i < row; i++) {
      $('#grid ul').append("<li id=row"+ i + "></li>");
      for (var j = 0; j < column; j++) {
        $('#grid ul li#row' + i).append("<input type = 'text' id = column-" + i + '-' + j + ">");
      }
    }
    $('#form_grid').unbind();
    $('#input').show();
  });
  $('#add_row').click(function () {
    var next_row;
    for (var i = 0; i < 1; i++) {
      next_row = (parseInt(i, 10)+parseInt(row, 10))
      $('#grid ul').append("<li id = row"+ next_row + "></li>");
      for (var j = 0; j < column; j++) {
        console.log($('#grid ul li#row' + next_row).append("<input type = 'text' id = " + next_row + j + ">"));
      }
    }
    row = parseInt(row) + 1;
  });
  $('#add_column').click(function () {
    var next_column;
    for (var i = 0; i < row; i++) {
      next_column = (parseInt(j, 10)+parseInt(column, 10))
      for (var j = 0; j < 1; j++) {
        $('#grid ul li#row' + i).append("<input type = 'text' id = col" + (parseInt(j, 10)+parseInt(column, 10)) + ">");
      }
    }
    column = parseInt(column, 10) + 1;
  });
  $(':text').live('change', function() {
    var price = $(this).val();
    total = parseInt(total, 10) + parseInt(price, 10)
    $('#output').text(total);
  });
});