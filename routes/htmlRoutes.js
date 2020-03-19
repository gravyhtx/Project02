var db = require("../models");


const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Load Home page
  app.get("/", (req, res) => {
    res.render("index", {test: "Robin"});
    // res.sendFile(path.join(__dirname, "../public/index"));
  });


  // app.get("/", function(req, res) {
  //   // Directs users who already have an account to the main page.
  //   if (req.user) {
  //     res.redirect("/name");
  //   }
  //   res.sendFile(path.join(__dirname, "../public/name.html"));
  // });

  // // Load name page and pass in an name by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // app.get("/", isAuthenticated, function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/index.html"));
  // });


  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
