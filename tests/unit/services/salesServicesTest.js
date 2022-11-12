const { expect } = require("chai");
const sinon = require("sinon");
const salesModel = require("../../../src/models/salesModel");
const { insertTwoAtOnce, insertFinalObject } = require("../mocks/salesMocks");
const salesServices = require("../../../src/services/salesServices");

//* FUNCTION MESSAGES
const INSERT = "insert";
const INSERT_SALES_PRODUCTS = "insertSalesProducts";

describe("Testes de unidade do Sales service", function () {
  afterEach(sinon.restore);

  it("Retornando a Venda com com o produto cadastrado", async function () {
    sinon.stub(salesModel, INSERT).resolves(1)
    sinon.stub(salesModel, INSERT_SALES_PRODUCTS).resolves([{ insertId: 1 }]);
    const result = await salesServices.createSalesProducts(insertTwoAtOnce);
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(insertFinalObject);
  });
});
