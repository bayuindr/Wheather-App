require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const {User, Destinasion, Comment} = require('./models')
const { decrypt } = require('./helper/bcrypt')
const { authentication } = require('./middleware/Auth')
const sendMail = require('./helper/nodeMailer')

app.post('/login', (req, res, next)=>{

    User.findOne({
        where : {email : req.body.email}
    })
    .then(data =>{
        if(data && decrypt(req.body.password, data.password)){
            const access_token = jwt.sign({id : data.id}, process.env.JWT_SECRET)
            res.status(201).json({
                "access_token" :access_token,
                "email" : data.email
            })
            sendMail(data.email, 'Login App Wheather', 'your email is logged in the weather app')
        }
    })
    .catch(err =>{
        console.log(err)
        res.status(400).json(err)
    })
})

app.post('/register', (req, res, next)=>{
    const data = {
        email : req.body.email,
        password : req.body.password
    }

    User.create(data)
    .then(data =>{
        res.status(201).json({
            "id": data.id,
            "email": data.email
        })
    })
    .catch(err =>{
        res.status(400).json(err)
    })
})

app.use(authentication)

app.get('/destinasions/:city', (req, res, next)=>{
    let city = req.params.city
    // console.log(city)
    Destinasion.findAll({
        where : {city}
    })
    .then(data =>{
        res.status(200).json(data)
    })
    .catch(err =>{
        res.status(500).json(err)
    })
})

app.post('/comments', (req, res, next)=>{
    const data = {
        UserId : req.UserId,
        komentar : req.body.komentar
    }

    Comment.create(data)
    .then(data =>{
        res.status(201).json({
            "komentar": data.komentar,
        })
    })
})

app.get('/comments', (req, res, next)=>{
    // let city = req.params.city
    // console.log(city)
    Comment.findAll({
        include: [User]
    })
    .then(data =>{
        res.status(200).json(data)
    })
    .catch(err =>{
        res.status(500).json(err)
    })
})







app.listen(port, ()=> console.log('run app'))