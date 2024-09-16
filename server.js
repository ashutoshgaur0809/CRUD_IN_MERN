const express = require("express");
const colors = require("colors");
const morgan = require("morgan")
const app = express();

const empRoutes = require('./routes/emp.js');
const dotenv = require("dotenv");
const msPool = require("./config/db");



// configure .env
dotenv.config();
const PORT = process.env.PORT || 8000;

// moiddleware 

app.use(express.json());
app.use(morgan("dev"));

// routes 

app.use("/api/v1/emp",empRoutes);

app.get("/test",(req,res) => {
    res.status(200).send("<h1> Done </h1>")
});

app.get("",(req,res) => {
    res.status(200).send("<h1> Done </h1>")
});
app.get("/error",(req,res) => {
    res.status(400).send({msg:"data not found"});
});

// condtion listen

msPool
.query("select 1")
.then(() => {
    console.log("Db connected!!!!".bgMagenta.white);
    // listen
    app.listen(PORT,() => {
        console.log(`Server Run on Port -> ${PORT}`.bgMagenta.white);
    });

})
.catch((error) => {
    console.log(error);
});

