'use strict';

describe('Service: sock', function () {

  // load the service's module
  beforeEach(module('webClientApp'));

  // instantiate service
  var sock;
  beforeEach(inject(function (_sock_) {
    sock = _sock_;
  }));

  it('should do something', function () {
    expect(!!sock).toBe(true);
  });

});
