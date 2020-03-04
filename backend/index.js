// Third party modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require("morgan");
const cors = require('cors');

// Middle ware
app.use(cors());
app.use(morgan("dev"));

// body-parser
app.use(express.json());

// Router
const infoRouter = require('./router');
app.use("/info", infoRouter);

// Listen port
app.listen(5000, ()=> {
    console.log("Server Started on 5000");
})

// DB connection
mongoose.connect('mongodb://localhost:27017/mernCRUD', {useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
    if(!err){
        console.log('DB Connected Successfully!!!');
    }
})