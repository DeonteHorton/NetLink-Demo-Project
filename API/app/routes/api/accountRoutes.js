const daoClass = require('../../dao/accountDao');
const Dao = new daoClass();

const express = require('express');
const router = express.Router();

// /api/accounts
router.get('/', (req, res) => {
    Dao.getAllAccounts(req,res)
});

  router.get('/members_data', (req, res) => {
    Dao.collectMemberData(req,res)
  });

  router.get('/members_data/:id', (req, res) => {
    Dao.findMemberDatabyId(req,res)
  });

  router.get('/username/:username', (req, res) => {
  
    Dao.findByUserName(req,res)
  })

  router.get('/email/:email', (req, res) => {

    Dao.findByEmail(req,res)
  });
  
  router.get('/guardian/:guardian', (req, res) => {

    Dao.findByGuardianType(req,res)
  });

  router.get('/class/:class_id', (req, res) => {

    Dao.findByGuardian_Class_Type(req,res)
  });
  
  router.get(`/by_fname/:fname`, (req, res) => {
  
    Dao.findByFirstName(req,res)
  });
  
  router.get(`/by_lname/:lname`, (req, res) => {
  
    Dao.findByLastName(req,res)
  });

  router.get(`/age/:age`, (req, res) => {
  
    Dao.findByAge(req,res)
  });

  router.get(`/search_account/:username&:password`, (req, res) => {
  
    Dao.searchForAccount(req,res)
  });

  router.post('/create',(req,res)=>{
    console.log(req.body);
    //res.json(req.body)
    Dao.create(req,res);
  })

module.exports = router;