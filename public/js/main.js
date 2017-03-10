var homeText = ["Discover New and Interesting People", "Swipe Right to anonymously like someone or Swipe Left to pass",
"If they also Swipe Right, It's a Match!", "Only people you've matched with can message you"];

$(document).ready(function(){
  console.log("DOM ready");
  $(".like-text").hide();
  $(".nope-text").hide();
  $(".super-like-text").hide();

  $('.carousel').carousel({
    interval: false
  });

  $(".carousel").on('slide.bs.carousel', function(evt) {
  var textIndex = $(evt.relatedTarget).index();
  $("#carousel-text").text(homeText[textIndex]);
});

  $(".put-form").on("submit", function(e){
    e.preventDefault();
    var element = $(this);
    var url = element.attr('action');
    var data = element.serialize();
    $.ajax({
      method: "PUT",
      url: url,
      data: data,
    }).done(function(){
      // element.remove();
      window.location = "/profile";
    });
  });

  $(".btn-dislike").click(function(e){
    e.preventDefault();
    var id = findGreatestZindex();
    $("#" + id).find(".nope-text").fadeIn("slow", function(){
      $( "#" + id ).hide( "slide", { direction: "left"  }, "slow", function() {
        $("#" + id).remove();
        //now post to database
        $.ajax({
          method: "POST",
          url: "/potentials/dislike/" + id,
          data: $(this).serialize(),
        }).done(function(){
          console.log("done adding to dislikes!");
          if (!document.URL.endsWith('/potentials')){
              window.location = "/potentials";
          }
        });
      });
    });
  });

  $(".btn-like").click(function(e){
    e.preventDefault();
    var id = findGreatestZindex();
    $("#" + id).find(".like-text").fadeIn("slow", function(){
      $( "#" + id ).hide( "slide", { direction: "right"  }, "slow", function() {
        $(this).parent('.col-5').parent('.row').remove();
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
              window.location = data.redirect;
          }
           else if (!document.URL.endsWith('/potentials')){
              window.location = "/potentials";
          }
        });
      });
    });
  });

  $(".btn-superlike").click(function(e){
    e.preventDefault();
    var id = findGreatestZindex();
    $("#" + id).find(".super-like-text").fadeIn("slow", function(){
      $( "#" + id ).hide( "slide", { direction: "up" }, "slow", function() {
        $(this).parent('.col-5').parent('.row').remove();
        $("#" + id).remove();
        //now post to database
        $.ajax({
          method: "POST",
          url: "/potentials/superlike/" + id,
          data: $(this).serialize(),
        }).done(function(data){
          console.log("done adding to likes as a superlike!");
          if(data.redirect){
              window.location = data.redirect;
          }
           else if (!document.URL.endsWith('/potentials')){
              window.location = "/potentials";
          }
        });
      });
    });
  });

  $(".btn-next").click(function(e){
    e.preventDefault();
    var id = findGreatestZindex();
    $("#" + id).find(".super-like-text").fadeIn("slow", function(){
      $( "#" + id ).hide( "slide", { direction: "up"  }, "slow", function() {
        $(this).parent('.col-5').parent('.row').remove();
        $("#" + id).remove();
      });
    });
  });

  // delete-interest
  $(".delete-interest").click(function(e){
    e.preventDefault();
    var element = $(this);
    var interestId = element.attr('id');
    $.ajax({
      method: 'DELETE',
      url: '/profile/addInterest/' + interestId,
    }).done(function(){
      element.remove();
      window.location = '/profile';
    });
  });

  $(".getNewPic").click(function(e){
    e.preventDefault();
    var element = $(this);
    var url = element.attr('href');
    console.log(url);
    $.ajax({
      method: 'GET',
      url: url,
    }).done(function(data){
      //set url to new url
      console.log(data);
      var pic = $(".profile-pic-" + data.picId)[0];
      $(pic).attr("src", data.picUrl);

    });
  });

});

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
