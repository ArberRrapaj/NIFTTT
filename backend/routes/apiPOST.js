module.exports = function (router, response, DB, Validator, Schemas) {

  router.post("/rules", function (req, res) {
    const body = req.body;
    var rule = {
      name: body['name'],
      triggerPlatform: body['triggerPlatform'],
      actionPlatform: body['actionPlatform'],
      triggerPayload: body['triggerPayload'],
      actionPayload: body['actionPayload'],
      active: body['active'],
      user: body['user']
    }
    console.log('rule assembled', rule);
    DB.query("SELECT email FROM Users WHERE email = ?;", body['user'], function (err, result) {
      if (err) response.databaseError(res);
      else {
        console.log(result);
        if (result.length != 0) {
          console.log(result);
          DB.query("INSERT INTO Rules SET ?;", rule, function (err, result) {
            if (err) response.databaseError(res);
            else response.success('Successfully added rule', res);
          });
        } else response.badRequestError('There is no user with that email', res);
      }
    });
  });

  return router;
}
