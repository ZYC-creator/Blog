var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var query = require('../server/sql/connect')
var sql = require('../server/sql/sql')

var indexRouter = require('./routes/index');

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

app.use('/', indexRouter);

app.get(`/login`,(req,res)=>{
    console.log(req)
    query(sql.users,(err,result,fields)=>{
        if(err) {
            console.log('SELECT ERROR:',err.message);
        }
        res.send({result})
    })
})
module.exports = app;
