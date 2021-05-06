var friends_column = document.querySelector("#friends");
function show_my_friends() {
  fetch("http://localhost:8080/friends").then(function(response) {
    response.json().then(function(data) {
      //Loops for data in our txt file
      // @ts-ignore
      friends_column.innerHTML = "";
      data.forEach(function(place) {
        var new_friend = document.createElement("p");
        new_friend.innerHTML = place;
        friends_column.appendChild(new_friend);
      });
    });
  });
}
show_my_friends();

var addButton = document.querySelector("#add");
addButton.onclick = function() {
  // @ts-ignore
  var new_friend = document.querySelector("#add_input").value;
  // @ts-ignore
  document.querySelector("#add_input").value = "";
  var bodyS = "name=" + encodeURIComponent(new_friend);
  fetch("http://localhost:8080/friends", {
    // request parameters:
    method: "POST",
    body: bodyS,
    // @ts-ignore
    Headers: { "Content-Type": "application/x-www-form-urlencoded" }
    // @ts-ignore
  }).then(function(response) {
    // handle the response:
    show_my_friends();
  });
};
var input = document.querySelector("#add_input");
input.addEventListener("keyup", function(event) {
  // @ts-ignore
  if (event.keyCode === 13) {
    event.preventDefault();
    // @ts-ignore
    document.querySelector("#add").click();
  }
});
//Add your friends with voice recognition
var talk_button = document.querySelector("#talk");
var content = document.querySelector("#content");

var SpeechRecognition =
  // @ts-ignore
  window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

recognition.onstart = function() {
  console.log("Voice is activated");
  setTimeout(function() {
    document.getElementById("added").innerHTML = "";
  }, 0);
  var img = document.createElement("i");
  img.setAttribute("class", "fas fa-spinner fa-pulse fa-2x");
  var foo = document.getElementById("listening");
  foo.appendChild(img);
};

recognition.onresult = function(event) {
  var listening1 = document.querySelector("#listening");
  listening1.innerHTML = "";
  setTimeout(function() {
    document.getElementById("added").innerHTML =
      "Your friend has been successfully added to your list!" +
      "<br>" +
      "Press 'Speak' to add a new friend!";
  }, 100);

  var current = event.resultIndex;
  var transcript = event.results[current][0].transcript;
  var Body2 = "name=" + encodeURIComponent(transcript);
  fetch("http://localhost:8080/friends", {
    // request parameters:
    method: "POST",
    body: Body2,
    headers: {}
    // @ts-ignore
  }).then(function(response) {
    // handle the response:
    show_my_friends();
  });
};

talk_button.addEventListener("click", () => {
  recognition.start();
});
