const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { allProducts } = require('./mocks/productsModelsMock')
const { connection } = require('../../../src/models')

describe('Testes de unidade do products model', function () {
  
  it('retorna a listagem de todos os produtos - MODEL', async function () {
    sinon.stub(connection, 'execute').resolves(allProducts);
    const result = await productsModel.findAll();
    expect(result).to.be.deep.equal(allProducts);
  })
});