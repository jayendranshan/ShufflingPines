var app = angular.module('shuffling', []);

app.controller('ShufflingController',['Guest','GuestSvc',function(Guest,GuestSvc){
 	var vm = this;

 	vm.guest=Guest;

 	vm.Add = function(){ 
 		GuestSvc.Add(vm.guest);
 	};
}]);


app.controller('GuestListController', ['Guest','GuestSvc',function(Guest,GuestSvc){
	var glc = this;
	glc.guestsList=[];
	glc.guestsList = GuestSvc.list();
	glc.newguest=Guest;

	glc.remove = function(index){
    	GuestSvc.remove(index);
  	};

  	glc.Update = function(index){
    	GuestSvc.Update(index,glc.newguest);
  	};

}]);


app.value('Guest', {name: "Jay", pickupdrop: "pickup"});

app.service('GuestSvc', function(){

var guestsList = [];

  this.Add = function(Guest){

  		guestsList.push({
 			guestname : Guest.name,
 			date : Guest.date,
 			status: Guest.pickupdrop,
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
        for (i in guestsList) {
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

});