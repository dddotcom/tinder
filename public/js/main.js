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

  $(".btn-dislike").click(function(e){
    e.preventDefault();
    var id = findGreatestZindex();
    $( "#" + id ).hide( "slide", { direction: "left"  }, "slow", function() {
      $("#" + id).remove();
      //now post to database
      $.ajax({
        method: "POST",
        url: "/potentials/dislike/" + id,
        data: $(this).serialize(),
      }).done(function(data){
        console.log("done adding to dislikes!");
        if (!document.URL.endsWith('/potentials')){
            window.location = "/potentials";
        }
      });
    });
  });

  $(".btn-like").click(function(e){
    e.preventDefault();
    var id = findGreatestZindex();
    $( "#" + id ).hide( "slide", { direction: "right"  }, "slow", function() {
      $("#" + id).remove();
      //now post to database
      $.ajax({
        method: "POST",
        url: "/potentials/like/" + id,
        data: $(this).serialize(),
      }).done(function(data){
        console.log("done adding to likes!");
        console.log(data);
        if(data.redirect){
            window.location = data.redirect
        }
         else if (!document.URL.endsWith('/potentials')){
            window.location = "/potentials";
        }
      });
    });
  });

  $(".btn-superlike").click(function(e){
    e.preventDefault();
    var id = findGreatestZindex();
    $( "#" + id ).slideUp( "slow", function() {
      $(this).remove();
      //now post to database
      $.ajax({
        method: "POST",
        url: "/potentials/superlike/" + id,
        data: $(this).serialize(),
      }).done(function(data){
        console.log("done adding to likes as a superlike!");
        if(data.redirect){
            window.location = data.redirect
        }
         else if (!document.URL.endsWith('/potentials')){
            window.location = "/potentials";
        }
      });
    });
  });

  $(".btn-next").click(function(e){
    e.preventDefault();
    var id = findGreatestZindex();
    $("#" + id).slideUp("slow", function(){
      $(this).remove();
    });
  });

  // delete-interest

})

function findGreatestZindex(){
  var index_highest = -1;
  var index_highest_id = null;
  $(".potential-user").each(function() {
    // always use a radix when using parseInt
    var index_current = parseInt($(this).css("zIndex"), 10);
    if(index_current > index_highest) {
        index_highest = index_current;
        index_highest_id = $(this).attr('id');
    }
  });

  if(!index_highest_id){
    index_highest_id = $(".potential-user").attr('id');
  }

  console.log("index_highest_id " + index_highest_id );
  return index_highest_id;
}
