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
 			username : vm.username,
 			time : new Date()
 		});
 		vm.username='';
 		vm.password='';
 	};

 	});



// });