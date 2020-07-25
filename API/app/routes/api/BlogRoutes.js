const daoClass = require('../../dao/BlogDao')
const Dao = new daoClass();

const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    Dao.getAllBlogs(req,res)
})

router.get('/findBlog/:id',(req,res) => {
    Dao.findBlogById(req,res)
})

router.post('/create',(req,res) => {
    console.log(req.body)
    Dao.create(req,res)
})

module.exports = router;