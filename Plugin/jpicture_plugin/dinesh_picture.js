$(function() {
  (function ( $ ) {
    var image_plugin = {
      setData : function(id) {
        $('#' + id).data('dinesh_picture', {
          current_position : 1,
          first_click : 0,
          last_position : 0,
          scroll_position: 30,
          first_click_scroll : 0,
        });
      },
      set_image_size : function(img_width, img_height, object) {
        var name = $(object).attr('class');
        $(' img').css({
          'width': img_width, 
          'height': img_height, 
          'position': 'relative',
          'float': 'left'
        });
      },
      set_content_size : function(item, img_width, img_height) {
        var total_width = (parseInt(item, 10) * parseInt(img_width, 10)) + 'px';
        $('#picture_content').css({
          'width': total_width,
          'height' : img_height,
          'overflow': 'hidden'
        });
      },
      set_image_grid_size : function(size, img_width, img_height) {
        var total_width = 30  + (parseInt(size, 10) * parseInt(img_width, 10)) + 'px';
        $('.image_grid').css({
          'width': total_width,
          'height' : img_height
        });
      },
      set_scroll_number_in_footer : function(size, visible, list_width) {
        $('#picture_content').append('<div id = scroll></div>');
        var lt_width = parseInt(list_width, 10);
        for (var i = 1; i <= size; i++) {
          console.log(i);
          $('#picture_content #scroll').append("<li><a href ='#' id = " + i + ">" + i + "</a></li>");
        }
        $('#scroll').css({'width': (size * (lt_width)) });
        $('#scroll li').css({'width': list_width});
        $('#scroll').append('<div id = active></div>');
        var right_position = 0;
        if (size%2 === 0) {
          right_position = size/2 - 2; 
        } else {
          right_position = Math.floor(size/2) - 1;
        }
        console.log('mat' + (right_position));
        $('#active').css({'width': (visible * (lt_width - 2)) + 'px'});
        $('a').addClass('footer');
      },
      hide_arrows : function(visible, size, width) {
        var current_object = $('#picture_content').data('dinesh_picture');
        console.log('hide');
        if(current_object.current_position === 1 || current_object.current_position === '1') {
          $("#previous").hide();
          $('#next').show();
        } else {
          if(current_object.current_position > (size-visible)) {
            $('#next').hide();
            $('#previous').show();
          } else if(current_object.current_position <= (size-visible)) {
            $("#previous").show();
            $('#next').show();
          }
        }
      },
      image_movement : function(visible, size, current_position, width) {
        var current_object = $('#picture_content').data('dinesh_picture');
        var position = 0;
        if (current_position > (size - parseInt(visible, 10))) {
          for(var i = 0; i < visible; i++) {
            if (current_position === "" + ((parseInt(size,10) - i))) {
              if (current_object.first_click === 0) {
                console.log('i1');
                if(current_object.last_position == 0) {
                  console.log('i2');
                  position = (((parseInt(current_position, 10) -(parseInt(visible) - i)) - parseInt(current_object.last_position, 10) ) * parseInt(width, 10) );
                } else {
                  console.log('i3');
                  position = ((parseInt(current_position, 10) - parseInt(current_object.last_position) - (parseInt(visible) - (i + 1))) * parseInt(width, 10));
                }
                current_object.last_position = current_position;
                $("img").animate({"left": '-=' + position + "px"}, "slow");
                current_object.first_click++;
              }
              //by arrow it reach last hide the next arrow
              $("#next").hide();
              //by clicking number
              // break;
            }
          } 
        } else {
          current_object.last_position = current_position;
          current_object.first_click = 0
          position = ( ( parseInt (current_position, 10) - 1) * parseInt(width, 10) );
          $("img").animate({"left": -position + "px"}, "slow");
        }         
      },
      show_current_position : function() {
        var current_object = $('#picture_content').data('dinesh_picture');
        var position = (parseInt(current_object.current_position, 10) - 1)
        $('#scroll a:eq('+ position +')').addClass('selected');
        $('.image_grid img:eq('+ position +')').addClass('image_selected');
      },
      remove_previous_position : function() {
        $('#scroll a').removeClass('selected');
        $('.image_grid img').removeClass('image_selected');
      },
      scroll_movement : function(current_position, size, visible, list_width) {
        var scroll_position = 0;
        var lt_width = parseInt(list_width, 10) - 1;
        var current_object = $('#picture_content').data('dinesh_picture');
        console.log((current_object.last_position >= (size - visible + 1)));
        if (current_position > (size - parseInt(visible, 10))) {
          for(var i = 0; i < visible; i++) {
            if (current_position === "" + ((parseInt(size,10) - i)) || current_position === ((parseInt(size,10) - i))) {
              if (current_object.first_click_scroll === 0) {
                if(current_object.last_position == 0) {
                  scroll_position = (((parseInt(current_position, 10) - (parseInt(visible) - i)) - parseInt(current_object.last_position, 10)) * lt_width);
                } else {
                  console.log('5');
                  scroll_position = ((parseInt(current_position, 10) - parseInt(current_object.last_position) - (parseInt(visible) - (i + 1))) * lt_width);
                }
                current_object.first_click_scroll++;
              }
            }
          }
        } else if(current_object.last_position == 0) {
          console.log('1');
          current_object.first_click_scroll = 0;
          scroll_position = (parseInt(current_position, 10) - 1) * lt_width + parseInt(current_position, 10);
          // console.log($("#scroll #active").animate({"right": '-=' + scroll_position + "px"}, "slow"));
        } else if ((current_object.last_position >= (size - visible + 1)) && (current_object.last_position < current_position )) {
          console.log('2');
          scroll_position = (parseInt(current_position, 10) - ((size - visible) + 1)) * lt_width;
          // console.log($("#scroll #active").animate({"right": '-=' + scroll_position + "px"}, "slow"));
        } else if((current_object.last_position >= (size - visible + 1)) && (current_object.last_position > current_position )) {
          scroll_position = ( parseInt(current_position, 10)- ((size - visible) + 1)) * lt_width;
        } else {
                    console.log('3');
          current_object.first_click_scroll = 0;
          scroll_position = (parseInt(current_position, 10) - (parseInt(current_object.last_position, 10))) * lt_width;
        }
        if(current_position >= 20 && current_object.last_position < 20 && current_object.last_position != 0) {
           scroll_position += 6;
           console.log('scrol+' + scroll_position);
         } else if (current_position <= 20 && current_object.last_position > 20  && current_object.last_position != 0) {
           scroll_position -= 7;
           console.log('scrol-' + scroll_position);
         }
         if(current_position >= 10 && current_object.last_position < 10 && size < 20) {
            scroll_position += 6;
            console.log('scrol+' + scroll_position);
          } else if (current_position <= 10 && current_object.last_position > 10 && size < 20) {
            scroll_position -= 7;
            console.log('scrol-' + scroll_position);
          }
        $("#scroll #active").animate({"right": '-=' + scroll_position + "px"}, "slow");
      }
    };
    $.fn.dinesh_picture = function(options) {
      var width = $('body').outerWidth();
      image_width = Math.floor(width/5);
      var default_settings = {
        image_width:  image_width +'px',
        image_height: '500px',
        content_height: '540px',
        list_width : '55px',
        image_visible: 5
      };
      return this.each(function () {
        var size = 0;
        if (options) {
          $.extend(default_settings, options);
        }
        var current_obj = this;
        //wrap into div class
        $(this).wrap('<div id = picture_content></div>');
        //remove the class name which given by user
        $(this).removeClass();
        //add the class name
        $(this).addClass('image_grid');
        image_plugin.set_image_size(default_settings.image_width, default_settings.image_height, current_obj);
        image_plugin.set_content_size(default_settings.image_visible, default_settings.image_width, default_settings.content_height);
        //getting the image count
        size = $('.image_grid img').size();
        image_plugin.set_image_grid_size(size, default_settings.image_width, default_settings.image_height);
        image_plugin.set_scroll_number_in_footer(size, default_settings.image_visible, default_settings.list_width);
        $('#picture_content').append("<a href = '#' id = previous></a>");
        $('#picture_content').append("<a href='#' id = next></a>");
        image_plugin.setData('picture_content');
        //disable the prevbutton initially
        if (default_settings.image_visible < size) {
          $("#previous").hide();
        }
        else
        {
          $("#next").hide();
          $("#previous").hide();
        }
        var current_object = $('#picture_content').data('dinesh_picture');
        $("#next").live('click', function(){
          current_object.current_position = ++current_object.current_position;
          image_plugin.scroll_movement(current_object.current_position, size, default_settings.image_visible, default_settings.list_width);
          $("img").animate({"left": '-=' + default_settings.image_width}, "slow");
          current_object.first_click = 0;
          current_object.first_click_scroll = 0;
          image_plugin.remove_previous_position();
          image_plugin.show_current_position();
          image_plugin.hide_arrows(default_settings.image_visible, size);
          current_object.last_position = current_object.current_position;
        });
        $("#previous").live('click', function(){
          current_object.current_position = --current_object.current_position;
          current_object.first_click = 0;
          current_object.first_click_scroll = 0;
          if(!((current_object.last_position >= ((size - default_settings.image_visible) + 1)) && (current_object.current_position>= ((size - default_settings.image_visible) + 1)))) {
            $("img").animate({"left": '+=' + default_settings.image_width}, "slow");
            image_plugin.scroll_movement(current_object.current_position, size, default_settings.image_visible, default_settings.list_width);
          }
          image_plugin.remove_previous_position();
          image_plugin.show_current_position();
          image_plugin.hide_arrows(default_settings.image_visible, size, default_settings.image_width);
          current_object.last_position = current_object.current_position;
        });
        $('#scroll a').live('click', function() {
          var current_position = $(this).text();
          current_object.current_position = current_position;
          image_plugin.scroll_movement(current_position, size, default_settings.image_visible, default_settings.list_width);
          image_plugin.image_movement(default_settings.image_visible, size, current_position, default_settings.image_width);
          image_plugin.remove_previous_position();
          image_plugin.show_current_position();
          image_plugin.hide_arrows(default_settings.image_visible, size, default_settings.image_width);
        });
        image_plugin.show_current_position();
      });
    }
  }(jQuery));
});