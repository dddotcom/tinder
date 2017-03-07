console.log("hello!");
$('.carousel').carousel({
  interval: false
})


$(document).ready(function(){
  console.log("DOM ready");

  $(".put-form").on("submit", function(e){
    e.preventDefault();
    var element = $(this);
    var url = element.attr('action');
    var data = element.serialize();
    $.ajax({
      method: "PUT",
      url: url,
      data: data,
    }).done(function(data){
      // element.remove();
      window.location = "/profile";
    });
  });
})
