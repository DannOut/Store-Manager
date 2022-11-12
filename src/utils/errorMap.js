const errorMap = {
  NOT_FOUND: 404,
  INVALID_VALUE: 403,
  'string.min': 422,
  'any.required': 400,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
