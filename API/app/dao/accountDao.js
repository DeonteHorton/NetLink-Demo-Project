const pool = require('../config/dbconfig');

class AccountDao {
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
    if(!req.body.username || !req.body.password || !req.body.fname || !req.body.lname || !req.body.email ){
      res.json({
        "error":true,
        "message":"Missing data"
      })
    }
    let fields = Object.keys(req.body);
    let values = Object.values(req.body);
    let sql = `INSERT INTO accounts (${fields}) VALUES (${Array(values.length - 1).fill('?').join(',')},NOW())`
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

  getAllAccounts(req,res){
    let sql = `SELECT * from accounts`;

    this.pool.query(sql, (error,rows)=>{
      if(error){
        res.json({
          "error":true,
          "message":error
        });
      };
      res.json(rows)
    })
  }
  searchForAccount(req,res){
    let sql = ` SELECT * from accounts where username = ? AND password = ?`;

    this.pool.query(sql,[req.params.username,req.params.password], (error,rows) => {
      if(error){
        res.json({
          "error":true,
          "message":error
        })
      }
      res.json(rows);
    })
  }

}

module.exports = AccountDao;