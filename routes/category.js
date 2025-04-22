const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const checkAuth = require('../middleware/checkAuth')
const category = require('../model/category')
const jwt = require('jsonwebtoken')

//add category
router.post('/', checkAuth, async (req, res) => {
    try {
        const existingCat = await category.findOne({ title: req.body.title });

        if (existingCat) {
            return res.status(400).json({
                msg: "Title already exists"
            });
        }

        const token = req.headers.authorization.split(' ')[1]
        const verify = jwt.verify(token, 'chandan 123')

        const newCategory = new category({
            _id: new mongoose.Types.ObjectId(),
            userId: verify.userId,
            title: req.body.title,
            imageUrl: req.body.imageUrl
        });

        const result = await newCategory.save();

        res.status(200).json({
            newCategory: result
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
});


//get all category
router.get('/', checkAuth, (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const verify = jwt.verify(token, 'chandan 123')
    category.find({userId: verify.userId})
    .select("_id userId title imageUrl")
    .then(result => {
        res.status(200).json({
            categoryList:result
        })
    })
    .catch(err =>{
        console.log(err)
        .res.status(400).json({
            error:err
        })
    })
})

//delete category
router.delete('/:id', (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const verify = jwt.verify(token, 'chandan 123')

    category.deleteOne({_id: req.params.id, userId:verify.userId})
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

//update category
router.put('/:id', checkAuth, (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token, 'chandan 123');

    category.find({ _id: req.params.id, userId: verify.userId })
    .then(result => {
        if (result.length === 0) {
            return res.status(400).json({
                msg: 'Something is wrong'
            });
        }

        category.findOneAndUpdate(
            { _id: req.params.id, userId: verify.userId },
            {
                $set: {
                    userId: verify.userId,
                    title: req.body.title,
                    imageUrl: req.body.imageUrl
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


module.exports = router;

