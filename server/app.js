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
app.use(bp.urlencoded({extended:false}))
app.use('/', indexRouter);

app.get(`/register`,(req,res)=>{
    console.log(req)
    query(sql.users,(err,result,fields)=>{
        if(err) {
            console.log('SELECT ERROR:',err.message);
        }
        res.send({result})
    })
})

app.post('/login',(req,res)=>{
    const sql = `SELECT username,password FROM blog.users where username = '${req.body.name}' and password='${req.body.password}'`;
    // const sql = 'select * from blog.users'
    query(sql,(err,results)=>{
        if(err) {
            res.send({msg:'未知错误'})
        } 
        if(results.length === 0){
            res.send({
                status:'success',
                msg :'用户名或密码错误',
                results: 0
            })
        }
        else {
            res.send({
                status: 'success',
                msg:'成功',
                results
            })
        }
    })
})
module.exports = app;
