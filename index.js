const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT
const url = process.env.MONGODB_URL
const User = require('./User.js')

const app = express()
app.use(cors({
    origin: '*',
    methods: ['GET','POST','PUT','PATCH','DELETE'],
    credentials: true
}))
app.use(express.json())

mongoose.connect(url)
.then(()=>console.log('momgodb has been connected'))
.catch(()=>console.log('mongodb give some error'))

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.post("/data", async (req, res) => {
    try {
        const { name, phoneNumber, email } = req.body;
        const newUser = await User.create({
            name: name,
            email: email,
            phoneNumber: phoneNumber
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser); 
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ Message: "INTERNAL SERVER ERROR" });
    }
});

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})
