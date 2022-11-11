const errorMap = {
  PLACEHOLDER: 404,
  PLACEHOLDER2: 404,
  PLACEHOLDER3: 422,
  PLACEHOLDER4: 409,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
