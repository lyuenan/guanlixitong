var app = angular.module("app.junMan",["ngRoute"]);
app.config(function($routeProvider){
	$routeProvider.when("/junMan",{
		templateUrl:"loads/educate/junior/junMan.html",
		controller:"junManController"
	});
});
app.controller("junManController",function($scope,$http,modalService){
	$scope.msg="初中图书页面";
	//表单中双向绑定的对象
	$scope.newUser;
//------------------------初中图书相关功能对象-----------------
	$scope.data={
		juniors:$scope.$parent.junData.juniors,//存储书籍对象的数组
		modalTitle:"",
		option:"",
		search:{},
		criteria:{},
		//显示添加图书信息的窗口
		showAddModal:function(){
			this.option="add";
			$scope.newUser=null;
			this.modalTitle="添加小学图书信息";	
			modalService.open("junModal");
		},
		//添加书籍信息
		addJun:function(){
		//1.将表单中的学生信息保存到books
			var jun=new Junior(
				$scope.newUser.name,
				$scope.newUser.author,
				$scope.newUser.publish,
				$scope.newUser.price
			);
			$scope.data.juniors.push(jun);
			//清空输入框的内容
			$scope.newUser=null;
			//2.关闭模态框
			modalService.close("junModal");
		},
		//删除书籍
		delJun:function(){
			var b1=this.juniors.some(function(item){
				return item.checked==true;
			});
			if(b1){
				if(window.confirm("确定吗？")){
					this.juniors=this.juniors.filter(function(item){
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
			var jun=this.juniors.filter(function(item){
				return item.checked==true;
			})[0];
			//判断是否选中了元素
			if(jun){
				$scope.newUser=jun;
				this.modalTitle="修改"+jun.name+"信息";
				modalService.open("junModal");
			}else{
				alert("请选中要修改的图书");
			}	
		},
		updJun:function(){
			modalService.close("junModal");
		},

		//搜索图书
		searchJun:function(){
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
			this.juniors.forEach(function(item){
				if(item.checked){
					item.rank="推荐"
				}
			});
		},

		//设置为未读
		becomeMember:function(id){
			if(window.confirm("确认还原吗？")){
				this.juniors.forEach(function(item){
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
	function Junior(name,author,publish,price){
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
	var modal = document.getElementById("junModal");
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
