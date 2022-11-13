const { salesProductSchema } = require('./schemas');
const errorMap = require('../utils/errorMap');

module.exports = (req, res, next) => {
  const arrayBody = req.body;
  
  const result = arrayBody.map((value) => salesProductSchema
    .validate(value))
    .find((value) => value.error);
  if (result) {
    const { type, message } = result.error.details[0];
    return res.status(errorMap.mapError(type)).json({ message });
  }

  next();
};