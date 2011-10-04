$(function () {
  (function ( $ ) {
    var grid_frame  = {
      setData : function(id) {
        $('#' + id).data('dinesh_grid', {
          row_number : 0,
          column_number : 0,
          row_total : [ ],
          total : 0
        });
      },
      submit_button : function(id, value, frame_id) {
        $('#'+ frame_id).append("<input type = 'button' id = " + id + frame_id + " value = "+ value + " >");
      },
      create_a_row : function(row_id, id) {
        $('ul#table'+ id).append("<li id=row" + id + row_id + "></li>");
        $('li').css('list-style', 'none');
      },
      create_grid : function(id) {
        $('#' + id).append('<ul id = table'+ id +'></ul>');
      },
      create_row_with_text_input : function(i, j, id) {
        $('ul#table'+ id + ' li#row'+ id + i).append("<input type = 'text' id = column-" + id + i + j + " class =" + j + ">");
      },
      result_for_each_column : function(id) {
        var current_object = $('#' + id).data('dinesh_grid');
        $('#' + id).append("<div id = row_total"+ id +"></div>");
        for (var i = 0; i < current_object.column_number; i++) {
          $('#row_total'+ id).append("<span id = span"+ id + i + "></span>");
          $('#row_total' + id).css('margin-left', '50px');
          current_object.row_total[i] = 0;
        }
      },
      addNumber : function(a, b) {
        return ((parseInt(a, 10)+parseInt(b, 10)));
      },
      add_row : function(frame_id) {
      var current_object = $('#'+ frame_id).data('dinesh_grid');
       var next_row = 0, i, j;
       for (i = 0; i < 1; i++) {
         next_row = grid_frame.addNumber(i, current_object.row_number)
         grid_frame.create_a_row(next_row, frame_id);
         for (var j = 0; j < current_object.column_number; j++) {
           grid_frame.create_row_with_text_input(next_row, j, frame_id);
         }
       }
       console.log(current_object.row_number = next_row + 1);
      },
      add_column : function(frame_id) {
        var current_object = $('#' + frame_id).data('dinesh_grid');
        var next_column = 0, i, j;
        for (i = 0; i < current_object.row_number; i++) {
          for (j = 0; j < 1; j++) {
            next_column = grid_frame.addNumber(j, current_object.column_number);
            grid_frame.create_row_with_text_input(i, next_column, frame_id);
          }
        }
        current_object.column_number = next_column + 1;
        $('#row_total' + frame_id).append("<span id = span"+ frame_id + next_column + "></span>");
        current_object.row_total[next_column] = 0;
      },
      init : function(row, column, id) {
        grid_frame.setData(id);
        var current_object = $('#' + id).data('dinesh_grid');
        current_object.column_number = column;
        current_object.row_number = row;
        grid_frame.create_grid(id);
        for (var i = 0; i < row; i++) {
          grid_frame.create_a_row(i, id);
          for (var j = 0; j < column; j++) {
            grid_frame.create_row_with_text_input(i, j, id);
          }
        }
        grid_frame.result_for_each_column(id);
        $('#'+ id).append("<div id = output"+ id + "></div>");
        grid_frame.submit_button('add_row', 'add_row', id);
        grid_frame.submit_button('add_column', 'add_column', id);
      },
      calculate_total : function(obj, div_id) {
        var price = $(obj).val();
        var pattern = /^[0-9]+/;
        var current_object = $('#' + div_id).data('dinesh_grid');
        if (!pattern.test(price)) {
          return false;
        }
        grid_frame.calculate_indivdual_total(obj, price, div_id);
        current_object.total = grid_frame.addNumber(current_object.total, price);
        $('#'+ div_id + ' #output'+ div_id).text('Total: ' + current_object.total).css('color', 'green');
      },
      calculate_indivdual_total: function(obj, price, div_id) {
        var class_number;
        var current_object = $('#' + div_id).data('dinesh_grid');
        class_number = $(obj).attr('class');
        current_object.row_total[parseInt(class_number, 10)] = grid_frame.addNumber(current_object.row_total[parseInt(class_number, 10)], price);
        $('#row_total'+ div_id +' #span'+ div_id + class_number).text(current_object.row_total[parseInt(class_number, 10)] );
      }
    };

    $.fn.dinesh1_grid = function(options) {
      var settings = {
        row : 5,
        column : 5
      };
      return this.each(function() {
        if( options ) {
          $.extend(settings, options);
        }
        var current_frame_id = $(this).attr('id');
        grid_frame.init(settings.row, settings.column, current_frame_id);
        $('#add_row' + current_frame_id).live('click', function () {
          var current_object_id = $(this).parent().attr('id');
          grid_frame.add_row(current_object_id);
        });
        $('#add_column' + current_frame_id).live('click',function () {
          var current_object_id = $(this).parent().attr('id');
          grid_frame.add_column(current_object_id);
        });
        console.log($(this).attr('id'));
        $('#' + $(this).attr('id') + ' :text').live('change', function() {
          $('span').css({ 'padding': '0 50px 0 65px', 'color': 'red' });
          var current_object_id = $(this).parent().parent().parent().attr('id');
          grid_frame.calculate_total(this, current_object_id);
        });
      });
    }
  }(jQuery));
  $('#grid').dinesh1_grid();
  $('#grid1').dinesh1_grid({row:3, column: 2});
  $('#grid2').dinesh1_grid({row:6, column: 5});
});