module.exports = function (router, response, DB, Validator, Schemas) {

  router.delete("/users/:email", function (req, res) {
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
