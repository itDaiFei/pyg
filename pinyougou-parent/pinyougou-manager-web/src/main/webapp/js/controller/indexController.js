app.controller('indexController',function ($http,$scope, loginService) {

    $scope.loginName=null;
    $scope.showLoginName=function () {
        loginService.loginName().success(
            function (response) {
                $scope.loginName=response.loginName;
            }
        )
    };
})