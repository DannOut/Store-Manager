const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");
const {
  allValidProducts,
  oneValidProduct,
  validNameProduct,
  newValidProduct,
  removedProducts,
  queryToSearch,
} = require("../mocks/productsMocks");
const productsController = require("../../../src/controllers/productsController");
const productsServices = require("../../../src/services/productsServices");

const { expect } = chai;
chai.use(sinonChai);

//* FUNCTION MESSAGES
const FIND_BY_ID = "findById";
const FIND_ALL = "findAll";
const CREATE_PRODUCTS = "createProduct";
const UPDATE = "update";
const REMOVE_PRODUCTS = "removeProducts";
const SEARCH_BY_NAME = "searchByName";

// * ERROR MESSAGES
const PRODUCT_NOT_FOUND = "Product not found";
const NOT_FOUND = "NOT_FOUND";

describe("Testes de unidade do products controller", function () {
  afterEach(sinon.restore);
  describe("Recuperando Informações de todos os Produtos", function () {
    beforeEach(function () {
      sinon
        .stub(productsServices, FIND_ALL)
        .resolves({ type: null, message: allValidProducts });
    });

    it("Lista de Produtos é chamado com o código 200", async function () {
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

      expect(res.json).to.have.been.calledWith(allValidProducts);
    });
  });

  describe("Recuperando informações do produto selecionado", () => {
    beforeEach(function () {
      sinon
        .stub(productsServices, FIND_BY_ID)
        .resolves({ type: null, message: oneValidProduct });
    });

    it("Produto é chamado e retorna código 200", async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await productsController.findById(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });

    it("Retorna o produto esperado ao passar o id 1", async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await productsController.findById(req, res);

      expect(res.json).to.have.been.calledWith(oneValidProduct);
    });
  });

  describe("Erro ao recuperar informações do produto selecionado", async function () {
    it("Produto é chamado e retorna código de erro 404", async function () {
      sinon
        .stub(productsServices, FIND_BY_ID)
        .resolves({ type: NOT_FOUND, message: PRODUCT_NOT_FOUND });

      const res = {};
      const req = { params: { id: 999 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await productsController.findById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: PRODUCT_NOT_FOUND,
      });
    });
  });
  describe("Inserindo um produto no banco de dados", function () {
    it("Retornando o produto cadastrado", async function () {
      sinon
        .stub(productsServices, CREATE_PRODUCTS)
        .resolves({ type: null, message: oneValidProduct });

      const res = {};
      const req = { body: { name: validNameProduct } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(oneValidProduct);
    });
  });

  describe("Atualizando um produto no banco de dados", function () {
    it("retorna um produto atualizado", async function () {
      sinon
        .stub(productsServices, UPDATE)
        .resolves({ type: null, message: oneValidProduct });

      const res = {};
      const req = { body: newValidProduct, params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.update(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(oneValidProduct);
    });

    it("retorna erro caso não encontre o id", async function () {
      sinon
        .stub(productsServices, UPDATE)
        .resolves({ type: NOT_FOUND, message: PRODUCT_NOT_FOUND });

      const res = {};
      const req = { body: newValidProduct, params: { id: 999 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.update(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: PRODUCT_NOT_FOUND });
    });

    it("retorna erro caso não seja passado name", async function () {
      sinon
        .stub(productsServices, UPDATE)
        .resolves({ type: NOT_FOUND, message: PRODUCT_NOT_FOUND });

      const res = {};
      const req = { body: {}, params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.update(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: PRODUCT_NOT_FOUND });
    });
  });

  describe("Removendo um produto no banco de dados", function () {
    it("removendo o produto cadastrado", async function () {
      sinon.stub(productsServices, REMOVE_PRODUCTS).resolves({ type: null });

      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();

      await productsController.removeProducts(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });

    it("Erro ao não localizar o ID cadastrado para remover", async function () {
      sinon
        .stub(productsServices, REMOVE_PRODUCTS)
        .resolves({ type: 404, message: PRODUCT_NOT_FOUND });

      const res = {};
      const req = { params: { id: 999 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await productsController.findById(req, res);
      await productsController.removeProducts(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: PRODUCT_NOT_FOUND });
    });
  });

  describe("Localizando um produto no banco de dados", function () {
    it("Retornando o produto", async function () {
      sinon
        .stub(productsServices, SEARCH_BY_NAME)
        .resolves({ type: null, message: queryToSearch });

      const res = {};
      const req = { query: { q: 'Escudo' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.searchByName(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(queryToSearch);
    });

    it("Retornando todos os produtos caso nao encontre a query", async function () {
      sinon
        .stub(productsServices, SEARCH_BY_NAME)
        .resolves({ type: null, message: queryToSearch });

      const res = {};
      const req = { query: { q: "" } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.searchByName(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(queryToSearch);
    });
  });
});
