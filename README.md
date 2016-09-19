# 1. 初始化项目
```
npm init -y
bower init 
```
# 2. 编辑bower配置文件 .bowerrc
```
{
  "directory":"./front/lib"
}
```

# 3. 安装前端依赖的框架
```
bower install bootstrap angular angular-route angular-resource --save
```

# 4.安装后端依赖的框架
```
npm install express mongoose --save
```