$(function() {
  var grid = {
    row : 0, 
    column : 0, 
    total : 0,
    price : 0,
    prices : [ ],
    show_content : function() {
      $('#input').show();
      $('#output').show();
    },
    hide_content : function() {
      $('#output').hide();
      $('#input').hide();
    },
    create_row_with_text : function(i, j) {
      $('#grid ul li#row' + i).append("<input type = 'text' id = column-" + i + j + " class =" + j + ">");
    },
    create_li_tag : function(row_id) {
      $('#grid ul').append("<li id=row"+ row_id + "></li>");
    },
    create_ui_tag : function() {
      $('#grid').append('<ul></ul>');
    },
    create_span_tag : function() {
      var i = 0;
      for ( i = 0; i < grid.row; i++) {
        $('#prices_list').append("<span id = span" + i + "></span>");
        grid.prices[i] = 0;
      }
    },
    init : function(row, column) {
      grid.row = row;
      grid.column = column;
      grid.create_ui_tag();
      for (var i = 0; i < grid.row; i++) {
        grid.create_li_tag(i);
        for (var j = 0; j < grid.column; j++) {
          grid.create_row_with_text(i, j);
        }
      }
      grid.create_span_tag();
      grid.show_content();
    },
    add_row : function() {
      var next_row = 0, i, j;
      for (i = 0; i < 1; i++) {
        next_row = grid.addNumber(i, grid.row)
        grid.create_li_tag(next_row);
        for (var j = 0; j < grid.column; j++) {
          grid.create_row_with_text(next_row, j);
        }
      }
      grid.row = next_row + 1;
    },
    add_column : function() {
      var next_column = 0, i, j;
      for (i = 0; i < grid.row; i++) {
        for (j = 0; j < 1; j++) {
          next_column = grid.addNumber(j, grid.column);
          grid.create_row_with_text(i, next_column);
        }
      }
      grid.column = next_column + 1;
    },
    addNumber : function(a, b) {
      return ((parseInt(a, 10)+parseInt(b, 10)));
    },
    calculate_price : function(obj) {
      grid.price = $(obj).val();
      grid.calculate_indivdual_price(obj, grid.price);
      grid.total = grid.addNumber(grid.total, grid.price);
      $('#output').text(grid.total);
    },
    calculate_indivdual_price : function(current_obj, price) {
      var class_number;
      class_number = $(current_obj).attr('class');
      grid.prices[parseInt(class_number, 10)] = grid.addNumber(grid.prices[parseInt(class_number, 10)], price);
      $('#prices_list #span' + class_number).text(grid.prices[parseInt(class_number, 10)] );
    }
  };

  grid.hide_content();

  $('#create_grid').one('click', function() {
    grid.init($('#row').val(), $('#column').val());
  });

  $('#add_row').click(function () {
    grid.add_row();
  });

  $('#add_column').click(function () {
    grid.add_column();
  });

  $(':text').live('change', function() {
    if ($(this).attr('id') != 'row' && $(this).attr('id') != 'column') {
      grid.calculate_price(this);
    }
  });
  
  // new Grid({rows:10, columns:10}).show();
});