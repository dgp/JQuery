  console.log('eee');
  $(function() {
    $('table tr:nth-child(even)').addClass('striped');
    $('p').css('color', 'violet');
    var width = $('p:first').width();
    var height = $('p:first').height();
    alert("width:" + width + " " + "height:" + height);
    alert("class name is present in last <p> :" + $('p:last').hasClass('a'));
    
    var toggle_row = function() {
      $('tr').toggleClass('striped');      
    };
    $('tr').bind('mouseover', toggle_row).bind('mouseout', toggle_row);
  });      
