const { expect } = require("chai");
const sinon = require("sinon");
const productsModel = require("../../../src/models/productsModel");
const {
  allValidProducts,
  oneValidProduct,
  newValidProduct,
  validNameProduct,
  removedProducts,
  queryToSearch,
} = require("../mocks/productsMocks");
const connection = require("../../../src/models/connection");

const EXECUTE = "execute";

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
  });

  describe("Atualizando um produto no banco de dados", function () {
    it.skip("retorna changeRows atualizado igual a 1", async function () {
      sinon.stub(connection, EXECUTE).resolves([{ changedRows: 1 }]);
      const result = await productsModel.update(1, newValidProduct);

      expect(result).to.be.deep.equal([{ changedRows: 1 }]);
    });

    it("retorna um produto atualizado", async function () {
      sinon.stub(connection, EXECUTE).resolves(oneValidProduct);
      const result = await productsModel.update(1, validNameProduct);

      expect(result).to.be.deep.equal(oneValidProduct);
    });
  });

  describe("Removendo um produto no banco de dados", function () {
    it.skip("retorna um produto atualizado", async function () {
      sinon.stub(connection, EXECUTE).resolves(removedProducts);
      const result = await productsModel.removeProducts(1);

      expect(result).to.be.equal(2);
    });

    it("retorna affectedRows igual a 1", async function () {
      sinon.stub(connection, EXECUTE).resolves([{ affectedRows: 1 }]);
      const result = await productsModel.removeProducts(1);

      expect(result).to.be.deep.equal(1);
    });
  });

    describe("Localizando um produto no banco de dados", function () {
      it("Retornando o produto", async function () {
        sinon.stub(connection, EXECUTE).resolves([queryToSearch]);
        const result = await productsModel.searchByName('Escudo');

        expect(result.length).to.equal(2);
      });
    });
});