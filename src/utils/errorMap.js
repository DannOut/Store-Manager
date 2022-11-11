const errorMap = {
  NOT_FOUND: 404,
  INVALID_VALUE: 403,
  PLACEHOLDER4: 409,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
