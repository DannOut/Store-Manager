const { expect } = require("chai");
const sinon = require("sinon");
const productsModel = require("../../../src/models/productsModel");
const { allValidProducts, oneValidProduct } = require("../mocks/productsMocks");
const productsServices = require("../../../src/services/productsServices");

describe("Testes de unidade do products service", function () {
  describe("Recuperando Informações de Produtos", function () {
    afterEach(sinon.restore);

    it("Retorna a listagem de todos os produtos", async function () {
      sinon.stub(productsModel, "findAll").resolves(allValidProducts);
      const result = await productsServices.findAll();
      expect(result.message).to.deep.equal(allValidProducts);
    });

    it("Retorna o Produto que tem o ID selecionado", async function () {
      sinon.stub(productsModel, "findById").resolves(oneValidProduct);
      const result = await productsServices.findById(1);
      expect(result.message).to.deep.equal(oneValidProduct);
    });

    it("retorna um erro caso não exista o produto do id selecionado", async function () {
      sinon.stub(productsModel, "findById").resolves(undefined);
      const result = await productsServices.findById(1);
      expect(result.type).to.deep.equal("NOT_FOUND");
      expect(result.message).to.deep.equal("Product not found");
    });

    it("retorna um erro caso id esteja incorreto", async function () {
      sinon.stub(productsModel, "findById").resolves([[oneValidProduct]]);
      const result = await productsServices.findById('abc');
      expect(result.type).to.deep.equal("INVALID_VALUE");
      expect(result.message).to.deep.equal('"id" must be a number');
    });
  });
});
