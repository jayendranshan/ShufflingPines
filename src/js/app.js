var app = angular.module('shuffling', []);

app.controller('ShufflingController',['Guest','GuestSvc','$scope',function(Guest,GuestSvc,$scope){
 	var vm = this;

 	vm.guest=Guest;
 	$scope.submitted = false;

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

  	glc.showEdit = function(index){
    	glc.readonly = !glc.readonly;
    	glc.newStatus = GuestSvc.statusChange(index);
    	
  	};

}]);


app.value('Guest', {name: "Jay", pickupdrop: "pickup"});

app.service('GuestSvc', function(){

var guestsList = [];
var newStatus = '';

  this.Add = function(Guest){

  		guestsList.push({
 			guestname : Guest.name,
 			date : Guest.date,
 			status: Guest.status,
 			address: Guest.address
 		});

 		console.log(guestsList);
  	 	localStorage.setItem('GuestList', guestsList);
  	 	Guest = {};
 		var nextId = $(this).parents('.tab-pane').next().attr("id")||'guests';
  		$('[href=#'+nextId+']').tab('show');
  };

   this.remove = function(index){
   	if (confirm('Are you sure you want to delete this?')){
   	localStorage.setItem('GuestList', '');
    guestsList.splice(index, 1);
    localStorage.setItem('GuestList', guestsList);
    console.log(guestsList);
	}
  };

  this.list = function () {
        return guestsList;
    };

   this.get = function (index) {
        for (var i in guestsList) {
            if (guestsList[i].index === index) {
                return guestsList[i];
            }
        }

    };

    this.Update = function(index,Guest){
 		//$scope.newcontact = angular.copy(GuestSvc.get(index));

 		for (var i in guestsList) {
                if (guestsList[i].id === index) {
                    guestsList[i] = Guest;
                }
            }
        localStorage.setItem('GuestList', '');
        localStorage.setItem('GuestList', guestsList);
        console.log(guestsList);
  };

  this.statusChange = function (index) {
        //var guestDetails = this.get(index);
        console.log(guestsList);
        console.log(index);
        for (var i in guestsList) {
        	console.log(index);
            if (guestsList[i].index === index) {
            	console.log('inside');
                console.log(guestsList[i]);
            }
        }
        //if(guestDetails.status == 'pickup')
		    	//{
		    		//newStatus = 'arrived';
		    	//}
		    	//else if (guestDetails.status == 'dropoff')
		    	//{
		    		//newStatus = 'arrived';
		    	//}
		    	//else if (guestDetails.status == 'arrived')
		    	//{
		    		//newStatus = 'pickup';
		    	//}
        return newStatus;
    };

});