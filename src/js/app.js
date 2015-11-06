var app = angular.module('shuffling', []);

app.controller('ShufflingController',['Guest','GuestSvc','$scope',function(Guest,GuestSvc,$scope){
 	var vm = this;

 	vm.guest=Guest;
 	$scope.submitted = false;

  //For testing controller, this was added
  vm.guestsListtesting = [];
  vm.addTest = function(){ 
    vm.guestsListtesting.push({
      guestname : Guest.name,
      date : Guest.date,
      status: Guest.status,
      address: Guest.address
    });
  };
  

 	vm.Add = function(){ 
 		 if ($scope.GuestForm.$valid) {
 		 	GuestSvc.Add(vm.guest);
    		}	
 	};

 	vm.DropOff = function(){ 
 		vm.guest.address='';
 	};

}]);


app.controller('GuestListController', ['Guest','GuestSvc','$scope',function(Guest,GuestSvc,$scope){
	var glc = this;
	glc.guestsList=[];
	glc.guestsList = GuestSvc.list();
	glc.newguest=Guest;

	glc.readonly = true;
	glc.newStatus = '';
	glc.remove = function(index){
    	GuestSvc.remove(index);
  	};

  	glc.Update = function(index){
	    	GuestSvc.Update(index,glc.newguest);
	    	glc.guestsList = GuestSvc.list();
	    	glc.readonly = true;
  	};

  	glc.Edit = function(index){
    	glc.readonly = !glc.readonly;
    	Guest = GuestSvc.Edit(index);
  	};

}]);


app.value('Guest', {name: "Jay", status: "pickup"});

app.service('GuestSvc', ['Guest',function(Guest){

var guestsList = [];

  this.Add = function(Guest){

  		guestsList.push({
 			guestname : Guest.name,
 			date : Guest.date,
 			status: Guest.status,
 			address: Guest.address
 		});

 		console.log(guestsList);
  	 	localStorage.setItem("GuestListStore", guestsList);
  	 	Guest = {};
 		var nextId = $(this).parents('.tab-pane').next().attr("id")||'guests';
  		$('[href=#'+nextId+']').tab('show');
  };

   this.remove = function(index){
     	if (confirm('Are you sure you want to delete this?')){
     	localStorage.removeItem("GuestListStore");
      guestsList.splice(index, 1);
      localStorage.setItem("GuestListStore", guestsList);
      console.log(guestsList);
  	}
  };

  this.removeTest = function(index,guestsListTest){
    guestsListTest.splice(index, 1);
  };

  this.list = function () {

        return guestsList;
    };

   this.get = function (index) {
        //for (var i in guestsList) {
            //if (guestsList[i].id === index) {
                //return guestsList[i];
            //}
        //}
        //var fullGuestList = [];
        //fullGuestList = localStorage.getItem("GuestListStore")
        return guestsList[index];

    };

    this.Update = function(index,Guest){
 		//$scope.newcontact = angular.copy(GuestSvc.get(index));
 		for (var i in guestsList) {
                if (guestsList[i].id === index) {
                	console.log(guestsList[i]);
                    guestsList[i] = Guest;
                }
            }
        localStorage.removeItem("GuestListStore");
        localStorage.setItem("GuestListStore", guestsList);
        console.log(guestsList);
  };

  this.Edit = function (index) {
        //var oneGuestDetails = this.get(index);
        //console.log(guestsList);
        //console.log(index);
        //console.log(guestsList[index].status);
        if(guestsList[index].status === 'pickup')
        {
        	guestsList[index].status = 'arrived';
        }
        else if(guestsList[index].status === 'dropoff')
        {
        	guestsList[index].status = 'arrived';
        }
        else if(guestsList[index].status === 'arrived')
        {
        	guestsList[index].status = 'pickup';
        }
        localStorage.removeItem("GuestListStore");
        localStorage.setItem("GuestListStore", guestsList);
        console.log(guestsList);
    };
}]);