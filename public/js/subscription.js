/* eslint-disable prettier/prettier */
$(document).ready(function() {
  const subscriptionForm = $("form#signup-subscription");

  subscriptionForm.on("submit", (event) => {
    event.preventDefault();
    subscriptionInfo = {
// insert form inputs here, including userId
    };
    if (!subscriptionInfo) {
    return;
    }
    console.log(subscriptionInfo);

  });
      
  function subscriptionSignUp()
});