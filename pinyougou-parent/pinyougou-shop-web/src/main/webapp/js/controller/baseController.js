app.controller('baseController', function ($scope) {

    $scope.reloadList = function () {
        $scope.search($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage)
    }

    //分页控件配置
    $scope.paginationConf = {
        currentPage: 1,     //当前页
        totalItems: 10,     //总记录数
        itemsPerPage: 10,       //每页记录数5
        perPageOptions: [5, 10, 20, 30, 40],       //分页选项
        onChange: function () {
            $scope.reloadList();//重新加载
        }
    };


    //需要删除的品牌集合
    $scope.selectIds = [];
    //用户勾选复选框
    $scope.updateSelection = function ($event, id) {
        if ($event.target.checked) {
            $scope.selectIds.push(id);
        } else {
            var index = $scope.selectIds.indexOf(id); //查找值得位置
            $scope.selectIds.splice(index, 1);   //参数1：移除的位置，参数2：移除的个数
        }
    }


    //优化【{}】的显示
    $scope.jsonToString = function (jsonString, key) {
        var json = JSON.parse(jsonString);
        var value = "";

        for (var i = 0; i < json.length; i++) {
            if (i > 0) {
                value += ",";
            }
            value += json[i][key];
        }
        return value;
    }


    //在list集合中根据某key的值查询对象
    $scope.searchObjectByKey=function(list,key,keyValue){
        for(var i=0;i<list.length;i++){
            if(list[i][key]==keyValue){
                return list[i];
            }
        }
        return null;
    }


})