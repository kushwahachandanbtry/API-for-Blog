const express = require('express')
const router = express.Router()
const User = require('../model/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/signup', (req, res) => {
    console.log('Data from signup page')

    //signup
    User.find({email: req.body.email})
    .then(result => {
        if(result.length > 0 ) {
            return res.status(500).json({
                msg: 'email already exists'
            })
        }

        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if(err){
                console.log(err)
                return res.status(500).json({
                    error:err
                })
            }
    
            const newUser = new User({
                _id:new mongoose.Types.ObjectId,
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                password:hash
            })
            newUser.save()
            .then(result => {
                res.status(200).json({
                    newUser:result
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    error:err
                })
            })
    
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    
    
    
    
})

router.post('/login', (req, res) => {
    User.find({email:req.body.email})
    .then(user => {
        if(user.length < 1 ){
            return res.status(401).json({
                msg:'user not exists.'
            })
        }

        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(!result) {
                return res.status(401).json({
                    msg: 'invalid password'
                })
            }

            //creating token
            const token = jwt.sign({
                firstName:user[0].firstName,
                lastName:user[0].lastName,
                email:user[0].email,
                userId:user[0]._id
            },
            'chandan 123',
            {
                expiresIn: "365d"
            }
        )

        res.status(200).json({
            firstName:user[0].firstName,
            lastName:user[0].lastName,
            email:user[0].email,
            userId:user[0]._id,
            token:token
        })
        })
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router;

