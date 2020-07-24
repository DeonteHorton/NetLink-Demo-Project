const pool = require('../config/dbconfig')

class ChatDao {
  constructor(){
      this.pool = pool
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
    
    getAllMessages(req,res){
        let sql ='SELECT * from messages ';
        
        this.pool.query(sql, function (error,rows){
            if (error) {
            res.json({
                "error":true,
                "message":error
            })
            };
            res.json(rows)
        })
    }

  create(req,res){
    // required min data
    if (!req.body.message) {
      res.json({
        "error":true,
        "message":"Missing Data"
      })
    };

    let fields = Object.keys(req.body);
    let values = Object.values(req.body);
          
      
    let sql = `INSERT into messages (${fields.join(',')}) values (${Array(values.length - 1).fill('?').join(',')}, NOW())`

    this.pool.query(sql,values,
      function (error,rows){
      if (error) {
        res.json({
          "error":true,
          "message":error
        })
      };
      res.json(rows)
    })
  
  }
  
  
  findByUserName(req,res){
    let sql =`SELECT * from account where user_name = ?`

    this.pool.query(sql,[req.params.username], function (error,rows){
        if (error) {
          res.json({
            "error":true,
            "message":error
          })
        };
        res.json(rows)
    })
  }
    
}
  
module.exports = ChatDao;