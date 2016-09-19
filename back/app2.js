var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/todoApp');
var Todo = mongoose.model('Todo',new mongoose.Schema({
    title:String,
    completed:Boolean
}));
var app = express();
app.use(bodyParser.json());
app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Content-Type');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,PUT');
    if(req.method == 'OPTIONS'){//如果方法我是options的话，表示这是一个预检查请求
        res.end();
    }else{
        next();
    }
});
app.route('/todos').get(function(req,res){
    Todo.find().then(function(todos){
        res.send(todos);
    });
}).post(function(req,res){
   var todo = req.body;
    Todo.create(todo).then(function(todo){
        res.send(todo);
    });

}).delete(function(req,res){
    Todo.remove({completed:true}).then(function(){
        res.send({});
    });

});

app.route('/todos/:id').delete(function(req,res){
    Todo.remove({_id:req.params.id}).then(function(){
        res.send({});
    });
}).put(function(req,res){
    var id = req.params.id;
    var todo = req.body;
    Todo.update({_id:id},{$set:{title:todo.title,completed:todo.completed}}).then(function(todo){
        res.send(todo);
    });
});

app.listen(9090);