var Express = require("express");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
var Mongoose = require("mongoose") ;
const multer=require("multer");

var app=Express();
app.use(cors());


var CONNECTION_STRING="mongodb+srv://dinis:D1234@cluster0.mjrxjys.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var DATEBASENAME="products";

var database;

app.listen(5038, () => {
    console.log("teste passo #1");
    MongoClient.connect(CONNECTION_STRING, (error, client) => {
        if (error) {
            console.error("Failed to connect to the database");
            console.error(error);
            return;
        }        
        database = client.db(DATEBASENAME);
        console.log("Conectado ao MongoDB");
    });
    //console.log("teste passo #2");
});
/*routes*/
/*
.find({nome do campo da collection : false ou true })
.count({name: "sam"});
*/
//route que amostra os produtos que tem newarrival como true
app.get('/products/newarrival', (request, response) => {
    database.collection("products").find({newarrival: true }).toArray((error, result)=> {
        response.send(result);
    });
});

//route que amostra os produtos que tem favourite como true
app.get('/products/favourite', (request, response) => {
    database.collection("products").find({favourite: true }).toArray((error, result)=> {
        response.send(result);
    });
});

//route pra ver oque existe no newsletter
app.get('/newsletter/get', (request, response) => {
    database.collection("newsletter").find({})/**/.toArray((error, result)=> {
        response.send(result);
    });
});


//route que manda preenche o campo em newsletter
app.post('/newsletter/post', multer().none(), (request , response) => {
        database.collection("newsletter").insertOne({
            email : request.body.novoGmail
        });
        response.json("Adicionado");
        console.log("adicionado") ;
});

/*app.delete('/api/todoapp/DeleteNotes', (request, response) => {
        database.collection("todoappcollection").deleteOne({
            description: request.query.id
        });
        response.json("Apagado");
});*/
