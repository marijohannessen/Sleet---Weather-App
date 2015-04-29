$(document).ready(function() {

var $button = $("#navButton");
$("#mainNav").hide();
$button.click(function() {
    $("#mainNav").toggle();
});
   
$('#mainMenu').sticky({
    widthFromWrapper: true
});
    
$('#da-thumbs li div').hide();
    
$(function() {
			
				$(' #da-thumbs > li ').each( function() { $(this).hoverdir(); } );

			});
    
});