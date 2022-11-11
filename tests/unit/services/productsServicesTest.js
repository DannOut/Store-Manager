const { expect } = require("chai");
const sinon = require("sinon");
const productsModel = require("../../../src/models/productsModel");
const { allProducts } = require("../mocks/productsMocks");
const productsServices = require('../../../src/services/productsServices');

describe("Testes de unidade do products service", function () {
  it("retorna a listagem de todos os produtos", async function () {
    sinon.stub(productsModel, "findAll").resolves(allProducts);
    const result = await productsServices.findAll();
    expect(result.message).to.deep.equal(allProducts);
  });
});
