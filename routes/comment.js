const express = require('express')
const Comment = require('../model/comment')
const router = express.Router()
const mongoose = require('mongoose')
const checkAuth = require('../middleware/checkAuth')
const jwt = require('jsonwebtoken')


//new comment
router.post('/', checkAuth, (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const verify = jwt.verify(token, 'chandan 123')

    const newComment = new Comment({
        _id:new mongoose.Types.ObjectId,
        userId:verify.userId,
        userName: verify.firstName + " " + verify.lastName,
        comment:req.body.comment,
        blogId:req.body.blogId
    })
    newComment.save()
    .then(result => {
        res.status(200).json({
            newComment:result
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})


//edit comment
router.put('/:id', checkAuth, (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token, 'chandan 123');

    Comment.find({ _id: req.params.id, userId: verify.userId })
    .then(result => {
        if (result.length === 0) {
            return res.status(400).json({
                msg: 'Something is wrong'
            });
        }

        Comment.findOneAndUpdate(
            { _id: req.params.id, userId: verify.userId },
            {
                $set: {
                    userId:verify.userId,
                    userName: verify.firstName + " " + verify.lastName,
                    comment:req.body.comment,
                    blogId:req.body.blogId
                }
            },
            { new: true } // this will return the updated document
        )
        .then(result => {
            res.status(200).json({
                category: result
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


//delete comment
router.delete('/:id', (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const verify = jwt.verify(token, 'chandan 123')

    Comment.deleteOne({_id: req.params.id, userId:verify.userId})
    .then(result => {
        if(result.deletedCount == 0 )
        {
            return res.status(401).json({
                msg:'something is wrong'
            })
        }
        res.status(200).json({
            msg:'deleted success'
        })
    })
    .catch(err => {
        console.log(err)
        res.status(400).json({
            error: err
        })
    })
})


//get all comment for particular blog
router.get('/getAllComment/:blogId', (req, res) => {
    Comment.find({blogId:req.params.blogId})
    .select("_id userId userName comment blogId")
    .then(result => {
        res.status(200).json({
            comment:result
        })
    })
    .then(err => {
        console.log(err)
        res.status(400).json({
            error:err
        })
    })
})

module.exports = router;
