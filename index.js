
const express = require('express');
const mongoose = require('mongoose');
const Status1 = require('./Schemas/Status1');
const app = express();
const http = require('http');
const apiLogica= require('./apiLogica');
mongoose.connect('mongodb+srv://controller:D&s&nv0lvim&nt0@cluster0.axotu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
const port = process.env.Port || 3000;

app.get('/', (req, res) => {
    console.log("Acessou a pagina");

    Status1.find().exec((err, deps) => {
        if (err) {
            res.status(500).send(err);
        } else {
            // res.status(200).send(deps);
            res.send(deps);
        }
    });
    
}
);






































const server = http.createServer(app);
server.listen(port, () => console.log('Running..'));

// let status1 = new Status1();
// status1.idAtividade = "2021-01-01";
// status1.siteNome = "BTG Pactual";
// status1.realizada = false;

// status1.save();
