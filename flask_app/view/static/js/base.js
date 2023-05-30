$(document).ready(function(){
    $("textarea").on({
      mouseenter: function(){
        $(this).css("background-color", "lightgray");
      },
      mouseleave: function(){
        $(this).css("background-color", "white");
      },
    });
});