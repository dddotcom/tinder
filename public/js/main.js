var homeText = ["Discover New and Interesting People", "Swipe Right to anonymously like someone or Swipe Left to pass",
"If they also Swipe Right, It's a Match!", "Only people you've matched with can message you"];

$(".like-text").css('visibility', 'visible').hide();
$(".nope-text").css('visibility', 'visible').hide();
$(".super-like-text").css('visibility', 'visible').hide();

$(document).ready(function(){

  hideTinderControls();

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
    }).done(function(data){
      // element.remove();
      if(data.error){
        window.location = "/profile/edit";
      } else {
        window.location = "/profile";
      }
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
          if(data.match){
            if(document.URL.endsWith('/potentials#_=_') || document.URL.endsWith('/potentials')){
              console.log('show modal #modal-match-' + id );
              $('#modal-match-' + id).modal({
                backdrop: 'static',
                keyboard: false
              });
            }
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
          if(data.match){
            $('#modal-match-' + id).modal({
              backdrop: 'static',
              keyboard: false
            });
          }
        });
      });
    });
  });

  $(".btn-next").click(function(e){
    e.preventDefault();
    var id = findGreatestZindex();
    // $( "#" + id ).hide( "slide", { direction: "up"  }, "slow", function() {
    //   $(this).parent('.col-5').parent('.row').remove();
    //   $("#" + id).remove();
    // });
  });

  $(".btn-dislike-zoom").click(function(e){
    var potentialId = $(".potential-user").attr('id');
    $.ajax({
      method: "POST",
      url: "/potentials/dislike/" + potentialId,
      data: $(this).serialize(),
    }).done(function(data){
      if(data.redirect){
          window.location = data.redirect;
      }
       else if (!document.URL.endsWith('/potentials')){
          window.location = "/potentials";
      }
    });
  });

  $(".btn-like-zoom").click(function(e){
    var potentialId = $(".potential-user").attr('id');
    $.ajax({
      method: "POST",
      url: "/potentials/like/" + potentialId,
      data: $(this).serialize(),
    }).done(function(data){
      if(data.match){
        $('#modal-match-' + potentialId).modal({
          backdrop: 'static',
          keyboard: false
        });
      }
      else if (!document.URL.endsWith('/potentials')){
       window.location = "/potentials";
      }
    });
  });
  $(".btn-superlike-zoom").click(function(e){
    var potentialId = $(".potential-user").attr('id');
    $.ajax({
      method: "POST",
      url: "/potentials/superlike/" + potentialId,
      data: $(this).serialize(),
    }).done(function(data){
      if(data.match){
        $('#modal-match-' + potentialId).modal({
          backdrop: 'static',
          keyboard: false
        });
      }
      else if (!document.URL.endsWith('/potentials')){
       window.location = "/potentials";
      }
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

  $(".delete-user").click(function(e){
    e.preventDefault();
    $.ajax({
      method: 'DELETE',
      url:'/profile',
    }).done(function(){
      window.location = '/';
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
      var pic = $(".profile-pic-" + data.picId)[0];
      $(pic).attr("src", data.picUrl);

    });
  });

  $(".get-tinder-plus-btn").click(function(e){
    e.preventDefault();
    console.log("clicked");
    $(".tinder-plus-alert").show();
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

  return index_highest_id;
}

function hideTinderControls(){
  if(document.referrer.includes("chatroom") && window.location.href.includes("potentials")){
      $(".tinder-controls-zoom").hide();
  }
}
