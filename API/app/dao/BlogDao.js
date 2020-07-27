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

  updateBlog(req,res){
    //requires all data
    let fields = Object.keys(req.body);
    let values = Object.values(req.body);

    let sql = `UPDATE blogs SET ${fields.join('=?,')} = ?,created_on=NOW(),time_created=NOW() Where id = ?`
    
    this.pool.query(sql,[...values,req.params.id] ,(error,rows)=>{
      if (error) {
        res.json({
          "error":true,
          "message":error
        })
      };
      res.json(rows)
    })
  }

  deleteBlog(req,res){
    let sql = `UPDATE blogs set deleted_on = NOW() WHERE id = ?`;

    this.pool.query(sql,[req.params.id], function (error,rows){
      if (error) {
        res.json({
          "error":true,
          "message":error
        });
      };
      res.json(rows)
    })
  }

  getAllBlogs(req,res){
    let sql = `SELECT * from blogs where deleted_on IS NULL`;

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
    let sql = `SELECT * from blogs where id = ? AND deleted_on IS NULL`;

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

  findBlogByUserName(req,res){
    let sql = `SELECT * from blogs where author = ? AND deleted_on IS NULL`;

    this.pool.query(sql,[req.params.author],(error,rows) =>{
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