module.exports = function (router, response, DB, Validator, Schemas) {

  router.delete("/users/:email", function (req, res) {
    const validation = Validator.validate(req.params["email"], Schemas.email);
    if (validation.invalid) {
      response.badRequestError(validation.message, res);
      return;
    } else req.params["email"] = validation.value;

    DB.query("DELETE FROM Users WHERE email = ?", req.params["email"], function (err, result) {
      if (err) response.databaseError(res);
      else response.success('User deleted successfully', res);
    });
  });

  router.delete("/rules/:id", function (req, res) {
    DB.query("DELETE FROM Rules WHERE id = ?", req.params["id"], function (err, result) {
      if (err) response.databaseError(res);
      else response.success('Rule deleted successfully', res);
    });
  });

  return router;
}
