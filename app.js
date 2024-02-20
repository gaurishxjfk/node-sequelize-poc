const express = require('express')

const app = express();


app.listen(3000, () => {
    console.log("server is runig")
})

require('./routes')(app);

app.get("/",(req,res) => {
    console.log("yess")
    res.json("nac")
})

