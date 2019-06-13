module.exports = function (router, response, DB, Validator, Schemas) {
  /*
  router.get("/tokenTest", function (req, res) {
    console.log("inTokenTest");
    // console.log(req.headers);
    var auth = req.get("Authorization");
    // console.log('Authorization:', auth);
    response.success(req.user.pnr, res);
  }); */

  router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, '../', 'api.png'))
  });

  router.get("/users/:email/rules", function (req, res) {
    const validation = Validator.validate(req.params["email"], Schemas.email);
    if (validation.invalid) {
      response.badRequestError(validation.message, res);
      return;
    } else req.params["email"] = validation.value;

    DB.query("SELECT *, (SELECT CASE WHEN COUNT(*) < 0 THEN 0 ELSE COUNT(*) END FROM RuleLogs as l WHERE r.id = l.ruleId) as runCount FROM Rules as r WHERE user = ?;", req.params["email"], function (err, result) {
      if (err) {
        response.databaseError(res);
        console.log(err);
      } else response.success(result, res);
    });
  });

  router.get("/rules/:id", function (req, res) {
    DB.query("SELECT * FROM Rules WHERE id = ?;", req.params["id"], function (err, result) {
      if (err) {
        response.databaseError(res);
        console.log(err);
      } else response.success(result[0], res);
    });
  });

  router.get("/platforms", function (req, res) {
    DB.query("SELECT * FROM Platforms", function (err, result) {
      if (err) {
        console.log(err);
        response.databaseError(res);
      } else response.success(result, res);
    });
  });
};
