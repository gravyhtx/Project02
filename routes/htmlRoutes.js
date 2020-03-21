const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Load Home page
  app.get("/", (req, res) => {
    res.render("index");
    // res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  //Returns the user if they are not logged in
  app.get("/", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  app.get("/members", isAuthenticated, function(req, res){
    // db.User.findOne({ where: { id: req.params.id } }).then(function(dbUser) {
    res.render("members");
    // res.render("members", {
    //     user: dbUser
    //   });
    // });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
