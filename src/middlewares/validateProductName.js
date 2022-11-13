const { nameProductSchema } = require('./schemas');
const errorMap = require('../utils/errorMap');

module.exports = (req, res, next) => {
  const { name } = req.body;
  
  const { error } = nameProductSchema.validate({ name });
  // console.log('ERROR MIDDLEWARE JOI', error);

  // console.log('ERROR MIDDLEWARE TYPE JOI', type);

  // console.log('ERROR MIDDLEWARE MESSAGE JOI', message);
  
  if (error) {
    const { type, message } = error.details[0];
    return res.status(errorMap.mapError(type)).json({ message });
  }

  next();
};