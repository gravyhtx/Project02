var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Route which allow user to view all coffee within the database
  // app.get("/api/coffee", function(req, res) {
  //   db.Coffee.findAll({}).then(function(dbcoffee) {
  //     res.json(dbcoffee);
  //   });
  // });

  // // Search for Specific roast of all of the roasts within the database
  // app.get("/api/:coffee?", function(req, res) {
  //   if (req.params.id) {
  //     // Display the JSON for that specific roast
  //     db.Coffee.findOne({
  //       where: {
  //         id: req.params.id
  //       }
  //     }).then(function(result) {
  //       return res.json(result);
  //     });
  //   } else {
  //     //Display all roasts within the database
  //     db.Coffee.findAll().then(function(result) {
  //       return res.json(result);
  //     });
  //   }
  // });

  //Route that logs the user out of the database
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", function(req, res) {

    if (!req.user) {
      res.json({});
    }
    else {
      res.json(req.user);
    }
  });

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  //Route which allows user to sign into website
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      street_address: req.body.street,
      unit: req.body.unit,
      city: req.body.city,
      zip_code: req.body.zip,
      country_id: req.body.country,
      state: req.body.state
    })
      .then(function(data) {
        // res.json(data);
        res.redirect(307, "/api/login");
        // console.log(res.json(data.user));
      })
      .catch(function(err) {
        console.log(err);
        res.status(401).json(err);
      });
  });

  // app.get("/api/user_data", function(req, res){
  //   if (!req.user){res.json({});}
  //   else {
  //     res.json({
  //       username:
  //     });
  //   }
  // });

  // app.post("/api/coffee", function(req, res)  {
  //   db.Coffee.create(req.body).then(function(dbcoffee) {
  //     res.json(dbcoffee);
  //   });
  // });

  // Route which removes coffee from the database
  // app.delete("/api/coffee/:id", (req, res) => {
  //   db.Coffee.destroy({ where: { id: req.params.id } }).then((dbcoffee) =>{
  //     res.json(dbcoffee);
  //   });
  // });
};
