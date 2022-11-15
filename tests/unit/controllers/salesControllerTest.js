const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");
const salesController = require("../../../src/controllers/salesController");
const salesServices = require("../../../src/services/salesServices");

const {
  insertTwoAtOnce,
  insertFinalObject,
  validSalesArray,
} = require("../mocks/salesMocks");

const { expect } = chai;
chai.use(sinonChai);

//* FUNCTION MESSAGES
const CREATE_SALES_PRODUCTS = "createSalesProducts";
const FIND_BY_ID = "findById";
const FIND_ALL = "findAll";
const REMOVE_SALES = 'removeSales'

// * ERROR MESSAGES
const NOT_FOUND = "NOT_FOUND";
const SALE_NOT_FOUND = "Sale not found";
const INVALID_VALUE = "INVALID_VALUE";

describe("Testes de unidade do products controller", function () {
  afterEach(sinon.restore);
  describe("Testando Sales e Sales_Products", function () {
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

  describe("Recuperando Informações de todas as Sales", function () {
    beforeEach(function () {
      sinon
        .stub(salesServices, FIND_ALL)
        .resolves({ type: null, message: validSalesArray });
    });

    it("Lista de Produtos é chamado com o código 200", async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await salesController.findAll(req, res);

      expect(res.status).to.have.been.calledOnceWith(200);
    });

    it("retorna toda a lista de produtos", async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await salesController.findAll(req, res);

      expect(res.json).to.have.been.calledWith(validSalesArray);
    });
  });

  describe("Recuperando informações do produto selecionado", () => {
    beforeEach(function () {
      sinon
        .stub(salesServices, FIND_BY_ID)
        .resolves({ type: null, message: validSalesArray });
    });

    it("Produto é chamado e retorna código 200", async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await salesController.findById(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });

    it("Retorna o produto esperado ao passar o id 1", async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await salesController.findById(req, res);

      expect(res.json).to.have.been.calledWith(validSalesArray);
    });
  });

  describe("Removendo uma sale no banco de dados", function () {
    it("removendo uma sale cadastrada", async function () {
      sinon.stub(salesServices, REMOVE_SALES).resolves({ type: null });

      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();

      await salesController.removeSales(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });

    it("Erro ao não localizar o ID cadastrado para remover", async function () {
      sinon
        .stub(salesServices, REMOVE_SALES)
        .resolves({ type: 404, message: SALE_NOT_FOUND });

      const res = {};
      const req = { params: { id: 999 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await salesController.findById(req, res);
      await salesController.removeSales(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: SALE_NOT_FOUND,
      });
    });
  });
});
