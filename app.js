const express = require('express')
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.listen(3000, () => {
    console.log("server is runig")
})

require('./routes')(app);

app.get("/",(req,res) => {
    console.log("yess")
    res.json("nac")
})

