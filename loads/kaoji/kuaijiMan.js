var app = angular.module("app.kuaijiMan",["ngRoute"]);

app.config(function($routeProvider){
	$routeProvider.when("/kuaijiMan",{
		templateUrl:"loads/kaoji/kuaijiMan.html",
		controller:"kuaijiManController"
	});
});

app.controller("kuaijiManController",function($scope,modalService){
	$scope.msg = "考级管理页面";
	$scope.data = {
		kuaijis : $scope.$parent.kuaData.kuaijis,
		newkua:null,
		option:"",
		modalTitle:"",
		showAddKua:function(){
			this.option = "add",
			this.modalTitle = "添加考级信息";
			this.newkua = null;
			modalService.open("kuaModal");			
		},
		addKua : function(){
			var kua = new Kuaiji(
				this.newKua.name,
				this.newKua.simple,
				this.newKua.content
			);
			this.kuaijis.push(kua);
			modalService.close("kuaModal");
		},
		delKua:function(){
			var b1 = this.kuaijis.some(function(item){
				return item.checked == true;
			});
			if(b1){
				if(window.confirm("确认吗？")){
					var arr = this.kuaijis.filter(function(item){
						return item.checked !=true;
					});
					//this.kuaijis
					//1.通过本作用域中的指令（ng-repeat="teachers"）给页面更改
					this.kuaijis = arr;
					//2.彻底删除父作用域中的数据。
					$scope.$parent.kuaData.kuaijis = arr;
				}
			}else{
				alert("请选中要删除的等级");			
			}
		},
		showUpdKua : function(){
			this.option="upd";
			var kua = this.kuaijis.filter(function(item){
				return item.checked == true;
			})[0];
			if(kua){
				this.newKua = kua;
				this.modalTitle = "修改"+kua.name+"信息";
				modalService.open("kuaModal");
			}
		},
		updKua : function(){
			modalService.close("kuaModal");
		}
	}
});

var id = 1002;
function Kuaiji(name,simple,content,email,rank){
	this.id = ++id;
	this.name = name;
	this.simple = simple;
	this.content = content;
}