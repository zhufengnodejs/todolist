angular.module('todoApp').controller('todoCtrl',function($scope,todoService){
    $scope.todos = [];
    todoService.query().then(function(todos){
        console.log(todos);
        $scope.todos = todos;
    });
});