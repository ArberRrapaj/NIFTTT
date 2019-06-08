module.exports = function (router, response, DB, Validator, Schemas) {

  router.post("/rules", function (req, res) {
    response.success("Thanks for using /rules, there will be something here very soon!", res);
  });

  return router;
}
