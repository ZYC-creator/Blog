
const mysql = require('mysql')
let pool = mysql.createPool({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'admin123',
    database:'blog' //数据库名称
})

let query = (sql,callback) => {
    pool.getConnection((err,conn)=>{
        if(err) {
            callback(err,null,null)
        } else {
            conn.query(sql,(results,values,fields)=>{
                conn.release();
                callback(results,values,fields)
            })
        }
    })
}

module.exports = query