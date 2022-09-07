const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'}); 
const app = express();
app.use(express.json())
//    Router
const userRoutes = require('./routers/userRoutes')



app.use('/api/v1/users',userRoutes);


app.all('*',(req,res,next)=>{
    res.status(404).json({
        status:'fail',
        message:`Can't find ${req.originalUrl} on this server`
    })
});



const db = process.env.DATABASE.replace('<password>',process.env.PASSWORD);
console.log(db);
mongoose.connect(db,{
    useNewUrlParser:true              
})
.then(con =>{
    console.log('DB Connection successfull')
});

const PORT = 8000;
app.listen(PORT,()=>{
    console.log(`app is running in ${PORT}`);
});