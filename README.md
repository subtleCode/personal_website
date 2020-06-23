# 个人网站

## 需求分析

## 技术方案

### 接口设计

| 描述         | 接口             | 方法 | url参数 | 备注 |
| ------------ | ---------------- | ---- | ------- | ---- |
| 获取博客列表 | /api/blog/list   | get  | author  |      |
| 获取一篇博客 | /api/blog/detail | get  | id      |      |
| 新增一篇博客 | /api/blog/new    | post |         |      |
| 更新一篇博客 | /api/blog/update | post |         |      |
| 删除一篇博客 | /api/blog/del    | post |         |      |
| 登陆         | /api/user/login  | post |         |      |

### 数据存储

#### 用户表

| column   | datatype    | pk   | nn   | ai   | Defaul |
| -------- | ----------- | ---- | ---- | ---- | ------ |
| id       | int         | Y    | Y    | Y    |        |
| username | varchar(20) |      | Y    |      |        |
| password | varchar(20) |      | Y    |      |        |
| realname | varchar(10) |      | Y    |      |        |

#### 博客表

| column     | datatype    | pk   | nn   | ai   | Defaul |
| ---------- | ----------- | ---- | ---- | ---- | ------ |
| id         | int         | Y    | Y    | Y    |        |
| title      | varchar(50) |      | Y    |      |        |
| content    | longtext    |      | Y    |      |        |
| createtime | bigint(20)  |      | Y    |      | 0      |
| author     | varchar(20) |      | Y    |      |        |



## 目录结构

- src/router 路由控制
- src/models 数据模型
- config 存放配置文件的目录
- test 存放测试文件的目录
- public 存放静态文件（css、js、img...）的目录
- views 视图目录
- controllers 控制器目录
- app.js 项目入口文件
- package.json 包描述文件
- README.md 项目说明文件
