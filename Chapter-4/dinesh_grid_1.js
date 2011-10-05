$(function () { 
  (function ( $ ) {
    var grid_frame = {
      create_text : function(obj, id, grid_id) {
        $(obj).append("<input type = 'text' id = text"+ grid_id + id +">");
      },
      grid_button : function(id, value, div_id) {
        $('#' + div_id).append("<input type = 'button' id = " + id + div_id + " value = "+ value + " >");
      },
      setData : function(object) {
        $('#' + object).data('dinesh_grid', {
          row_number : 0,
          column_number : 0,
          row_total : [ ],
          total : 0
        });
      },
      init : function(row, column, div_id) {
        grid_frame.setData(div_id);
        var current_object = $('#' + div_id).data('dinesh_grid');
        current_object.column_number = column;
        current_object.row_number = row;
        grid_frame.create_grid(div_id);
        for (var i = 0; i < row; i++) {
          grid_frame.create_a_row(i, div_id);
          for (var j = 0; j < column; j++) {
            grid_frame.create_row_with_text_input(i, j, div_id);
          }
        }
        grid_frame.result_for_each_column(div_id);
        $('#'+ div_id).append("<div id = output"+ div_id + "></div>");
        grid_frame.grid_button('add_row', 'add_row', div_id);
        grid_frame.grid_button('add_column', 'add_column', div_id);
        
      },
      create_a_row : function(row_id, div_id) {
        $('ul#table'+ div_id).append("<li id=row" + div_id + row_id + "></li>");
        $('li').css('list-style', 'none');
      },
      create_grid : function(obj) {
        $('#' + obj).append('<ul id = table'+ obj +'></ul>');
      },
      create_row_with_text_input : function(i, j, div_id) {
        $('ul#table'+ div_id + ' li#row'+ div_id + i).append("<input type = 'text' id = column-" + div_id + i + j + " class =" + j + ">");
      },
      result_for_each_column : function(div_id) {
        var current_object = $('#' + div_id).data('dinesh_grid');
        $('#' + div_id).append("<div id = row_total"+ div_id +"></div>");
        for (var i = 0; i < current_object.column_number; i++) {
          $('#row_total'+ div_id).append("<span id = span"+ div_id + i + "></span>");
          current_object.row_total[i] = 0;
        }
        $('#row_total' + div_id).css('margin-left', '50px');
      },
      add_row : function(div_id) {
      var current_object = $('#'+ div_id).data('dinesh_grid');
       var next_row = 0, i, j;
       for (i = 0; i < 1; i++) {
         next_row = grid_frame.addNumber(i, current_object.row_number)
         grid_frame.create_a_row(next_row, div_id);
         for (var j = 0; j < current_object.column_number; j++) {
           grid_frame.create_row_with_text_input(next_row, j, div_id);
         }
       }
       current_object.row_number = next_row + 1;
      },
      add_column : function(div_id) {
        var current_object = $('#' + div_id).data('dinesh_grid');
        var next_column = 0, i, j;
        for (i = 0; i < current_object.row_number; i++) {
          for (j = 0; j < 1; j++) {
            next_column = grid_frame.addNumber(j, current_object.column_number);
            grid_frame.create_row_with_text_input(i, next_column, div_id);
          }
        }
        current_object.column_number = next_column + 1;
        $('#row_total' + div_id).append("<span id = span"+ div_id + next_column + "></span>");
        current_object.row_total[next_column] = 0;
      },
      addNumber : function(a, b) {
        return ((parseInt(a, 10)+parseInt(b, 10)));
      },
      calculate_total : function(obj, div_id) {
        var price = $(obj).val();
        var current_object = $('#' + div_id).data('dinesh_grid');
        var pattern = /^[0-9]+/;
        if (!pattern.test(price)) {
          return false;
        }
        grid_frame.calculate_indivdual_total(obj, price, div_id);
        current_object.total = grid_frame.addNumber(current_object.total, price);
        $('#output' + div_id).text('Total: ' + current_object.total).css('color', 'green');;
      },
      calculate_indivdual_total: function(obj, price, div_id) {
        var class_number;
        var current_object = $('#' + div_id).data('dinesh_grid');
        class_number = $(obj).attr('class');
        current_object.row_total[parseInt(class_number, 10)] = grid_frame.addNumber(current_object.row_total[parseInt(class_number, 10)], price);
        $('#row_total'+ div_id +' #span'+ div_id + class_number).text(current_object.row_total[parseInt(class_number, 10)] );
      }
    };
    $.fn.dinesh_grid = function(options) {
      options = $.extend()
      return this.each(function () {
        var current_div_id = $(this).attr('id')
        for(var i = 1; i < 3; i++ ) {
          grid_frame.create_text(this, i, current_div_id);
        }
        grid_frame.grid_button('submit', 'form_grid', current_div_id);
        $('#submit' + current_div_id).bind('click', function() {
          var current_object_id = $(this).parent().attr('id');
          var a = $('#text' + current_object_id + '1').val();
          var b = $('#text' + current_object_id+ '2').val();
          var pattern = /^[0-9]+/;
          if (!pattern.test(a) && !pattern.test(b)) {
            return false;
          }
          $('#submit' + current_div_id).unbind();
          console.log(current_object_id);
          grid_frame.init(a, b, current_object_id);
        });
        $('#add_row' + current_div_id).live('click', function () {
          var current_object_id = $(this).parent().attr('id');
          grid_frame.add_row(current_object_id);
        });
        $('#add_column' + current_div_id).live('click',function () {
          var current_object_id = $(this).parent().attr('id');
          grid_frame.add_column(current_object_id);
        });
        $('#' + $(this).attr('id') + ' :text').live('change', function() {
          var current_object_id = $(this).parent().parent().parent().attr('id');
          $('span').css({ 'padding': '0 50px 0 65px', 'color': 'red' });
          if ($('#' + current_object_id).attr('id') != 'text'+ current_object_id +'1' && $('#' + current_object_id).attr('id') != 'text'+ current_object_id +'2') {
            grid_frame.calculate_total(this, current_object_id);
          }
        });
      });
    };
  }(jQuery) );
  $('#grid').dinesh_grid();
  $('#grid1').dinesh_grid();
  $('#grid2').dinesh_grid();
});