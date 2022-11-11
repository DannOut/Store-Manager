const { expect } = require("chai");
const sinon = require("sinon");
const productsModel = require("../../../src/models/productsModel");
const { allValidProducts, oneValidProduct } = require("../mocks/productsMocks");
const connection = require("../../../src/models/connection");

describe("Testes de unidade do products model", function () {
  describe("Recuperando Informações de Produtos", function () {
    afterEach(sinon.restore);
    it("retorna a listagem de todos os produtos", async function () {
      sinon.stub(connection, "execute").resolves([allValidProducts]);
      const result = await productsModel.findAll();
      expect(result).to.be.deep.equal(allValidProducts);
      expect(Array.isArray(result)).to.be.true;
    });

    it("retorna o produto a partir do seu ID", async function () {
      sinon.stub(connection, "execute").resolves([[oneValidProduct]]);
      const result = await productsModel.findById(1);

      expect(result).to.be.deep.equal(oneValidProduct);
    });
  });
});
