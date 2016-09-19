var express = require('express');
var app = express();
var todos = [
    {id:1,title:'任务1'},{id:2,title:'任务2'}
];
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
  res.send(todos);
});
app.listen(9090);