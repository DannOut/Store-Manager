const { expect } = require("chai");
const sinon = require("sinon");
const productsModel = require("../../../src/models/productsModel");
const {
  allValidProducts,
  oneValidProduct,
  validNameProduct,
  newValidProduct,
  removedProducts,
  updateValidProduct,
  updatedOneValidProduct,
} = require("../mocks/productsMocks");
const productsServices = require("../../../src/services/productsServices");

//* FUNCTION MESSAGES
const FIND_BY_ID = "findById";
const FIND_ALL = "findAll";
const INSERT = "insert";
const UPDATE = "update";
const REMOVE_PRODUCTS = "removeProducts";

// * ERROR MESSAGES
const PRODUCT_NOT_FOUND = "Product not found";
const NOT_FOUND = "NOT_FOUND";
const INVALID_VALUE = "INVALID_VALUE";

describe("Testes de unidade do products service", function () {
  afterEach(sinon.restore);
  describe("Recuperando Informações de Produtos", function () {
    it("Retorna a listagem de todos os produtos", async function () {
      sinon.stub(productsModel, FIND_ALL).resolves(allValidProducts);
      const result = await productsServices.findAll();
      expect(result.message).to.deep.equal(allValidProducts);
    });

    it("Retorna o Produto que tem o ID selecionado", async function () {
      sinon.stub(productsModel, FIND_BY_ID).resolves(oneValidProduct);
      const result = await productsServices.findById(1);
      expect(result.message).to.deep.equal(oneValidProduct);
    });

    it("retorna um erro caso não exista o produto do id selecionado", async function () {
      sinon.stub(productsModel, FIND_BY_ID).resolves(undefined);
      const result = await productsServices.findById(1);
      expect(result.type).to.deep.equal(NOT_FOUND);
      expect(result.message).to.deep.equal(PRODUCT_NOT_FOUND);
    });

    it("retorna um erro caso id esteja incorreto", async function () {
      sinon.stub(productsModel, FIND_BY_ID).resolves([[oneValidProduct]]);
      const result = await productsServices.findById("abc");
      expect(result.type).to.deep.equal(INVALID_VALUE);
      expect(result.message).to.deep.equal('"id" must be a number');
    });
  });

  describe("Inserindo um produto no banco de dados", function () {
    it("Retornando o produto cadastrado", async function () {
      sinon.stub(productsModel, INSERT).resolves([{ insertId: 1 }]);
      sinon.stub(productsModel, FIND_BY_ID).resolves(allValidProducts[0]);
      const result = await productsServices.createProduct(validNameProduct);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allValidProducts[0]);
    });
  });

  describe("Atualizando um produto no banco de dados", function () {
    it("retorna um produto atualizado", async function () {
      sinon.stub(productsModel, UPDATE).resolves(updatedOneValidProduct);
      const result = await productsServices.update(1, updateValidProduct);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(updatedOneValidProduct);
    });

    it("retorna erro caso não encontre o id", async function () {
      sinon.stub(productsModel, UPDATE).resolves(oneValidProduct);
      const result = await productsServices.update(99, newValidProduct);

      expect(result.type).to.equal(NOT_FOUND);
      expect(result.message).to.deep.equal(PRODUCT_NOT_FOUND);
    });
  });

  describe("Removendo um produto no banco de dados", function () {
    it("retorna erro caso não encontre o id", async function () {
      sinon.stub(productsModel, REMOVE_PRODUCTS).resolves(removedProducts);
      const result = await productsServices.removeProducts(99);

      expect(result.type).to.equal(NOT_FOUND);
      expect(result.message).to.deep.equal(PRODUCT_NOT_FOUND);
    });

    it("retorna tamanho total do array 2", async function () {
      sinon.stub(productsModel, REMOVE_PRODUCTS).resolves(removedProducts);
      const result = await productsServices.removeProducts(2);
      expect(result.type).to.equal(null);
    });
  });
});
