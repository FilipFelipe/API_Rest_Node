var bodyParser = require('body-parser');
var express = require("express");
var cors = require('cors');
var app = express();
var router = require("./routes/routes")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/",router);

app.listen(8090,() => {
    console.log("Servidor rodando")
});
