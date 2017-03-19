var app = angular.module("app.englishMan",["ngRoute"]);

app.config(function($routeProvider){
	$routeProvider.when("/englishMan",{
		templateUrl:"loads/kaoji/englishMan.html",
		controller:"englishManController"
	});
});

app.controller("englishManController",function($scope,modalService){
	$scope.msg = "图书管理页面";
	$scope.data = {
		englishs : $scope.$parent.engData.englishs,
		neweng:null,
		option:"",
		modalTitle:"",
		showAddEng:function(){
			this.option = "add",
			this.modalTitle = "添加图书信息";
			this.neweng = null;
			modalService.open("engModal");			
		},
		addEng : function(){
			var eng = new English(
				this.newEng.name,
				this.newEng.simple,
				this.newEng.content,
				this.newEng.email,
				this.newEng.rank
			);
			this.englishs.push(eng);
			modalService.close("engModal");
		},
		delEng:function(){
			var b1 = this.englishs.some(function(item){
				return item.checked == true;
			});
			if(b1){
				if(window.confirm("确认吗？")){
					var arr = this.englishs.filter(function(item){
						return item.checked !=true;
					});
					//this.englishs
					//1.通过本作用域中的指令（ng-repeat="teachers"）给页面更改
					this.englishs = arr;
					//2.彻底删除父作用域中的数据。
					$scope.$parent.engData.englishs = arr;
				}
			}else{
				alert("请选中要删除的等级");			
			}
		},
		showUpdEng : function(){
			this.option="upd";
			var eng = this.englishs.filter(function(item){
				return item.checked == true;
			})[0];
			if(eng){
				this.newEng = eng;
				this.modalTitle = "修改"+eng.name+"信息";
				modalService.open("engModal");
			}
		},
		updEng : function(){
			modalService.close("engModal");
		}
	}
});

var id = 1002;
function English(name,simple,content,email,rank){
	this.id = ++id;
	this.name = name;
	this.simple = simple;
	this.content = content;
	this.email = email;
	this.rank = rank;
}