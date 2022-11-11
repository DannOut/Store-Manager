const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");
const { allProducts } = require("../mocks/productsMocks");
const productsController = require("../../../src/controllers/productsController");
const productsServices = require("../../../src/services/productsServices");

const { expect } = chai;
chai.use(sinonChai);

describe("Testes de unidade do products controller", function () {
  describe("Recuperando Informações de Produtos", function () {
    afterEach(sinon.restore);

    beforeEach(function () {
      sinon
        .stub(productsServices, "findAll")
        .resolves({ type: null, message: allProducts });
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

      expect(res.json).to.have.been.calledWith(allProducts);
    });

    it("Produto é chamado e retorna código de erro 404", async function () {
      const res = {};
      const req = {};
      
    });

    it("Produto é chamado e retorna código 200"), async function () {
      const res = {};
      const req = {};

    };

    it("Retorna o produto esperado ao passar o id 1", async function () {
      const res = {};
      const req = {};

    });
  });
});
