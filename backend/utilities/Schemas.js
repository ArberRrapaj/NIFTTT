const JOI = require('joi');

module.exports = {
    user: JOI.object().keys({
      "email": JOI.string().email().lowercase().required(),
      "registerFirstname": JOI.string().max(100).required(),
      "registerPassword": JOI.string().max(100).required(),
      "registerIcecream": JOI.string().max(50).required()
    }),
    login: JOI.object().keys({
      "email": JOI.string().email().lowercase().required(),
      "loginPassword": JOI.string().required()
    }),
    email: JOI.string().email().lowercase().required(),
    rule: JOI.object().keys({
      'id': JOI.number().integer().optional().allow('', null),
      'name': JOI.string().max(50).required(),
      'triggerPlatform': JOI.number().integer().optional(),
      'actionPlatform': JOI.number().integer().optional(),
      'triggerPayload': JOI.string().optional(),
      'actionPayload': JOI.string().optional(),
      'active': JOI.number().integer().min(0).max(1).required(),
      'user': JOI.string().email().lowercase().required()
    })
}
