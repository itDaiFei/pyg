
//控制层（controller）
app.controller('brandController', function ($scope, $controller, brandService) {

    //继承
    $controller('baseController',{$scope:$scope});


    //读取列表数据绑定到表单中
    $scope.findAll = function () {
        brandService.findAll().success(
            function (response) {
                $scope.list = response;
            }
        );
    };



    //读取列表数据绑定到表单中(分页)
    $scope.findPage=function (page,size) {
        brandService.findPage(page,size).success(
            function (response) {
                $scope.list=response.rows;  //显示当前页数据
                $scope.paginationConf.totalItems=response.total;    //更新总记录数
            }
        )
    };

    //添加品牌
    $scope.save=function () {
        var obj=null;
        if ($scope.entity.id!=null){
            obj=brandService.update($scope.entity);
        }else {
            obj=brandService.add($scope.entity);
        }
        obj.success(
            function (response) {
                if (response.success){
                    $scope.reloadList();
                } else {
                    alert(response.message);
                }
            }
        );
    };

    //修改findOne
    $scope.findOne=function (id) {
        brandService.findOne(id).success(
            function (response) {
                $scope.entity=response;
            }
        )
    };



    //删除
    $scope.del=function () {
        brandService.del($scope.selectIds).success(
            function (response) {
                if (response.success){
                    $scope.reloadList();
                } else {
                    alert(response.message);
                }
            }
        )
    };

    //条件查询
    $scope.searchEntity={};
    $scope.search=function (page,size) {
        brandService.search(page,size,$scope.searchEntity).success(
            function (response) {
                $scope.list=response.rows;  //显示当前页数据
                $scope.paginationConf.totalItems=response.total;    //更新总记录数
            }
        )
    };



});