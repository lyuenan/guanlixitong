var app = angular.module("app.uniMan",["ngRoute"]);
app.config(function($routeProvider){
	$routeProvider.when("/uniMan",{
		templateUrl:"loads/educate/university/uniMan.html",
		controller:"uniManController"
	});
});
app.controller("uniManController",function($scope,$http,modalService){
	$scope.msg="大学及以上图书页面";
	//表单中双向绑定的对象
	$scope.newUser;
//------------------------大学图书相关功能对象-----------------
	$scope.data={
		universitys:$scope.$parent.uniData.universitys,//存储书籍对象的数组
		modalTitle:"",
		option:"",
		search:{},
		criteria:{},
		//显示添加图书信息的窗口
		showAddModal:function(){
			this.option="add";
			$scope.newUser=null;
			this.modalTitle="添加大学图书信息";	
			modalService.open("uniModal");
		},
		//添加书籍信息
		addSen:function(){
		//1.将表单中的学生信息保存到books
			var uni=new University(
				$scope.newUser.name,
				$scope.newUser.author,
				$scope.newUser.publish,
				$scope.newUser.price
			);
			$scope.data.universitys.push(uni);
			//清空输入框的内容
			$scope.newUser=null;
			//2.关闭模态框
			modalService.close("uniModal");
		},
		//删除书籍
		delUni:function(){
			var b1=this.universitys.some(function(item){
				return item.checked==true;
			});
			if(b1){
				if(window.confirm("确定吗？")){
					this.universitys=this.universitys.filter(function(item){
						return item.checked !=true;
					});
				}
			}else{
				alert("请选择要删除的书籍");
			}
		},
		//点击修改按钮激发，显示模态框
		showUpdModal:function(){
			this.option="upd";
			var uni=this.universitys.filter(function(item){
				return item.checked==true;
			})[0];
			//判断是否选中了元素
			if(uni){
				$scope.newUser=uni;
				this.modalTitle="修改"+uni.name+"信息";
				modalService.open("uniModal");
			}else{
				alert("请选中要修改的图书");
			}	
		},
		updUni:function(){
			modalService.close("uniModal");
		},

		//搜索图书
		searchUni:function(){
			//改变criteria的值
			//当key和val都有值的情况下再筛选
			this.criteria={};
			if(this.search.key&&this.search.val){
				this.criteria[this.search.key]=this.search.val;
			}else{
				this.criteria={};
			}
		},
		becomeRead:function(){
			this.universitys.forEach(function(item){
				if(item.checked){
					item.rank="推荐"
				}
			});
		},

		//设置为未读
		becomeMember:function(id){
			if(window.confirm("确认还原吗？")){
				this.universitys.forEach(function(item){
					if(item.id==id){
						item.rank="还原"
					}
				});
			}
		}
	}

//------------------------------end-----------------------	
	
	var id=1000;
	//构造器
	function University(name,author,publish,price){
		this.id = ++id;
		this.name=name;
		this.author=author;
		this.publish=publish;
		this.price=price;
		this.rank="还原";
	}
});
//服务的创建，工厂模式
app.factory("modalService",function(){
	var modal = document.getElementById("uniModal");
	modal = angular.element(modal);
	return{
		open:function(){
			modal.modal("show");
		},
		close:function(){
			modal.modal("hide");
		}
	}
});


