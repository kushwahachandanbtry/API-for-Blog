const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const userRoute = require('../Blog API/routes/user')
const blogRoute = require('../Blog API/routes/blog')
const commentRoute = require('../Blog API/routes/comment')
const categoryRoute = require('../Blog API/routes/category')

mongoose.connect('mongodb+srv://chandan:chandan123@cluster0.drqr68n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(res=>{console.log("Connected to database")})
.catch(err=>{console.log("Connection failed: ", err)})

app.use(bodyParser.json())

//routes
app.use('/user', userRoute)
app.use('/category', categoryRoute)
app.use('/blog', blogRoute)
app.use('/comment', commentRoute)

module.exports = app;
