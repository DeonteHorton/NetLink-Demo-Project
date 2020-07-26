const pool = require('../config/dbconfig');

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
      //requires all data
      if(!req.body.title || !req.body.blog || !req.body.author){
        res.json({
          "error":true,
          "message":"Missing data"
        })
      }

    let fields = Object.keys(req.body);
    let values = Object.values(req.body);
    let sql = `INSERT INTO blogs (${fields}) VALUES (${Array(values.length - 2).fill('?').join(',')},NOW(),NOW())`

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