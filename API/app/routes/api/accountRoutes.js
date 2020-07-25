const daoClass = require('../../dao/accountDao');
const Dao = new daoClass();

const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
  Dao.getAllAccounts(req,res)
})

router.post('/create',(req,res) => {
  console.log(req.body)
  Dao.create(req,res);
})