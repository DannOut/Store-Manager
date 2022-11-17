const validNameProduct = "Martelo de Thor";

const allValidProducts = [
  {
    id: 1,
    name: "Martelo de Thor",
  },
  {
    id: 2,
    name: "Traje de encolhimento",
  },
  {
    id: 3,
    name: "Escudo do Capitão América",
  },
];

const removedProducts = [
  {
    id: 2,
    name: "Traje de encolhimento",
  },
  {
    id: 3,
    name: "Escudo do Capitão América",
  },
];

const oneValidProduct = {
  id: 1,
  name: "Martelo de Thor",
};

const newValidProduct = {
  name: "Martelo de Thor",
};

const updateValidProduct = {
  name: "naruto",
};

const updatedOneValidProduct = {
  id: 1,
  name: "naruto",
};

const queryToSearch = [
  {
    id: 2,
    name: "Escudo do Batman",
  },
  {
    id: 3,
    name: "Escudo do Capitão América",
  },
];

module.exports = {
  allValidProducts,
  oneValidProduct,
  newValidProduct,
  validNameProduct,
  removedProducts,
  updateValidProduct,
  updatedOneValidProduct,
  queryToSearch,
};
