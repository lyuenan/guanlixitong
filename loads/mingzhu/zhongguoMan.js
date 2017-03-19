var app = angular.module("app.zhongguoMan",["ngRoute"]);

app.config(function($routeProvider){
	$routeProvider.when("/zhongguoMan",{
		templateUrl:"loads/mingzhu/zhongguoMan.html",
		controller:"zhongguoManController"
	});
});

app.controller("zhongguoManController",function($scope,modalService){
	$scope.msg = "图书管理页面";
	$scope.data = {
		zhongguos : $scope.$parent.zhoData.zhongguos,
		newZho:null,
		option:"",
		modalTitle:"",
		showAddZho:function(){
			this.option = "add",
			this.modalTitle = "添加图书信息";
			this.newZho = null;
			modalService.open("zhoModal");			
		},
		addZho : function(){
			var zho = new Zhongguo(
				this.newZho.name,
				this.newZho.author,
				this.newZho.content,
				this.newZho.email,
				this.newZho.rank
			);
			this.zhongguos.push(zho);
			modalService.close("zhoModal");
		},
		delZho:function(){
			var b1 = this.zhongguos.some(function(item){
				return item.checked == true;
			});
			if(b1){
				if(window.confirm("确认吗？")){
					var arr = this.zhongguos.filter(function(item){
						return item.checked !=true;
					});
					//this.chinas
					//1.通过本作用域中的指令（ng-repeat="teachers"）给页面更改
					this.zhongguos = arr;
					//2.彻底删除父作用域中的数据。
					$scope.$parent.zhoData.zhongguos = arr;
				}
			}else{
				alert("请选中要删除的名著");			
			}
		},
		showUpdZho : function(){
			this.option="upd";
			var zho = this.zhongguos.filter(function(item){
				return item.checked == true;
			})[0];
			if(zho){
				this.newZho = zho;
				this.modalTitle = "修改"+zho.name+"信息";
				modalService.open("zhoModal");
			}
		},
		updZho : function(){
			modalService.close("zhoModal");
		}
	}
});

var id = 1002;
function Zhongguo(name,author,content,email,rank){
	this.id = ++id;
	this.name = name;
	this.author = author;
	this.content = content;
	this.email = email;
	this.rank = rank;
	this.picture = "images/"+name+".jpg";
}