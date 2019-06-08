module.exports = function (router, response, DB, Validator, Schemas) {

  router.get("/tokenTest", function (req, res) {
    console.log("inTokenTest");
    // console.log(req.headers);
    var auth = req.get("Authorization");
    // console.log('Authorization:', auth);
    response.success(req.user.pnr, res);
  });

  router.get("/rules/:id", function (req, res) {
    response.success("Thanks for using rules/:id, there will be something here very soon!", res);
  });

  router.get("/users/:email", function (req, res) {
    response.success("Thanks for using users/:email, there will be something here very soon!", res);
  });

}
