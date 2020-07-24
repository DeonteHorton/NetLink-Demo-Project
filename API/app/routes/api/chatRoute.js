const daoClass = require('../../dao/chatDao');
const Dao = new daoClass();

const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {

    Dao.getAllMessages(req,res)
  });

  router.get('/name/:name', (req, res) => {
  
    Dao.findByUserName(req,res)
  })

  router.post('/create',(req,res)=>{
    console.log(req.body);
    //res.json(req.body)
    Dao.create(req,res);
  })

module.exports = router;