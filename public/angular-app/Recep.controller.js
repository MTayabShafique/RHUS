
var app1 = angular.module('receptionmodule')
app1.controller('recController', recController);
app1.controller('updateController', updateController)
app1.controller('customController', customController)
function recController($http){
	var vm = this;
	$http.get('/insert/details').then(function(d){  
        	
        	vm.reception= d.data;
        	
        	
        });
   	
    
}

function updateController($scope,$http, $routeParams){
	// var rec = this;
	var recep = $routeParams.id;
	$http.get('/insert/update/'+recep).then(function (d) {
		$scope.rec = d.data[0];
		// console.log(rec.first_name);
		// $scope.var1 = "Hello"

	})

	
// r = requests.get('http://192.168.1.12:3000/insert/service/'+"241,246,132,89")
}

function customController($scope,$http, $routeParams){
	// var rec = this;
	console.log('hello world');
	$scope.isSubmitted = false;


	console.log()
	$scope.addform = function () {
		var data ={
		first : $scope.cus.first_name,
		last : $scope.cus.last_name
	};
	$scope.isSubmitted = true;
	console.log($scope.cus.custom.$valid);
		if($scope.cus.custom.$valid){
			$http.post('http://localhost:3000/insert/test',data);
		console.log(data);
		}
		
		
	}

	
// r = requests.get('http://192.168.1.12:3000/insert/service/'+"241,246,132,89")
}