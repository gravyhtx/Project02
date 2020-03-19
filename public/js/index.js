// // Get references to page elements
// const $exampleText = $("#example-text");
// const $exampleDescription = $("#example-description");
// const $submitBtn = $("#submit");
// const $exampleList = $("#example-list");

// // The API object contains methods for each kind of request we'll make
// const API = {
//   saveExample: function(example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function() {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function(id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);

//Ready function which nests the login and signup functions.
$(document).ready(function () {

  //Consistent point of reference for id and classes within the handlebars files.
  const loginForm = $("form#login");
  const signUpForm = $("form#signUp");
  const emailInput = $("form#email");
  const passInput = $("form#password");

  //Validate that an email and password have been entered
  loginForm.on("submit", (event) => {
    event.preventDefault();
    const userInfo = {
      email: emailInput.val().trim(),
      password: passInput.val().trim()
    };

    if (!userInfo.email || !userInfo.password) {
      return;
    }

    // Clears form if a valid email and password exists, and ryn loginUser.
    userLogin(userInfo.email, userInfo.password);
    emailInput.val("");
    passInput.val("");
  });

  //Post to api login which redirects user to home page if they are successfully able to login
  function userLogin(email, password) {
    $.post("/", {
        email: email,
        password: password
      })
      .then(function () {
        window.location.replace("/");
        // Logs error, if an error 
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  signUpForm.on("submit", (event) => {
    event.preventDefault();
    const userInfo = {
      email: emailInput.val().trim(),
      password: passInput.val().trim()
    };
    if (!userInfo.email || !userInfo.password) {
      return;
    }

    userSignUp(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  })

  function userSignUp(email, password) {
    $.post("/", {
        email: email,
        password: password
      })
      .then(function (data) {
        window.location.replace("/");
      })
      .catch(handleLoginErr)
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
})