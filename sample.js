$(function () { 
  (function ( $ ) {
    var methods = {
      row_number : 0,
      column_number : 0,
      row_total : [ ],
      create_text : function(obj, id) {
        $(obj).append("<input type = 'text' id = text" + id +">");
      },
      create_button : function(obj, id, value, div_id) {
        $(obj).append("<input type = 'button' id = " + id + div_id + " value = "+ value + " >");
      },
      init : function(row, column, obj, div_id) {
        methods.row_number = row;
        methods.column_number = column;
        methods.create_ui_tag(obj);
        for (var i = 0; i < row; i++) {
          methods.create_li_tag(i, div_id);
          for (var j = 0; j < column; j++) {
            methods.create_row_with_text(i, j, div_id);
          }
        }
        methods.create_span_tag(obj, div_id)
        methods.create_button(obj, 'add_row', 'add_row', div_id);
        methods.create_button(obj, 'add_column', 'add_column', div_id);
      },
      create_li_tag : function(row_id, div_id) {
        $('ul').append("<li id=row" + div_id + row_id + "></li>");
      },
      create_ui_tag : function(obj) {
        $(obj).append('<ul></ul>');
      },
      create_row_with_text : function(i, j, div_id) {
        $('ul li#row'+ div_id + i).append("<input type = 'text' id = column-" + div_id + i + j + " class =" + j + ">");
      },
      create_span_tag : function(obj, div_id) {
        $(obj).append("<div id = row_total"+ div_id +"></div>");
        for (var i = 0; i < methods.column_number; i++) {
          $('#row_total'+ div_id).append("<span id = span"+ div_id + i + "></span>");
          methods.row_total[i] = 0;
        }
      },
      show_button : function() {
        $('#input').show();
        $('#output').show();
      },
      add_row : function(div_id) {
       var next_row = 0, i, j;
       for (i = 0; i < 1; i++) {
         next_row = methods.addNumber(i, methods.row_number)
         methods.create_li_tag(next_row, div_id);
         console.log(""+next_row+div_id+"");
         for (var j = 0; j < methods.column_number; j++) {
           methods.create_row_with_text(next_row, j, div_id);
         }
       }
       methods.row_number = next_row + 1;
      },
      add_column : function(div_id) {
        var next_column = 0, i, j;
        for (i = 0; i < methods.row_number; i++) {
          for (j = 0; j < 1; j++) {
            next_column = methods.addNumber(j, methods.column_number);
            methods.create_row_with_text(i, next_column, div_id);
          }
        }
        methods.column_number = next_column + 1;
        $('#row_total' + div_id).append("<span id = span"+ div_id + next_column + "></span>");
        methods.row_total[next_column] = 0;
      },
      addNumber : function(a, b) {
        return ((parseInt(a, 10)+parseInt(b, 10)));
      },
      calculate_price : function(obj, div_id) {
        var price = $(obj).val();
        var pattern = /^[0-9]+/;
        if (!pattern.test(price)) {
          return false;
        }
        methods.calculate_indivdual_price(obj, price, div_id);
        //methods.total = grid.addNumber(grid.total, price);
        //$('#output').text(grid.total);
      },
      calculate_indivdual_price : function(current_obj, price, div_id) {
        var class_number;
        class_number = $(current_obj).attr('class');
        methods.row_total[parseInt(class_number, 10)] = methods.addNumber(methods.row_total[parseInt(class_number, 10)], price);
        $('#row_total'+ div_id +' #span'+ div_id + class_number).text(methods.row_total[parseInt(class_number, 10)] );
      }
    };
    $.fn.dinesh_grid = function() {
      return this.each(function () {
        var current_div_obj = this;
        var current_div_id = $(this).attr('id')
        for(var i = 1; i < 3; i++ ) {
          methods.create_text(this, i);
        }
        methods.create_button(this, 'submit', 'form_grid', current_div_id);
        $('#submit' + current_div_id).one('click', function() {
          methods.init($('#text1').val(), $('#text2').val(), current_div_obj, current_div_id);
        });
        $('#add_row' + current_div_id).live('click', function () {
          console.log('row');
          methods.add_row(current_div_id);
        });
        $('#add_column' + current_div_id).live('click',function () {
          methods.add_column(current_div_id);
        });
        $(':text').live('change', function() {
          if ($(this).attr('id') != 'text1' && $(this).attr('id') != 'text2') {
            methods.calculate_price(this, current_div_id);
          }
        });
      });
    };
  }(jQuery) );
  $('#grid').dinesh_grid();
  
});