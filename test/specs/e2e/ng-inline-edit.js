describe('ng-inline-edit', function() {

  beforeEach(function() {
    browser.ignoreSynchronization = true;
    browser.get('http://127.0.0.1:8080/demo/index.html');
  });

  // TODO: add more e2e tests
  it('should initialize properly', function() {
    var inputElements = element.all(by.className('ng-inline-edit__input'));
    expect(inputElements.count()).toEqual(4);
    expect(inputElements.get(2).getTagName()).toEqual('textarea');
  });
});
