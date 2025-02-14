require("dotenv").config();

const express = require('express');
const cors = require('cors');
const {readLogs, ipCount, traffic, getIPS, getTopHours} = require('./parser');
const app = express();

const PORT = process.env.PORT;

app.use(cors({
    origin:'*',
    methods: ["GET","POST"],
    allowedHeaders:["Content-Type","Authorization"],
}));

readLogs().then(()=>console.log("Log file Processed!"));

app.get("/histogram/ips", (req,res)=>{
    res.json(ipCount);
});

app.get("/histogram/traffic", (req,res)=>{
    res.json(traffic);
});

app.get("/top-ips", (req,res)=>{
    res.json(getIPS());
});

app.get("/top-hours", (req,res)=>{
    res.json(getTopHours());
});

app.listen(PORT, ()=>{
    console.log("Server is running at http://localhost:"+PORT);
});