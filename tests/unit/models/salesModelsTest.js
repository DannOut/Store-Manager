const { expect } = require("chai");
const sinon = require("sinon");
const salesModel = require("../../../src/models/salesModel");
const connection = require("../../../src/models/connection");
const { newSaleProduct, validSalesArray } = require("../mocks/salesMocks");

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

  describe("Recuperando Informações de vendas", function () {
    this.beforeEach(() => {
      sinon.stub(connection, EXECUTE).resolves([validSalesArray]);
    })

    it("Retorna a listagem de todas as vendas", async function () {
      const result = await salesModel.findAll();
      expect(result).to.be.deep.equal(validSalesArray);
      expect(Array.isArray(result)).to.be.true;
    });

    it("Retorna a venda a partir do seu ID", async function () {
      const result = await salesModel.findById(1);
      expect(result).to.be.deep.equal(validSalesArray);
    });
  });
});