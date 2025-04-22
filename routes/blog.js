const express = require('express')
const Blog = require('../model/blog')
const router = express.Router()
const mongoose = require('mongoose')
const checkAuth = require('../middleware/checkAuth')
const jwt = require('jsonwebtoken')

//add blog
router.post('/', checkAuth, (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const verify = jwt.verify(token, 'chandan 123')

    const newBlog = new Blog({
        _id:new mongoose.Types.ObjectId,
        userId:verify.userId,
        title:req.body.title,
        imageUrl:req.body.imageUrl,
        categoryId:req.body.categoryId,
        categoryTitle:req.body.categoryTitle,
        blogDetail:req.body.blogDetail,
        userName:verify.firstName + " " + verify.lastName
    })
    newBlog.save()
    .then(result => {
        res.status(200).json({
            newBlog:result
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

//get all blog
router.get('/getAllBlog', (req, res) => {
    Blog.find()
    .select('_id title imageUrl blogDetail categoryId categoryTitle userName')
    .then(result => {
        res.status(200).json({
            blogList:result
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

//get blogs by category
router.get('/getByCategory/:id', (req, res) => {
    Blog.find({categoryId:req.params.id})
    .select('_id title imageUrl blogDetail categoryId categoryTitle userName')
    .then(result => {
        res.status(200).json({
            blogList:result
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

//get own blogs
router.get('/', checkAuth, (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const verify = jwt.verify(token, 'chandan 123')
    Blog.find({userId:verify.userId})
    .select('_id title imageUrl blogDetail categoryId categoryTitle userName')
    .then(result => {
        res.status(200).json({
            blogList:result
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

//delete own blog
router.delete('/:id', checkAuth, (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const verify = jwt.verify(token, 'chandan 123')
    Blog.deleteOne({_id:req.params.id, userId:verify.userId})
    .then(result => {
        if(result.deletedCount === 0)
        {
            return res.status(401).json({
                msg:'somthing went wrong'
            })
        }
        res.status(200).json({
            msg:'delete success'
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

//update own blog
router.put('/:id', checkAuth, (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token, 'chandan 123');

    Blog.find({ _id: req.params.id, userId: verify.userId })
    .then(result => {
        if (result.length === 0) {
            return res.status(400).json({
                msg: 'Something is wrong'
            });
        }

        Blog.findOneAndUpdate(
            { _id: req.params.id, userId: verify.userId },
            {
                $set: {
                    userId:verify.userId,
                    title:req.body.title,
                    imageUrl:req.body.imageUrl,
                    categoryId:req.body.categoryId,
                    categoryTitle:req.body.categoryTitle,
                    blogDetail:req.body.blogDetail,
                    userName:verify.firstName + " " + verify.lastName
                }
            },
            { new: true } // this will return the updated document
        )
        .then(result => {
            res.status(200).json({
                blogList: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: 'Unauthorized update error'
            });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            err: 'Data not found'
        });
    });
});
module.exports = router;
