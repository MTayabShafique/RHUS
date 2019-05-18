angular.module('consumpmodule').controller('conController', conController);

function conController($http){
	var vm = this;
	var myChart= document.getElementById('myChart').getContext('2d');
var consump = new Chart(myChart, {
  type: 'bar',
  data: {
    labels:['room1','room2','room3','room4'],
    datasets:[
    {
     label : 'consumptions',
     data : [
     899,
     892,
     323,
     234
     ]
    }
    ]
  },
  options : {
    scales: {
        xAxes: [{
            gridLines: {
                offsetGridLines: true
            }
        }]
    }
}

})
	// $http.get('/insert/consumption').then(function(d){  
    //     	console.log(d.data)
    //     	vm.reception= d.data;
    //     	console.log(vm.reception[1].name)
    //     });

}