const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");
const validateSalesProducts = require('../../../src/middlewares/validateSalesProducts');
const {
  invalidProductId,
  noProductIdBody,
} = require("../mocks/middlewaresMocks");

const { expect } = chai;
chai.use(sinonChai);

describe("Recuperando Informações de todas as sales", function () {
  afterEach(sinon.restore);
  it("Retornando Erro ao não passar ProductId no body", async function () {
    const res = {};
    const req = { body: noProductIdBody };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    validateSalesProducts(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"productId" is required',
    });
  });

  //! SKIPADO
  it("Retornando Erro ao passar ProductId inválido", async function () {
    const res = {};
    const req = { body: invalidProductId };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    validateSalesProducts(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({
      message: '"productId" must be greater than or equal to 1',
    });
  });
});
