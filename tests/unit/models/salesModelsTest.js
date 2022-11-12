const { expect } = require("chai");
const sinon = require("sinon");
const salesModel = require("../../../src/models/salesModel");
const connection = require("../../../src/models/connection");
const { newSaleProduct, newValidSale } = require("../mocks/salesMocks");

const EXECUTE = "execute";

describe("Testes de unidade do Sales model", function () {
  afterEach(sinon.restore);
  describe("Adicionando uma venda em Sales", function () {

    it("Adiciona uma venda em sales e retorna o id 1", async function () {
      sinon.stub(connection, EXECUTE).resolves([{ insertId: 1 }]);
      const result = await salesModel.insert();
      expect(result).to.equal(1);
    });

    it("Adiciona uma venda de ID 1 em um produto de ID 1, com quantidade igual a 3", async function () {
      sinon.stub(connection, EXECUTE).resolves([{ insertId: 1 }]);

      const result = await salesModel.insertSalesProducts(newSaleProduct);

      expect(result).to.equal(1);
    });
  });
});
