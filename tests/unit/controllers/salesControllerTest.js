const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");
const salesController = require("../../../src/controllers/salesController");
const salesServices = require("../../../src/services/salesServices");

const { insertTwoAtOnce, insertFinalObject } = require("../mocks/salesMocks");

const { expect } = chai;
chai.use(sinonChai);

const CREATE_SALES_PRODUCTS = "createSalesProducts";

describe("Testes de unidade do products controller", function () {
  it("Retornando a Venda com com o produto cadastrado", async function () {
    sinon
      .stub(salesServices, CREATE_SALES_PRODUCTS)
      .resolves({ type: null, message: insertFinalObject });
    
    const res = {};
    const req = { body: { name: insertTwoAtOnce } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.createSalesProducts(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(insertFinalObject);
  });
});
