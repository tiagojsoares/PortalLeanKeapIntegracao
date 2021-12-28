const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const Status1 = require('./Schemas/Status1');
const Status2 = require('./Schemas/Status2');
const Status3 = require('./Schemas/Status3');
const Status4 = require('./Schemas/Status4');
require('./LogicaSatus/LogicaStatus1');
require('./LogicaSatus/LogicaStatus2');
require('./LogicaSatus/LogicaStatus3');
require('./LogicaSatus/LogicaStatus4');

const app = express();

function factoryContrato(siteNome, quant) {
  const contrato = {};
  contrato.siteNome = siteNome;
  contrato.quant = quant;
  // contrato.month = month;
  // contrato.year = year;
  // contrato.days = days;
  // contrato.token = token;
  return contrato;
}
// const apiLogica = require('./apiLogica');

mongoose.connect('mongodb+srv://controller:D&s&nv0lvim&nt0@cluster0.glt6q.mongodb.net/PortalIntegracao?retryWrites=true&w=majority');
// mongoose.connect('mongodb://mongodb:27017/Controllerbms_Projetos');

const port = process.env.Port || 3000;

app.get('/', (req, res) => {
  // http://localhost:3000/?di=2021-12-01&df=2021-12-08&s=THERA%20OFFICE
  // http://localhost:3000/?di=2021-01-01&df=2021-03-30&s=THERA%20OFFICE
  console.log('Acessou a pagina');
  // console.log(req.query);
  const { di } = req.query;
  const { df } = req.query;
  const { s } = req.query;
  const AtividadesQuant = {};

  Status1.find({ dataPrevista: { $gte: di, $lte: df }, siteNome: s })
    .exec((errStatus1, depsStatus1) => {
      if (errStatus1) {
        res.status(500).send(errStatus1);
      } else {
        const status1 = factoryContrato(s, depsStatus1.length);
        AtividadesQuant.status1 = status1;

        // res.status(200).send(deps);
        Status2.find({ dataPrevista: { $gte: di, $lte: df }, siteNome: s })
          .exec((errStatus2, depsStatus2) => {
            if (errStatus2) {
              res.status(500).send(errStatus2);
            } else {
              const status2 = factoryContrato(s, depsStatus2.length);
              AtividadesQuant.status2 = status2;
              Status3.find({ dataPrevista: { $gte: di, $lte: df }, siteNome: s })
                .exec((errStatus3, depsStatus3) => {
                  if (errStatus3) {
                    res.status(500).send(errStatus3);
                  } else {
                    const status3 = factoryContrato(s, depsStatus3.length);
                    AtividadesQuant.status3 = status3;
                    Status4.find({ dataPrevista: { $gte: di, $lte: df }, siteNome: s })
                      .exec((errStatus4, depsStatus4) => {
                        if (errStatus4) {
                          res.status(500).send(errStatus4);
                        } else {
                          const status4 = factoryContrato(s, depsStatus4.length);
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
});

// Factory

const server = http.createServer(app);
server.listen(port, () => console.log('Running..'));

// let status1 = new Status1();
// status1.idAtividade = "2021-01-01";
// status1.siteNome = "BTG Pactual";
// status1.realizada = false;

// status1.save();
