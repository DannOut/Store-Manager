const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/productsModel');
const { allProducts } = require('../mocks/productsMocks')
const connection = require('../../../src/models/connection')

describe('Testes de unidade do products model', function () {
  
  it('retorna a listagem de todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves(allProducts);
    const result = await productsModel.findAll();
    expect(result).to.be.deep.equal(allProducts);
  })
});