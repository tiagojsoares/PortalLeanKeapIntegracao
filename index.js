
const express = require('express');
const mongoose = require('mongoose');
const Status1 = require('./Schemas/Status1');
const Status2 = require('./Schemas/Status2');
const Status3 = require('./Schemas/Status3');
const Status4 = require('./Schemas/Status4');
const app = express();
const http = require('http');
const apiLogica = require('./apiLogica');
mongoose.connect('mongodb+srv://controller:D&s&nv0lvim&nt0@cluster0.glt6q.mongodb.net/PortalIntegracao?retryWrites=true&w=majority');
// mongoose.connect('mongodb://mongodb:27017/Controllerbms_Projetos');

const port = process.env.Port || 3000;

app.get('/', (req, res) => {
    //http://localhost:3000/?di=2021-12-01&df=2021-12-08&s=THERA%20OFFICE
    console.log("Acessou a pagina");
    // console.log(req.query);
    let di = req.query.di;
    let df = req.query.df;
    let s = req.query.s;
    let AtividadesQuant = {};

    Status1.find({ dataPrevista: { $gte: di, $lte: df }, siteNome: s }).exec((err, deps) => {
        if (err) {
            res.status(500).send(err);
        } else {
            let status1 = factoryContrato(s, deps.length);
            AtividadesQuant.status1 = status1;

            // res.status(200).send(deps);
            Status2.find({ dataPrevista: { $gte: di, $lte: df }, siteNome: s }).exec((err, deps) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    let status2 = factoryContrato(s, deps.length);
                    AtividadesQuant.status2 = status2;
                    Status3.find({ dataPrevista: { $gte: di, $lte: df }, siteNome: s }).exec((err, deps) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            let status3 = factoryContrato(s, deps.length);
                            AtividadesQuant.status3 = status3;
                            Status4.find({ dataPrevista: { $gte: di, $lte: df }, siteNome: s }).exec((err, deps) => {
                                if (err) {
                                    res.status(500).send(err);
                                } else {
                                    let status4 = factoryContrato(s, deps.length);
                                    AtividadesQuant.status4 = status4;
                                    // console.log(AtividadesQuant);
                                    // res.status(200).send(deps);
                                    res.send(AtividadesQuant);
                                }
                            });
                        }
                    });
                }
            });

        }
    });

}
);


//Factory

function factoryContrato(siteNome, quant) {
    let contrato = {};
    contrato.siteNome = siteNome;
    contrato.quant = quant;
    // contrato.month = month;
    // contrato.year = year;
    // contrato.days = days;
    // contrato.token = token;
    return contrato;
}


































const server = http.createServer(app);
server.listen(port, () => console.log('Running..'));

// let status1 = new Status1();
// status1.idAtividade = "2021-01-01";
// status1.siteNome = "BTG Pactual";
// status1.realizada = false;

// status1.save();
