var app = angular.module("app.shijieMan",["ngRoute"]);

app.config(function($routeProvider){
	$routeProvider.when("/shijieMan",{
		templateUrl:"loads/mingzhu/shijieMan.html",
		controller:"shijieManController"
	});
});

app.controller("shijieManController",function($scope,modalService){
	$scope.msg = "图书管理页面";
	$scope.data = {
		shijies : $scope.$parent.shiData.shijies,
		newShi:null,
		option:"",
		modalTitle:"",
		showAddShi:function(){
			this.option = "add",
			this.modalTitle = "添加图书信息";
			this.newShi = null;
			modalService.open("shiModal");			
		},
		addShi : function(){
			var shi = new Shijie(
				this.newShi.name,
				this.newShi.author,
				this.newShi.content,
				this.newShi.email,
				this.newShi.rank
			);
			this.shijies.push(shi);
			modalService.close("shiModal");
		},
		delShi:function(){
			var b1 = this.shijies.some(function(item){
				return item.checked == true;
			});
			if(b1){
				if(window.confirm("确认吗？")){
					var arr = this.shijies.filter(function(item){
						return item.checked !=true;
					});
					//this.shijies
					//1.通过本作用域中的指令（ng-repeat="teachers"）给页面更改
					this.shijies = arr;
					//2.彻底删除父作用域中的数据。
					$scope.$parent.shiData.shijies = arr;
				}
			}else{
				alert("请选中要删除的名著");			
			}
		},
		showUpdShi : function(){
			this.option="upd";
			var shi = this.shijies.filter(function(item){
				return item.checked == true;
			})[0];
			if(shi){
				this.newShi = shi;
				this.modalTitle = "修改"+shi.name+"信息";
				modalService.open("shiModal");
			}
		},
		updShi : function(){
			modalService.close("shiModal");
		}
	}
});

var id = 1002;
function Shijie(name,author,content,email,rank){
	this.id = ++id;
	this.name = name;
	this.author = author;
	this.content = content;
	this.email = email;
	this.rank = rank;
	this.picture = "images/"+name+".jpg";
}