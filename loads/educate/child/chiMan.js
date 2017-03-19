var app = angular.module("app.chiMan",["ngRoute"]);
app.config(function($routeProvider){
	$routeProvider.when("/chiMan",{
		templateUrl:"loads/educate/child/chiMan.html",
		controller:"chiManController"
	});
});
app.controller("chiManController",function($scope,$http,modalService){
	$scope.msg="幼儿图书页面";
	//表单中双向绑定的对象
	$scope.newUser;

//------------------------幼儿图书相关功能对象-----------------
	$scope.data={
		childs:$scope.$parent.chiData.childs,//存储书籍对象的数组
		modalTitle:"",
		option:"",
		search:{},
		criteria:{},
		//显示添加学生信息的窗口
		showAddModal:function(){
			this.option="add";
			$scope.newUser=null;
			this.modalTitle="添加幼儿图书信息";	
			modalService.open("chiModal");
		},
		//添加书籍信息
		addChi:function(){
		//1.将表单中的学生信息保存到books
			var chi=new Child(
				$scope.newUser.name,
				$scope.newUser.author,
				$scope.newUser.publish,
				$scope.newUser.price
			);
			$scope.data.childs.push(chi);
			//清空输入框的内容
			$scope.newUser=null;
			//2.关闭模态框
			modalService.close("chiModal");
		},
		//删除书籍
		delChi:function(){
			var b1=this.childs.some(function(item){
				return item.checked==true;
			});
			if(b1){
				if(window.confirm("确定吗？")){
					this.childs=this.childs.filter(function(item){
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
			var chi=this.childs.filter(function(item){
				return item.checked==true;
			})[0];
			//判断是否选中了元素
			if(chi){
				$scope.newUser=chi;
				this.modalTitle="修改"+chi.name+"信息";
				modalService.open("chiModal");
			}else{
				alert("请选中要修改的图书");
			}	
		},
		updChi:function(){
			modalService.close("chiModal");
		},

		//搜索图书
		searchChi:function(){
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
			this.childs.forEach(function(item){
				if(item.checked){
					item.rank="推荐"
				}
			});
		},
	
		//设置为未读
		becomeMember:function(id){
			if(window.confirm("确认标记为还原吗？")){
				this.childs.forEach(function(item){
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
	function Child(name,author,publish,price){
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
	var modal = document.getElementById("chiModal");
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