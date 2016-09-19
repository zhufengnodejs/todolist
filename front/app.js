angular.module('todoApp', ['ngRoute', 'ngResource'])
    .config(function ($routeProvider) {
        var routeConfig = {
            templateUrl:'todoPage.html',
            controller:'todoCtrl' //控制器的名称
        }
        //配置路由
        $routeProvider.when('/', routeConfig)
            .when('/:status', routeConfig)
            .otherwise({
                redirectTo: '/'
            })
    });