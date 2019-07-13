 //控制层 
app.controller('goodsController' ,function($scope,$controller ,$location ,goodsService,itemCatService,typeTemplateService){
	
	$controller('baseController',{$scope:$scope});//继承
	
    //读取列表数据绑定到表单中
	$scope.findAll=function(){
		goodsService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		goodsService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//保存 
	$scope.save=function(){				
		var serviceObject;//服务层对象  				
		if($scope.entity.id!=null){//如果有ID
			serviceObject=goodsService.update( $scope.entity ); //修改  
		}else{
			serviceObject=goodsService.add( $scope.entity  );//增加 
		}				
		serviceObject.success(
			function(response){
				if(response.success){
					//重新查询 
		        	$scope.reloadList();//重新加载
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		goodsService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
					$scope.reloadList();//刷新列表
					$scope.selectIds=[];
				}						
			}		
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){			
		goodsService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}

	$scope.status = ['未审核', '申请中', '审核通过', '已驳回'];
	$scope.itemCatList = [];
	//查询商品分类列表
	$scope.findItemCatList = function () {
		itemCatService.findAll().success(
			function (response) {
				for (var i = 0; i < response.length; i++) {
					$scope.itemCatList[response[i].id] = response[i].name;
				}
			}
		)
	};


	//查询实体
	$scope.findOne = function () {
		var id = $location.search()['id'];
		if (id == null) {
			return;
		}
		goodsService.findOne(id).success(
			function (response) {
				$scope.entity = response;
				editor.html(response.goodsDesc.introduction);//富文本内容
				$scope.entity.goodsDesc.itemImages = JSON.parse($scope.entity.goodsDesc.itemImages); //商品图片
				$scope.entity.goodsDesc.customAttributeItems = JSON.parse($scope.entity.goodsDesc.customAttributeItems) //拓展属性
				$scope.entity.goodsDesc.specificationItems = JSON.parse($scope.entity.goodsDesc.specificationItems) //规格
				for (var i = 0; i < $scope.entity.itemList.length; i++) {
					$scope.entity.itemList[i].spec = JSON.parse($scope.entity.itemList[i].spec);
				}
			}
		);
	}


	//图片列表
	$scope.entity = {goodsDesc: {itemImages: [], specificationItems: []}}; //定义页面实体结构
	//保存图片到列表
	$scope.add_image_entity = function () {
		$scope.entity.goodsDesc.itemImages.push($scope.image_entity);
	}

	//根据规格名称和选项名称返回是否被勾选
	$scope.checkAttributeValue = function (specName, optionName) {
		var items = $scope.entity.goodsDesc.specificationItems;
		var object = $scope.searchObjectByKey(items, 'attributeName', specName);
		if (object == null) {
			return false;
		} else {
			if (object.attributeValue.indexOf(optionName) >= 0) {
				return true;
			} else {
				return false;
			}
		}
	}


	//查询一级分类
	$scope.selectItemCat1List = function () {
		itemCatService.findByParentId("0").success(
			function (response) {
				$scope.itemCat1List = response;
			}
		)
	};

	//查询二级商品分类列表
	$scope.$watch('entity.goods.category1Id', function (newValue, oldValue) {
		itemCatService.findByParentId(newValue).success(
			function (response) {
				$scope.itemCat2List = response;
			}
		)
	});

	//查询三级商品分类列表
	$scope.$watch('entity.goods.category2Id', function (newValue, oldValue) {
		itemCatService.findByParentId(newValue).success(
			function (response) {
				$scope.itemCat3List = response;
			}
		)
	});

	//读取模板id
	$scope.$watch('entity.goods.category3Id', function (newValue, oldValue) {
		itemCatService.findOne(newValue).success(
			function (response) {
				$scope.entity.goods.typeTemplateId = response.typeId;
			}
		)
	});

	//根据模板id，查询品牌列表
	$scope.$watch('entity.goods.typeTemplateId', function (newValue, oldValue) {
		typeTemplateService.findOne(newValue).success(
			function (response) {
				$scope.typeTemplate = response;
				$scope.typeTemplate.brandIds = JSON.parse($scope.typeTemplate.brandIds); //品牌列表类型转换

				//绑定拓展属性
				if ($location.search()['id'] == null) {
					$scope.entity.goodsDesc.customAttributeItems = JSON.parse($scope.typeTemplate.customAttributeItems);
				}

			}
		)

		//查询规格列表
		typeTemplateService.findSpecList(newValue).success(
			function (response) {
				$scope.specList = response;
			}
		);
	});

	//根据id批量修改状态
	$scope.updateStatus=function (status) {
		goodsService.updateStatus($scope.selectIds,status).success(
			function (response) {
				if (response.success){
					alert(response.message);
					$scope.reloadList(); //刷新列表
					$scope.selectIds=[]; //清空集合
				} else {
					alert(response.message);
				}
			}
		)
	};



    
});	
