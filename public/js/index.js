//Ready function which nests the login and signup functions.
$(document).ready(function() {
  //Consistent point of reference for id and classes within the handlebars files.
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

  //Post to api login which redirects user to home page if they are successfully able to login
  function userLogin(username, password) {
    $.post("/api/login", {
      username: username,
      password: password
    })
      .then(function(user) {
        localStorage.setItem("User", user.id);
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
      .then(function(user) {
        localStorage.setItem("User", user.id);
        window.location.replace("/members");
      })
      .catch(function(err) {
        console.log("ERROR IS " + { err });
      });
  }
  
  $.get("/api/user_data").then(function(user) {
    console.log(user);
    $(".member-username").text(user.username);
    $(".member-firstName").text(user.first_name);
    $(".member-lastName").text(user.last_name);
    $(".member-email").text(user.email);
    $(".member-subscription").text(user.subscription);
    
    const modalUsername = user.username;
    const modalFirstName = user.first_name;
    const modalLastName = user.last_name;
    const modalEmail = user.email;
    const modalSubscription = user.subscription;
    
    if (!user.username) {
      $("div.customer-login").html('<h3><b>Login</b></h3>     <div class="col s12 formclass container row loginsignup z-depth-3"><form class="row col s12 login-form"><div class="row input-field col s12">  <label for="login-username">Username</label>  <input id="login-username" type="text" class="validate">    </div><br><div class="row input-field col s12">  <label for="login-password">Password</label>  <input id="login-password" type="password" class="validate">    </div><br><button class="submit waves-effect waves-light btn" id="login-account">    LOG IN</button></form></div><br><div class="notamember">    <b>Not a member yet?</b></div><div class="row submitrow">    <a href="/signup" class="submit hit-subscribe waves-effect waves-light btn" id="signup-button"><b>CREATE ACCOUNT</b>    </a></div>');
      const loginForm = $("form.login-form");
      const loginUsername = $("input#login-username");
      const loginPassword = $("input#login-password");
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
        console.log(userInfo);
        // Clears form if a valid username and password exists, and runs userLogin.
        userLogin(userInfo.username, userInfo.password);
        loginUsername.val("");
        loginPassword.val("");
      });
    }
    else if (user.username) {
      $("div.customer-login").html('<div class="whitebkg">    <h3 class="h3profile"><b>Account Info</b></h3>     <div class="profile-details"><b>Logged in as <span class="modal-username"></span></b>    <br>    <div class="accountinfo container row loginsignup">    <div class="profile-details">    <b>First Name </b><div class="btmsp"><span class="modal-fname"></span></div>    <b>Last Name</b><div class="btmsp"><span class="modal-lname"></span></div>    <b>Email</b><div class="btmsp"><span class="modal-email"></span></div>    <br>    <b>Subscription</b><br><span class="modal-subscription"></span>    </div></div>    <div class="center"><a href="/logout" class="submit hit-subscribe waves-effect waves-light btn" id="log-off"><b>LOG OFF</b></a></div>   <br></div></div></div> </div>');
      $("span.modal-username").html(modalUsername);
      $("span.modal-fname").html(modalFirstName);
      $("span.modal-lname").html(modalLastName);
      $("span.modal-email").html(modalEmail);
      $("span.modal-subscription").html(modalSubscription);
    }
  });
 
});
