const sinon = require('sinon');
const {expect} = require("chai");

const retry = require('./004-retry');

describe('retry', () => {

  // before
  // after

  // beforeEach перед каждым тестом восстанавливаем состояние
  afterEach(() => { //после каждого теста восстанавливаем состояние
    sinon.restore();
  });

  it('should call passed function and return it\'s result if any', async () => {

    const timeout = 0;
    const expected = 42;
    const fn = sinon.stub().returns(expected);
    const self = {};
    const args = [1, 2, 3, 4];

    const actual = await retry(timeout, fn, self, ...args); 

    expect(actual).to.be.equal(expected);
    expect(fn).to.have.been.called; // to.not.have.been.called
    expect(fn).calledOn(self); // this проверяет с каким контекстом или not.calledOn
    expect(fn).calledWithExactly(...args); // что ф-я была вызвана с этими аргументами или not.calledWithExactly
  });

  it('should call passed function second time if error has been returned after the first call', async () => {
    const timeout = 0;
    const expected = 42;
    const fn = sinon.stub()
      .onFirstCall().throws(new Error)
      .onSecondCall().returns(expected);
    const self = {}
    const args = [1, 2, 3, 4]

    const actual = await retry(timeout, fn, self, ...args)

    expect(actual).to.be.equal(expected);
    expect(fn).to.have.been.called;
    expect(fn).to.calledTwice;
    expect(fn).calledOn(self); // this
    expect(fn).calledWithExactly(...args);
  });

  it('should call the function second time after specified amount of time', async () => {
    const timeout = 100000000;
    const expected = 42;
    const fn = sinon.stub()
      .onFirstCall().throws(new Error)
      .onSecondCall().returns(expected);
    const self = {}
    const args = [1, 2, 3, 4]

    const timers = sinon.useFakeTimers()

    const actualPromise = retry(timeout, fn, self, ...args)

    await Promise.resolve() // Разорвать текущий синхронный блок кода

    timers.next() // чтобы перемотать код к следующему таймеру

    const actual = await actualPromise;

    expect(actual).to.be.equal(expected);
    expect(fn).to.have.been.called;
    expect(fn).to.calledTwice;
    expect(fn).calledOn(self); // this
    expect(fn).calledWithExactly(...args);
  });
});
