angular.module('todoApp').controller('todoCtrl',function($scope,todoService,$filter,$routeParams){
    $scope.todos = [];
    $scope.remindingCount=0;//未完成的事件数量
    $scope.completedCount=0;//完成的数量
    $scope.status = '';
    $scope.editTodo = {};
    todoService.query().then(function(todos){
        $scope.todos = todos;
    });
    $scope.$watch('todos',function(){
        $scope.remindingCount = $filter('filter')($scope.todos,{completed:false}).length;
        $scope.completedCount = $filter('filter')($scope.todos,{completed:true}).length;
    },true);//深度
    $scope.createTodo = function(){
        todoService.save({title:$scope.newTodo,completed:false})
            .then(function(todo){
                $scope.todos.push(todo);
                $scope.newTodo = '';
            })
    }
    $scope.delete = function(todo){
        todoService.delete(todo).then(function(){
            $scope.todos = $scope.todos.filter(function(item){
                return item.id != todo.id;
            });
        });
    }
    $scope.toggle = function(todo,completed){
        if(angular.isDefined(completed)){
            todo.completed = completed;
        }
        todoService.update(todo);
    }

    $scope.clear = function(){
        todoService.delete().then(function(){
            $scope.todos = $scope.todos.filter(function(item){
                return !item.completed;
            });
        });
    }

    $scope.$on('$routeChangeSuccess',function(){
        $scope.status = $routeParams.status||'';
        $scope.statusFilter = $scope.status=='active'?{completed:false}:$scope.status=='completed'?{completed:true}:{};
    });

    $scope.checkAll = function(completed){
        $scope.todos.forEach(function(todo){
            if(todo.completed != completed){
                $scope.toggle(todo,completed);
            }
        });
    }

    $scope.edit = function(todo){
        $scope.editTodo = todo;
    }
    $scope.save = function(todo){
        todoService.update(todo).then(function(){
            $scope.editTodo = {};
        });
    }
});