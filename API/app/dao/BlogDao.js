const pool = require('../config/dbconfig');
const { json } = require('body-parser');

class BlogDao {
  constructor(){
    this.pool = pool;
  }

  run = (req,res,sql)  => {
    pool.query(sql,function (error,rows) {
      if (error) {
        res.json({
          "error":true,
          "message":error
        })
      };
      res.json(rows)
    })
  };
  
  create(req,res){
    let fields = Object.keys(req.body);
    let values = Object.values(req.body);
    let sql = `INSERT INTO blogs (${fields}) VALUES (${Array(values - 3)}, NOW(), NOW())`

    this.pool.query(sql,values,
      (error,rows)=>{
      if (error) {
        res.json({
          "error":true,
          "message":error
        })
      };
      res.json(rows)
    })
  }

  getAllBlogs(req,res){
    let sql = `SELECT * from blogs`;

    this.pool.query(sql,(error,rows) =>{
       if(error){
         res.json({
           "error":true,
           "message":error
         })
       }
       res.json(rows)
    })
  }

  findBlogById(req,res){
    let sql = `SELECT * from blogs where id = ?`;

    this.pool.query(sql,[req.params.id],(error,rows) =>{
       if(error){
         res.json({
           "error":true,
           "message":error
         })
       }
       res.json(rows)
    })
  }
}
module.exports = BlogDao;