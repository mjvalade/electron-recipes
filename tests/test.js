let Application = require('spectron').Application;
// let assert = require('chai').assert;
let expect = require('chai').expect;
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

let electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron');
let appPath = path.join(__dirname, '..');

global.before(() => {
  chai.should();
  chai.use(chaiAsPromised);
});

describe('App starts and has correct title and buttons', () => {

  let app = null;

  beforeEach(() => {
    app = new Application({ path: electronPath, args: [appPath]});
    return app.start();
  });

  afterEach(() => {
    return app.stop();
  });

  it('opens a window', () => {
    return app.client.waitUntilWindowLoaded()
      .getWindowCount().should.eventually.equal(1);
  });

  // it('tests the title', () => {
  //   return app.client.waitUntilWindowLoaded()
  //     .getTitle().should.eventually.equal('&#129472; Good Food');
  // });

  it('tests the search button is disabled on page load', () => {
    $('.search-button').should.have.prop('disabled');
    expect($('.search-button')).to.have.prop('disabled', true);
  });
});

  // it('tests the Open File button text is not disabled', () => {
  //   return app.client.waitUntilWindowLoaded().getText('#open-file')
  //   .then(function (buttonText) {
  //     assert(buttonText === 'Open File');
  //   });
  // });



describe('Test accessibility', () => {
  let app = null;

  beforeEach(() => {
    app = new Application({ path: electronPath, args: [appPath]});
    return app.start();
  });

  afterEach(() => {
    return app.stop();
  });

  it('console log audit errors', () => {
    app.client.auditAccessibility().then((audit) => {
      if (audit.failed) {
        console.error(audit.message);
      }
    });
  });
});
