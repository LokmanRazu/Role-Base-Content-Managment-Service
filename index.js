const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'}); 
const app = express();
app.use(express.json())
//    Router
const userRoutes = require('./routers/userRoutes');
const userAuthRoutes = require('./routers/userAuthRoutes');
const userRoleRoutes = require('./routers/roleRouters')



app.use('/api/v1/users',userRoutes);
app.use('/api/v1/userAuth',userAuthRoutes);
app.use('/api/v1/roles',userRoleRoutes);


app.all('*',(req,res,next)=>{
    res.status(404).json({
        status:'fail',
        message:`Can't find ${req.originalUrl} on this server`
    })
});

app.use((err,req,res,next)=>{
err.statusCode = err.statusCode || 500;
err.status = err.status || 'error';

res.status(err.statusCode).json({
    status: err.status,
    message: err.message
});
});


const db = process.env.DATABASE.replace('<password>',process.env.PASSWORD);
mongoose.connect(db,{
    useNewUrlParser:true              
})
.then(con =>{
    console.log('DB Connection successfull')
});

const PORT = 8000;
app.listen(PORT,()=>{
    console.log(`app is running in ${PORT}`)
});