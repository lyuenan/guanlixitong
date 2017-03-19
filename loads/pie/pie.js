var app = angular.module("app.pie",["ngRoute"]);
app.config(function($routeProvider){
	$routeProvider.when("/pie",{
		templateUrl:"loads/pie/pie.html",
		controller:"pieController"
	});
});

app.controller("pieController",function($scope,modalService){
    
	
	var obj = {};
	$scope.$parent.chiData.childs.forEach(function(item){
		if(obj.hasOwnProperty(item.author)){
			obj[item.author]++;
		}else{
			obj[item.author] = 1;
		}
	});
	var info = [];
	var length = $scope.$parent.chiData.childs.length;
	// Object { 14=2,  15=2,  16=1}=>[[14,],[]]
	for(key in obj){
		var arr = [];
		arr.push(key+"作者");
		arr.push((obj[key]/length)*100);
		info.push(arr);
	}
	//console.log(info);
	

	angular.element(document.getElementById("container")).highcharts({
        chart: {
            type: 'pie',
            options3d: {
				enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: '爱好比例'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: info
        }]
    });

});
