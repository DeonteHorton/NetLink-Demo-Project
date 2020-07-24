const pool = require('../config/dbconfig')

class AccountDao {
  constructor(){
      this.pool = pool
  }
  
  create(req,res){
    // required min data
    if (!req.body.email || !req.body.username || !req.body.password || !req.body.fname || !req.body.lname || !req.body.age || !req.body.guardian_id || !req.body.class_id) {
      res.json({
        "error":true,
        "message":"Missing Data"
      })
    };

    let fields = Object.keys(req.body);
    let values = Object.values(req.body);
          
      
    let sql = `INSERT into account (${fields.join(',')}) values (${Array(values.length - 2).fill('?').join(',')},5,NOW())`

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

  getAllAccounts(req,res){
    let sql ='SELECT * from account ';
    
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

  searchForAccount(req,res){
    let sql ='SELECT * from account where username = ? AND password = ? ';
    
    this.pool.query(sql,[req.params.username, req.params.password], function (error,rows){
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
    let sql =`SELECT * from account where username = ?`

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


  findByFirstName(req,res){
    let sql = `SELECT * from account WHERE fname = ?`;

    this.pool.query(sql,[req.params.fname], function (error,rows){
      if (error) {
        res.json({
          "error":true,
          "message":error
        })
      };
      res.json(rows)
    })
  }

  findByLastName(req,res){
    let sql = `SELECT * from account WHERE lname = ?`;

    this.pool.query(sql,[req.params.lname], function (error,rows){
      if (error) {
          res.json({
            "error":true,
            "message":error
          })
      };
      res.json(rows)
    })
  }
  
  findByAge(req,res){
    let sql = `SELECT * from account WHERE age = ?`;

    this.pool.query(sql,[req.params.age], function (error,rows){
      if (error) {
          res.json({
            "error":true,
            "message":error
          })
      };
      res.json(rows)
    })
  }
  findByEmail(req,res){
    let sql = `SELECT * from account WHERE email = ? `;

    this.pool.query(sql,[req.params.email], function (error,rows){
      if (error) {
        res.json({
          "error":true,
          "message":error
        })
      };
      res.json(rows)
    })
  }
  findByGuardianType(req,res){
    let sql = `SELECT * from account WHERE guardian_id = ? `;

    this.pool.query(sql,[req.params.guardian], function (error,rows){
      if (error) {
        res.json({
          "error":true,
          "message":error
        })
      };
      res.json(rows)
    })
  }

  findByGuardian_Class_Type(req,res){
    let sql = `SELECT * from account WHERE class_id = ? `;

    this.pool.query(sql,[req.params.class_id], function (error,rows){
      if (error) {
        res.json({
          "error":true,
          "message":error
        })
      };
      res.json(rows)
    })
  }

  collectMemberData(req,res){
    let sql = `SELECT a.id, a.fname,a.lname,a.username,a.email,a.created_on, 
    r.rank as rank,
    g.guardian_type as guardian,
    c.class as g_class
    from account a
    JOIN ranking r ON a.rank_id= r.id
    JOIN guardians g ON a.guardian_id = g.id
    JOIN classes c ON a.class_id = c.id
    ORDER BY r.id ASC;`;

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

  findMemberDatabyId(req,res){
    let sql = `SELECT a.id, a.fname,a.lname,a.username,a.age,a.email,a.created_on, 
    r.rank as rank,
    g.guardian_type as guardian,
    c.class as g_class
    from account a
    JOIN ranking r ON a.rank_id= r.id
    JOIN guardians g ON a.guardian_id = g.id
    JOIN classes c ON a.class_id = c.id
    WHERE a.id = ?;`;

    this.pool.query(sql,[req.params.id], function (error,rows){
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
  
module.exports = AccountDao;