const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");

const validateNameProduct = require("../../../src/middlewares/validateProductName");

const { expect } = chai;
chai.use(sinonChai);

describe("Recuperando Informações de todos os Produtos", function () {
  afterEach(sinon.restore);
  it("Retornando Erro ao não passar name no body", async function () {
    const res = {};
    const req = { body: {} };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    validateNameProduct(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });

  it("Retornando Erro passar name com tamanho inválido", async function () {
    const res = {};
    const req = { body: { name: "Dan" } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    validateNameProduct(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({
      message: '"name" length must be at least 5 characters long',
    });
  });
});
