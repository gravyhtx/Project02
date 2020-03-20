//Ready function which nests the login and signup functions.
$(document).ready(function() {
  //Consistent point of reference for id and classes within the handlebars files.
  const loginForm = $("#login");
  const signUpForm = $("form.signup");
  const emailInput = $("input#email");
  const passInput = $("input#password");
  // const firstInput = $("#first_name");
  // const lastInput = $("#last_name");
  // const userInput = $("#user_name");

  //Validate that an email and password have been entered
  // eslint-disable-next-line prettier/prettier
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
      .then(function() {
        window.location.replace("/");
        // Logs error, if an error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  //Section begins the signup Portion of the JS-----------------------------------------------------------------------------------
  // eslint-disable-next-line prettier/prettier
  signUpForm.on("submit", (event) => {
    event.preventDefault();
    const userInfo = {
      // firstName:firstInput.val().trim(),
      // lastName:lastInput.val().trim(),
      // username: userInput.val().trim(),
      email: emailInput.val().trim(),
      password: passInput.val().trim()
    };
    if (!userInfo.email || !userInfo.password) {
      return;
    }
    console.log(userInfo);

    userSignUp(userInfo.email, userInfo.password);
    emailInput.val("");
    passInput.val("");
  });

  function userSignUp(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    })
      .then(function(data) {
        console.log(data);
        window.location.replace("/");
      })
      .catch(function(err){
        console.log("ERROR IS " + err);
      });
  }
});
