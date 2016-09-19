angular.module('todoApp').factory('todoService',function($resource){
    /**
     * query 查询所有的资源
     * get 查询单个资源
     * save 保存资源
     * remove 删除资源
     * delete  删除资源
     */
    var resource = $resource('http://localhost:9090/todos/:id',null,{
       update:{
           method:'PUT'
       }
   });
    return {
        query:function(){
            return resource.query().$promise;
        },
        save:function(todo){
            return resource.save(todo).$promise;
        },
        delete:function(todo){
            return resource.delete(todo).$promise;// /todos/1   /todos
        },
        update:function(todo){
            return resource.update({id:todo.id},todo).$promise;
        }
    }
});