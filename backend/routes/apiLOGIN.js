module.exports = function (router, response, DB, jwt) {

  router.post("/login", function (req, res) {
    response.success("Thanks for using /login, there will be something here very soon!", res);
  });

  router.post("/register", function (req, res) {
    response.success("Thanks for using /register, there will be something here very soon!", res);
  });

}
