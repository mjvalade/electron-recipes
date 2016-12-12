let Application = require('spectron').Application;
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
});

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
