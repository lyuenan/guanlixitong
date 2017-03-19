var app=angular.module("app.category",["ngRoute"]);
app.config(function($routeProvider){
	$routeProvider.when("/category",{
		templateUrl:"loads/category/category.html",
		controller:"categoryController"
	});
});

app.controller("categoryController",function($scope,$http,modalService){
	$scope.msg="生活杂志页面";
	//表单中双向绑定的对象
	$scope.newUser;

	$scope.data={
		categorys:$scope.$parent.catData.categorys,
		modalTitle:"",
		option:"",
		
		showAddModal:function(){
			this.option="add";
			$scope.newUser=null;
			this.modalTitle="添加生活页面信息";	
			modalService.open("catModal");
		},
	
		addCat:function(){
		
			var cat=new Category(
				$scope.newUser.name,
				$scope.newUser.area,
				$scope.newUser.number
			);
			$scope.data.categorys.push(cat);
			
			$scope.newUser=null;
			
			modalService.close("catModal");
		},
		
		delCat:function(){
			var b1=this.categorys.some(function(item){
				return item.checked==true;
			});
			if(b1){
				if(window.confirm("确定吗？")){
					this.categorys=this.categorys.filter(function(item){
						return item.checked !=true;
					});
				}
			}else{
				alert("请选择要删除的杂志");
			}
		},
		
		showUpdModal:function(){
			this.option="upd";
			var cat=this.categorys.filter(function(item){
				return item.checked==true;
			})[0];
			
			if(cat){
				$scope.newUser=cat;
				this.modalTitle="修改"+cat.name+"信息";
				modalService.open("catModal");
			}else{
				alert("请选中要修改的杂志");
			}	
		},
		updCat:function(){
			modalService.close("catModal");
		},

		
		becomeRead:function(){
			this.categorys.forEach(function(item){
				if(item.checked){
					item.rank="推荐"
				}
			});
		},
	
		
		becomeMember:function(id){
			if(window.confirm("确认还原吗？")){
				this.categorys.forEach(function(item){
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
	function Category(name,area,number){
		this.id = ++id;
		this.name=name;
		this.area=area;
		this.number=number;
		this.rank="还原";
	}
});
//服务的创建，工厂模式
app.factory("modalService",function(){
	var modal = document.getElementById("catModal");
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
	