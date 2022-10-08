var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var query = require('../server/sql/connect')
var bp = require('body-parser')
var sql = require('../server/sql/sql')

var indexRouter = require('./routes/index');
const e = require('express');

var app = express();

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', ' 3.2.1')
    req.method == "OPTIONS" ? res.send(200) : next()
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bp.urlencoded({ extended: false }))
app.use('/', indexRouter);

app.post('/register', (req, res) => {
    const sql = `insert into blog.users(username,password,gender,birthday) values ('${req.body.username}','${req.body.password}','${req.body.gender}','${req.body.birthday}')`
    query(sql, (err, result, fields) => {
        if (err) {
            res.send({ msg: '注册失败' })
        }
        res.send('注册成功')
    })
})

app.post('/login', (req, res) => {
    const sql = `SELECT username,password FROM blog.users where username = '${req.body.name}' and password='${req.body.password}'`;
    query(sql, (err, results) => {
        if (err) {
            res.send({ msg: '未知错误' })
        }
        if (results.length === 0) {
            res.send({
                status: 'success',
                msg: '用户名或密码错误',
                results: 0
            })
        }
        else {
            res.send({
                status: 'success',
                msg: '成功',
                results
            })
        }
    })
})

app.get('/article', (req, res) => {
    query(sql.article, (err, results, field) => {
        if (err) {
            res.send('查询失败')
        }
        res.send(
            {
                status: 200,
                msg: 'success',
                results
            })
    })
})

app.get('/articleDetail', (req, res) => {
    const sql = `SELECT * from blog.article where id='${req.query.id}'`
    query(sql, (err, results, field) => {
        if (err) {
            res.send('查询失败')
        }
        res.send(
            {
                status: 200,
                msg: 'success',
                results
            })
    })
})

app.get('/searchArticle', (req, res) => {
    let sql = ''
    if (req.query.content == '') {
        sql = 'SELECT * FROM blog.article'
    } else {
        sql = `SELECT * FROM blog.article WHERE author LIKE '%${req.query.content}%' or title LIKE '%${req.query.content}%' or content LIKE '%${req.query.content}%' or category LIKE '%${req.query.content}%'`
    }
    query(sql, (err, results) => {
        if (err) {
            res.send('查询失败')
        }
        res.send(
            {
                status: 200,
                msg: 'success',
                results
            })
    })
})

app.get('/users', (req, res) => {
    query(sql.users, (err, results, field) => {
        if (err) {
            res.send('查询失败')
        }
        res.send(
            {
                status: 200,
                msg: 'success',
                results
            })
    })
})

app.delete('/deleteUsers', (req, res) => {
    const sql = `DELETE from blog.users WHERE username = '${req.query.username}'`
    query(sql, (err, results) => {
        if (err) {
            res.send('删除失败')
        }
        res.send({
            status: 200,
            msg: 'success',
            results
        })
    })
})

app.get('/getUsers', (req, res) => {
    const sql = `SELECT * from blog.users where username='${req.query.username}'`
    query(sql, (err, results, field) => {
        if (err) {
            res.send('查询失败')
        }
        res.send(
            {
                status: 200,
                msg: 'success',
                results
            })
    })
})


app.post('/modifyUsers', (req, res) => {
    const sql = `Update blog.users set username='${req.body.username}',password='${req.body.password}',gender='${req.body.gender}',birthday='${req.body.birthday}' where username='${req.body.username}'`
    query(sql, (err, results) => {
        if (err) {
            res.send({ msg: '未知错误' })
        }
        else {
            res.send({
                status: 'success',
                msg: '成功',
                results
            })
        }
    })
})

app.delete('/deleteArticle', (req, res) => {
    const sql = `DELETE from blog.article WHERE title = '${req.query.title}'`
    query(sql, (err, results) => {
        if (err) {
            res.send('删除失败')
        }
        res.send({
            status: 200,
            msg: 'success',
            results
        })
    })
})
app.get('/getArticle', (req, res) => {
    const sql = `SELECT * from blog.article where title='${req.query.title}'`
    query(sql, (err, results, field) => {
        if (err) {
            res.send('查询失败')
        }
        res.send(
            {
                status: 200,
                msg: 'success',
                results
            })
    })
})

app.post('/modifyArticle', (req, res) => {
    const sql = `Update blog.article set author='${req.body.author}',title='${req.body.title}',content='${req.body.content}',createtime='${req.body.createtime}',updatetime='${req.body.updatetime}',views='${req.body.views}',category='${req.body.category}' where id='${req.body.id}'`
    query(sql, (err, results) => {
        if (err) {
            res.send({ msg: '未知错误' })
        }
        else {
            res.send({
                status: 'success',
                msg: '成功',
                results
            })
        }
    })
})

app.post('/addArticle', (req, res) => {
    const sql = `insert into blog.article(author,title,content,createtime,updatetime,views,category) values ('${req.body.author}','${req.body.title}','${req.body.content}','${req.body.createtime}','${req.body.updatetime}','${req.body.views}','${req.body.category}')`
    query(sql, (err, result, fields) => {
        if (err) {
            res.send({ msg: '发表失败' })
        }
        res.send('发表成功')
    })
})

app.get('/category', (req, res) => {
    query(sql.category, (err, results, fields) => {
        if (err) {
            res.send(err)
        } else {
            res.send({
                status: 'success',
                msg: '成功',
                results
            })
        }
    })
})

app.delete('/deleteCategory', (req, res) => {
    const sql = `DELETE from blog.category WHERE category = '${req.query.category}'`
    query(sql, (err, results) => {
        if (err) {
            res.send('删除失败')
        }
        res.send({
            status: 200,
            msg: 'success',
            results
        })
    })
})
app.get('/getCategory', (req, res) => {
    const sql = `SELECT * from blog.category where category='${req.query.category}'`
    query(sql, (err, results, field) => {
        if (err) {
            res.send('查询失败')
        }
        res.send(
            {
                status: 200,
                msg: 'success',
                results
            })
    })
})

app.post('/modifyCategory', (req, res) => {
    const sql = `Update blog.category set category='${req.body.category}' where id='${req.body.id}'`
    query(sql, (err, results) => {
        if (err) {
            res.send({ msg: '未知错误' })
        }
        else {
            res.send({
                status: 'success',
                msg: '成功',
                results
            })
        }
    })
})

app.post('/addCategory', (req, res) => {
    const sql = `insert into blog.category(category) values ('${req.body.category}')`
    query(sql, (err, result, fields) => {
        if (err) {
            res.send({ msg: '添加失败' })
        }
        res.send('添加成功')
    })
})

app.post('/addViews',(req,res)=>{
    const sql = `update blog.article set views='${req.body.views}' where id=' ${req.body.id}'`
    query(sql,(err,results)=>{
        if(err){
            res.send('未知错误')
        }
        res.send({
            msg:'成功',
            status:200,
            results
        })
    })
})
module.exports = app;
