const JOI = require('joi');

module.exports = {
    user: JOI.object().keys({
      "id": JOI.number().integer().required(),
      "firstName": JOI.string().max(100).required(),
      "lastName": JOI.string().max(100).required(),
      "email": JOI.string().max(350).required().allow('', null),
      "password": JOI.string().max(100).required()
    }),
    rule: JOI.object().keys({
      'id': JOI.number().integer(),
      'name': JOI.string().max(50).required(),
      'triggerPlatform': JOI.number().integer().required(),
      'actionPlatform': JOI.number().integer().required(),
      'triggerPayload': JOI.object().required(),
      'actionPayload': JOI.object().required(),
      'active': JOI.number().integer().min(0).max(1).required(),
      'user': JOI.number().integer().required()
    })
}
