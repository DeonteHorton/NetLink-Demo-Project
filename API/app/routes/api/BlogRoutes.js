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

router.get('/searchByUser/:author',(req,res) => {
    Dao.findBlogByUserName(req,res)
})

router.post('/update/:id',(req,res) => {
    console.log(req.body)
    Dao.updateBlog(req,res,req.params.id)
})

router.post('/delete/:id',(req,res) => {
    console.log(req.body)
    Dao.deleteBlog(req,res)
})

router.post('/create',(req,res) => {
    console.log(req.body)
    Dao.create(req,res)
})

module.exports = router;