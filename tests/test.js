var Application = require('spectron').Application;
var assert = require('chai').assert;
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
// const FileBin = require('file-bin');

var electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron');
var appPath = path.join(__dirname, '..');

global.before(() => {
    chai.should();
    chai.use(chaiAsPromised);
});

describe('App starts and has correct title and buttons', () => {

  var app = null;

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

  it('tests the title', () => {
    return app.client.waitUntilWindowLoaded()
      .getTitle().should.eventually.equal('&#129472; Good Food');
  });
});

  // it('tests the Open File button text is not disabled', () => {
  //   return app.client.waitUntilWindowLoaded().getText('#open-file')
  //   .then(function (buttonText) {
  //     assert(buttonText === 'Open File');
  //   });
  // });

  // it('tests the Save button text is disabled', () => {
  //   return app.client.getText('#save-markdown').then(function (buttonText) {
  //     assert(buttonText === 'Save File');
  //   });
  // });

  // it('tests the Open button opens a file dialog', () => {
  //   return app.client.click('#open-file')
  //   .then((dialog) => {
  //     // Dialogs are tricky
  //     assert.equal(dialog.status, 0);
  //   });

describe('Test accessibility', () => {
  var app = null;

  beforeEach(() => {
    app = new Application({ path: electronPath, args: [appPath]});
    return app.start();
  });

  afterEach(() => {
    return app.stop;
  });

  it('console log audit errors', () => {
    app.client.auditAccessibility().then((audit) => {
      if (audit.failed) {
        console.error(audit.message);
      }
    });
  });
});
