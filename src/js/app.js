//$(document).ready(function(){
  //var fizzbuzz = 0;
  //$('#plus-btn').click(function(){
    //fizzbuzz++;
    //$('#fizzbuzz').html(fizzbuzz);
  //});
  //$('#fizzbuzz').html(fizzbuzz);
//});


//var app = angular.module('shuffling', []);

//app.controller('FormController', [function(){


//}]);

//app.controller('TabController', [function(){

//}]);

angular.module('shuffling', [])
 .controller('ShufflingController',function(){
 	var vm = this;

 	vm.guests=[];
 	//vm.username = "Jayendran";

 	vm.Add = function(){ 
 		//console.log("Hi how r username");
 		vm.guests.push({
 			guestname : vm.guestname,
 			date : vm.date,
 			status: vm.pickupdrop,
 			address: vm.address
 		});
 		localStorage.setItem('GuestList', vm.guests);
 		var nextId = $(this).parents('.tab-pane').next().attr("id")||'guests';
 		console.log(nextId);
  		$('[href=#'+nextId+']').tab('show');
 		console.log(vm.guests);

 	};

 	});



// });