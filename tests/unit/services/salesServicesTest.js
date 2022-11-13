const { expect } = require("chai");
const sinon = require("sinon");
const salesModel = require("../../../src/models/salesModel");
const {
  insertTwoAtOnce,
  insertFinalObject,
  validSalesArray,
} = require("../mocks/salesMocks");
const salesServices = require("../../../src/services/salesServices");

//* FUNCTION MESSAGES
const INSERT = "insert";
const INSERT_SALES_PRODUCTS = "insertSalesProducts";
const FIND_BY_ID = "findById";
const FIND_ALL = "findAll";

// * ERROR MESSAGES
const PRODUCT_NOT_FOUND = "Product not found";
const SALE_NOT_FOUND = "Sale not found";
const NOT_FOUND = "NOT_FOUND";
const INVALID_VALUE = "INVALID_VALUE";

describe("Testes de unidade do Sales service", function () {
  afterEach(sinon.restore);
  describe("Realizando Cadastro de vendas", function () {
    it("Retornando a Venda com com o produto cadastrado", async function () {
      sinon.stub(salesModel, INSERT).resolves(1);
      sinon.stub(salesModel, INSERT_SALES_PRODUCTS).resolves([{ insertId: 1 }]);
      const result = await salesServices.createSalesProducts(insertTwoAtOnce);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(insertFinalObject);
    });
  });

  describe("Recuperando Informações de sales", function () {
    it("Retorna a listagem de todas as sales", async function () {
      sinon.stub(salesModel, FIND_ALL).resolves(validSalesArray);
      const result = await salesServices.findAll();
      expect(result.message).to.deep.equal(validSalesArray);
    });

    it("Retorna a sale que tem o ID selecionado", async function () {
      sinon.stub(salesModel, FIND_BY_ID).resolves(validSalesArray);
      const result = await salesServices.findById(1);
      expect(result.message).to.deep.equal(validSalesArray);
    });

    it("retorna um erro caso não exista a sale do id selecionado", async function () {
      sinon.stub(salesModel, FIND_BY_ID).resolves(undefined);
      const result = await salesServices.findById(1);
      expect(result.type).to.deep.equal(NOT_FOUND);
      expect(result.message).to.deep.equal(SALE_NOT_FOUND);
    });

    it("retorna um erro caso id esteja incorreto", async function () {
      sinon.stub(salesModel, FIND_BY_ID).resolves([validSalesArray]);
      const result = await salesServices.findById("abc");
      expect(result.type).to.deep.equal(INVALID_VALUE);
      expect(result.message).to.deep.equal('"id" must be a number');
    });
  });
});
