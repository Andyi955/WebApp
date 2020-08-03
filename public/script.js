
function likeIt(){
  alert('Thanks! You\'re okay too');
}

function showHide() {
  var readMoreDiv = document.getElementById("readmore");
  if (readMoreDiv.style.display === "block") {
    readMoreDiv.style.display = "none";

  } else {
    readMoreDiv.style.display = "block";
  }
            readMoreDiv.style.color = "black";


}

function welcomeUser() {
  var username = prompt("What's your name?");
  var welcomeUserDiv = document.getElementById("welcomeuser");
  welcomeUserDiv.style.display = "block";
  document.getElementById('welcomeuser').innerHTML = '<p> Welcome, ' + username + ', to my Web App! </p>';
  welcomeUserDiv.style.cursor = "pointer";
}

function hideWelcome(){
  var welcomeUserDiv = document.getElementById("welcomeuser");
    welcomeUserDiv.style.display = "none";

}



function getRating() {
  let userRating = parseInt(prompt("Rate this collection (from 1 to 5 stars)"));
  if (userRating>5 || userRating<1 || isNaN(userRating)){
    alert("Try again with a number between 1 and 5!");
  }
  else{
    $("#rating").html("");
    for (let i=0; i < userRating; i++){
        $("#rating").append("<i class='yellow star icon'></i>");
    }
  }
}

$('.delgame').on('click', function(){
  return confirm("Do you really want to delete this song?");
})

$('.deleteGen').on('click', function(){
  return confirm("Do you really want to delete this Genre?");
})


$('.ui.star.rating')
  .rating({
    initialRating: 2,
    maxRating: 5
  })
;

$('.ui.red.card').transition('horizontal flip in');
 
$('.ui.green.button').transition('set looping').transition('bounce', '1500ms');

$('.ui.image.img')
  .transition({
    animation : 'jiggle',
    duration  : 900,
    interval  : 200
  })
;

$('.chevron.large.right.icon').click(function(){
  $('.ui.rectangle.shape').shape('flip right');
});


$('.chevron.large.left.icon.left').click(function(){
  $('.ui.rectangle.shape').shape('flip left');
});
$('.chevron.large.up.icon').click(function(){
  $('.ui.rectangle.shape').shape('flip up');
});

$('.chevron.large.down.icon').click( function(){
  $('.ui.rectangle.shape').shape('flip down');
});