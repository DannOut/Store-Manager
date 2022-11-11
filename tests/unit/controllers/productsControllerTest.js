const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");
const { allProducts } = require("../mocks/productsMocks");
const productsController = require("../../../src/controllers/productsController");
const productsServices = require("../../../src/services/productsServices");

const { expect } = chai;
chai.use(sinonChai);

describe("Testes de unidade do products controller", function () {
  afterEach(sinon.restore);

  beforeEach(function () {
    sinon
      .stub(productsServices, "findAll")
      .resolves({ type: null, message: allProducts });
  });
  it("é chamado com o código 200", async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await productsController.findAll(req, res);

    expect(res.status).to.have.been.calledOnceWith(200);
  });

  it("retorna toda a lista de produtos", async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await productsController.findAll(req, res);

    expect(res.json).to.have.been.calledWith(allProducts);
  });
});
