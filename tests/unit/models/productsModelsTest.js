const { expect } = require("chai");
const sinon = require("sinon");
const productsModel = require("../../../src/models/productsModel");
const { allValidProducts, oneValidProduct, newValidProduct } = require("../mocks/productsMocks");
const connection = require("../../../src/models/connection");

const EXECUTE = 'execute'

describe("Testes de unidade do products model", function () {
  afterEach(sinon.restore);
  describe("Recuperando Informações de Produtos", function () {
    it("Retorna a listagem de todos os produtos", async function () {
      sinon.stub(connection, EXECUTE).resolves([allValidProducts]);
      const result = await productsModel.findAll();
      expect(result).to.be.deep.equal(allValidProducts);
      expect(Array.isArray(result)).to.be.true;
    });

    it("Retorna o produto a partir do seu ID", async function () {
      sinon.stub(connection, EXECUTE).resolves([[oneValidProduct]]);
      const result = await productsModel.findById(1);

      expect(result).to.be.deep.equal(oneValidProduct);
    });
  });
  describe("Inserindo um produto no banco de dados", function () {
    it("Retornando o produto cadastrado", async function () {
      sinon.stub(connection, EXECUTE).resolves([{ insertId: 1 }]);
      const result = await productsModel.insert(newValidProduct);

      expect(result).to.equal(1);
    });
  })
});
