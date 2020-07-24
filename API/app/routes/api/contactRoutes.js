const daoClass = require('../../dao/contactDao');
const Dao = new daoClass();

const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {

    Dao.getAllcontacts(req,res)
  });

  router.get('/name/:name', (req, res) => {
  
    Dao.findByName(req,res)
  })

  router.get('/email/:email', (req, res) => {

    Dao.findByEmail(req,res)
  });

  router.get(`/by_id/:id`, (req, res) => {
  
    Dao.findById(req,res)
  });

  router.get(`/user_comment/:name`, (req, res) => {
  
    Dao.findUserComment(req,res)
  });

  router.post('/create',(req,res)=>{
    console.log(req.body);
    //res.json(req.body)
    Dao.create(req,res);
  })

module.exports = router;