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

  it('Testing GuestListController', function(){
    var testVairable = true;
    expect(testVairable).toEqual(true);
    testVairable = guestlistController.glcEditTest(testVairable);
    expect(testVairable).toEqual(false);
    
  });

});


describe('GuestSvc', function(){
  var guestSvc, guests;
  beforeEach(module('shuffling'));
  beforeEach(function(){
    // mock the users
    module(function($provide){
      $provide.value('Guest', [
        {name: "one",status: "pickup",address:"Boston"},
        {name: "two",status: "dropoff",address:""},
        {name: "three",status: "arrived",address:"SFO"}
      ]);
    });
    inject(function($injector) {
      guestSvc = $injector.get('GuestSvc');
      guests = $injector.get('Guest');
    });
  });

  describe('remove', function(){
    it("should remove one item from guests", function(){
      var length = guests.length;
      guestSvc.removeTest(0,guests);
      expect(guests.length).toBe(length-1);
    });
  });

  describe('add', function(){
    it("should add one item to guests", function(){
      var newGuest = {name: "three",status: "pickup",address:"NYC"};
      var length = guests.length;
      guestSvc.addTest(guests,newGuest);
      expect(guests.length).toBe(length+1);
    });
  });

  describe('StatusChange', function(){

    it("pickup should change to arrived", function(){
      guestSvc.EditTest(0,guests);
      expect(guests[0].status).toBe('arrived');
    });

    it("dropoff should change to arrived", function(){
      guestSvc.EditTest(1,guests);
      expect(guests[1].status).toBe('arrived');
    });

    it("arrived should change to pickup", function(){
      guestSvc.EditTest(2,guests);
      expect(guests[2].status).toBe('pickup');
    });

  });

  describe('Local storage', function(){
    it("should set and get guest list from local storage", function(){
      var length = guests.length;
      var newguestsListTest = [];
      newguestsListTest = guestSvc.setgetlocalstorageTest(guests);
      expect(newguestsListTest.length).toBeGreaterThan(length);
    });
  });

  describe('Update', function(){
    it("should update guest details", function(){
      var length = guests.length;
      expect(guests[0].address).toBe('Boston');
      guestSvc.updateTest(0,guests,'Harvard');
      expect(guests[0].address).toBe('Harvard');
    });
  });


});