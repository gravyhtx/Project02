//Ready function which nests the login and signup functions.
$(document).ready(function() {
  //Consistent point of reference for id and classes within the handlebars files.
  const loginForm = $("form.login-form");
  const loginUsername = $("input#login-username");
  const loginPassword = $("input#login-password")

  const signUpForm = $("form.signup");
  const emailInput = $("input#email");
  const userInput = $("input#user_name");
  const passInput = $("input#password");
  const firstInput = $("input#first_name");
  const lastInput = $("input#last_name");
  const streetInput = $("input#street1");
  const unitInput = $("input#unit");
  const cityInput = $("input#city");
  const zipInput = $("input#zipcode");
  const stateInput = $("input#state");
  const countryInput = $("input#country");

  //Validate that an email and password have been entered
  // eslint-disable-next-line prettier/prettier
  loginForm.on("submit", (event) => {
    event.preventDefault();
    const userInfo = {
      username: loginUsername.val().trim(),
      password: loginPassword.val().trim()
    };

    if (!userInfo.username || !userInfo.password) {
      return;
    }

    // Clears form if a valid username and password exists, and runs userLogin.
    userLogin(userInfo.username, userInfo.password);
    loginUsername.val("");
    loginPassword.val("");
  });

  //Post to api login which redirects user to home page if they are successfully able to login
  function userLogin(username, password) {
    $.post("/api/login", {
      username: username,
      password: password
    })
      .then(function() {
        window.location.replace("/members");
        // Logs error, if an error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  //Section begins the user signup Portion of the JS-----------------------------------------------------------------------------------
  // eslint-disable-next-line prettier/prettier
  signUpForm.on("submit", (event) => {
    event.preventDefault();
    const userInfo = {
      email: emailInput.val().trim(),
      username: userInput.val().trim(),
      password: passInput.val().trim(),
      first_name: firstInput.val().trim(),
      last_name: lastInput.val().trim(),
      street: streetInput.val().trim(),
      unit: unitInput.val().trim(),
      city: cityInput.val().trim(),
      zip: zipInput.val().trim(),
      country: countryInput.val(),
      state: stateInput.val()
    };
    if (!userInfo.email || !userInfo.password) {
      return;
    }

    userSignUp(
      userInfo.email,
      userInfo.password,
      userInfo.username,
      userInfo.first_name,
      userInfo.last_name,
      userInfo.street,
      userInfo.unit,
      userInfo.city,
      userInfo.zip,
      userInfo.country,
      userInfo.state
    );
    emailInput.val("");
    passInput.val("");
    userInput.val("");
    firstInput.val("");
    lastInput.val("");
    streetInput.val("");
    unitInput.val("");
    cityInput.val("");
    zipInput.val("");
    countryInput.val("");
    stateInput.val("");
    console.log(userInput);
  });

  function userSignUp(
    email,
    password,
    username,
    firstname,
    lastname,
    streetAddress,
    unit,
    city,
    zip,
    country,
    state
  ) {
    $.post("/api/signup", {
      email: email,
      password: password,
      username: username,
      first_name: firstname,
      last_name: lastname,
      street: streetAddress,
      unit: unit,
      city: city,
      zip: zip,
      country: country,
      state: state
    })
      .then(function(data) {
        localStorage.setItem("User", data.id);
        window.location.replace("/");
      })
      .catch(function(err) {
        console.log("ERROR IS " + { err });
      });
  }
});
