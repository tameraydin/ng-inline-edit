exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['specs/e2e/ng-inline-edit.js'],
  capabilities: {
    'browserName': 'firefox'
  }
};
