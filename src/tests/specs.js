describe('ShufflingController', function(){
  var shufflingController, scope;
  beforeEach(angular.mock.module('shuffling'));
  beforeEach(angular.mock.inject(function($controller, $rootScope){
    scope = $rootScope.$new();
    shufflingController = $controller('ShufflingController', {$scope: scope});
  }));

  it('should add form value to array', function(){
    shufflingController.guest.name = "something";
    shufflingController.guest.status = "somethingelse";
    shufflingController.guest.address = "somethingelse";
    expect(shufflingController.guestsListtesting.length).toBe(0);
    shufflingController.addTest();
    expect(shufflingController.guestsListtesting.length).toBe(1);
    
  });

  it('Dropoff should not have location', function(){
    shufflingController.guest.address = "somethingelse";
    shufflingController.DropOff();
    expect(shufflingController.guest.address).toBe('');
    
  });

});

describe('GuestListController', function(){
  var guestlistController, scope;
  beforeEach(angular.mock.module('shuffling'));
  beforeEach(angular.mock.inject(function($controller, $rootScope){
    scope = $rootScope.$new();
    guestlistController = $controller('GuestListController', {$scope: scope});
  }));

});


describe('GuestSvc', function(){
  var guestSvc, guests;
  beforeEach(module('shuffling'));
  beforeEach(function(){
    // mock the users
    module(function($provide){
      $provide.value('Guest', [
        {name: "one",status: "pickup",address:"Boston"},
        {name: "two",status: "dropoff",address:""}
      ]);
    });
    inject(function($injector) {
      guestSvc = $injector.get('GuestSvc');
      guests = $injector.get('Guest');
    });
  });

  describe('remove', function(){
    it("should remove one item from users", function(){
      var length = guests.length;
      guestSvc.removeTest(0,guests);
      expect(guests.length).toBe(length);
    });
  });
});