module.exports = function (router, response, DB, Validator, Schemas) {

  router.delete("/users/:email", function (req, res) {
    response.success("Thanks for using users/:email, there will be something here very soon!", res);
  });

  router.delete("/rules/:id", function (req, res) {
    response.success("Thanks for using rules/:id, there will be something here very soon!", res);
  });

  return router;
}
