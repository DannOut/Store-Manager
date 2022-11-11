const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");
const { allValidProducts, oneValidProduct } = require("../mocks/productsMocks");
const productsController = require("../../../src/controllers/productsController");
const productsServices = require("../../../src/services/productsServices");

const { expect } = chai;
chai.use(sinonChai);

describe("Testes de unidade do products controller", function () {
  describe("Recuperando Informações de todos os Produtos", function () {
    afterEach(sinon.restore);

    beforeEach(function () {
      sinon
        .stub(productsServices, "findAll")
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
    afterEach(sinon.restore);

    beforeEach(function () {
      sinon
        .stub(productsServices, "findById")
        .resolves({ type: null, message: oneValidProduct });
    });

    it("Produto é chamado e retorna código 200",
      async function () {
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
    afterEach(sinon.restore);
    it("Produto é chamado e retorna código de erro 404", async function () {
      sinon
        .stub(productsServices, "findById")
        .resolves({ type: "NOT_FOUND", message: "Product not found" });

      const res = {};
      const req = {params: {}};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await productsController.findById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.message).to.have.been.calledWith("Product not found");
    });
  });
});
