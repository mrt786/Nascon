const Joi = require('joi');

module.exports = (user) => {
  const schema = Joi.object({
    fname: Joi.string().min(2).max(50).required(),
    lname: Joi.string().min(2).max(50).required(),
    contact_no: Joi.string().min(10).max(15).required(),
    role: Joi.string().valid('participant', 'sponsor', 'judge').required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(user);
};
