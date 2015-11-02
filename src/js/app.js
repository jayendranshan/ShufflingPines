var app = angular.module('shuffling', []);

app.controller('ShufflingController',['Guest','GuestSvc',function(Guest,GuestSvc){
 	var vm = this;

 	vm.guest=Guest;

 	vm.Add = function(){ 
 		GuestSvc.Add(vm.guest);
 	};
}]);


app.controller('GuestListController', ['GuestSvc',function(GuestSvc){
	var glc = this;
	glc.guestsList=[];
	glc.guestsList = GuestSvc.list();

	glc.remove = function(index){
    	GuestSvc.remove(index);
  	};

}]);


app.value('Guest', {name: "Jay", pickupdrop: "pickup", address: "Boston"});

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
 		var nextId = $(this).parents('.tab-pane').next().attr("id")||'guests';
  		$('[href=#'+nextId+']').tab('show');
  };

   this.remove = function(index){
   	if (confirm('Are you sure you want to delete this?')){
   	localStorage.setItem('GuestList', '');
    guestsList.splice(index, 1);
    localStorage.setItem('GuestList', guestsList);
	}
  };

  this.list = function () {
        return guestsList;
    };

   this.get = function (index) {
        for (i in guestsList) {
            if (guestsList[i].index == index) {
                return guestsList[i];
            }
        }

    }

});