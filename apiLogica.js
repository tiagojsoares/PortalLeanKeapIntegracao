var axios = require('axios');
var qs = require('qs');
const Status1 = require('./Schemas/Status1');
const Status2 = require('./Schemas/Status2');
const Status3 = require('./Schemas/Status3');
const ObterContratos = require('./Schemas/contratos');

/* Iniciando A logica*/
(ObterContratos.then(a => {
    del();
    let contrato = factoryContrato('BANCO MUFG BRASIL', '11', '2021', '');
    InitLogic(contrato);
}));

/*Fim*/




/* Iniciando A logica*/
(ObterContratos.then(a => {
    let mes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    a.map(c => {
        mes.map(m => {
            let contrato = factoryContrato(c, format(m), '2021', '');
            // console.log(contrato);
        });

    })

    // InitLogic(contrato);
}));

/*Fim*/









function InitLogic(contrato) {

    /*Limpeza*/
    //   sessionStorage.AtividadesStatus1 = '';
    //   sessionStorage.AtividadesStatus2 = '';
    //   sessionStorage.AtividadesStatus3 = '';
    /*FIM*/

    let dias = getDiasMes(contrato.month, contrato.year);
    let query = ObterToken();




    let queryContrato = [];
    query.then((dados) => {
        contrato.token = dados;
        dias.map((d) => {
            let ArrayContrato = factoryContrato(
                contrato.siteNome,
                contrato.month,
                contrato.year,
                contrato.token,
                d
            );

            queryContrato.push(ArrayContrato);
            ObterAtividadesMes(ArrayContrato);
        });
    });
}



function ObterAtividadesMes(contrato) {
    var PageSize = 500000;
    // console.log(contrato);

    var settingsStatus1 = {
        url: `https://lighthousev2.lkp.app.br/v1/atividades?SelectedDate=${contrato.year}-${contrato.month}-${contrato.days}&StatusId=1`,
        method: 'GET',
        // timeout: 0,
        headers: {
            EmpresaId: '3554',
            // SiteId: 35222,
            Authorization: contrato.token,
            'Content-Type': 'application/json',
            // Accept: "*/*"
        },
    };

    axios(settingsStatus1).then(function (response) {
        const dados = (response.data);
        const contratoStatus1 = dados.filter(a => a.siteNome === contrato.siteNome);
        let atividades = factoryAtivdades(contrato, false, contratoStatus1.length);
        cadastrarAtividadesStatus1(atividades);
    });

    var settingsStatus2 = {
        url: `https://lighthousev2.lkp.app.br/v1/atividades?SelectedDate=${contrato.year}-${contrato.month}-${contrato.days}&StatusId=2`,
        method: 'GET',
        timeout: 0,
        headers: {
            EmpresaId: '3554',
            // SiteId: 35222,
            Authorization: contrato.token,
            'Content-Type': 'application/x-www-form-urlencoded',
            // Accept: "*/*"
        },
    };

    axios(settingsStatus2).then(function (response) {
        const dados = (response.data);
        contratoStatus2 = dados.filter((a) => a.siteNome === contrato.siteNome);

        let atividades = factoryAtivdades(contrato, false, contratoStatus2.length);
        cadastrarAtividadesStatus2(atividades);
    });

    var settingsStatus3 = {
        url: `https://lighthousev2.lkp.app.br/v1/atividades?SelectedDate=${contrato.year}-${contrato.month}-${contrato.days}&StatusId=3`,
        method: 'GET',
        timeout: 0,
        headers: {
            EmpresaId: '3554',
            // SiteId: 35222,
            Authorization: contrato.token,
            'Content-Type': 'application/x-www-form-urlencoded',
            // Accept: "*/*"
        },
    };

    axios(settingsStatus3).then(function (response) {
        const dados = (response.data);
        contratoStatus3 = dados.filter((a) => a.siteNome === contrato.siteNome);
        let atividades = factoryAtivdades(contrato, true, contratoStatus3.length);
        cadastrarAtividadesStatus3(atividades);
    });
}

function ObterToken() {
    var token = 'vazio';
    var dataToken = qs.stringify({
        Login: 'desen.controller',
        Password: 'controller123',
        Platform: '6',
        ExpireCurrentSession: 'true',
        StayConnected: 'true',
    });
    var configToken = {
        method: 'post',
        url: 'https://auth.lkp.app.br/v1/auth',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: dataToken,
    };

    return axios(configToken)
        .then(function (response) {

            let token = 'Bearer ' + response.data.authToken.token;
            return token;
        })
        .catch(function (error) {
            console.log(error);
        });
}

/*Funções para manipular Arrays*/

/*Listar */

function listarAtividadesStatus1() {
    let atividades = Status1;
    return atividades;
}

function listarAtividadesStatus2() {
    let atividades = Status2;
    return atividades;
}

function listarAtividadesStatus3() {
    let atividades = Status3;
    return atividades;
}
/*Fim*/

/*Cadastrar*/
function cadastrarAtividadesStatus1(atividade) {
    const query = listarAtividadesStatus1();
    query.find().exec(function (erro, dados) {
        let documentArray = [];
        dados.push(atividade);

        dados.map(a => {
            let s = new Status1({
                idAtividade: a.idAtividade,
                siteNome: a.siteNome,
                realizada: a.realizada,
            });
            documentArray.push(s);
        });

        documentArray.map(a => {
            // a.save();
        });


    });
}

function cadastrarAtividadesStatus2(atividade) {
    const query = listarAtividadesStatus2();
    query.find().exec(function (erro, dados) {
        dados.push(atividade);
        // console.log("Status - 2");
        // console.log(dados);
    });
}

function cadastrarAtividadesStatus3(atividade) {
    const query = listarAtividadesStatus3();
    query.find().exec(function (erro, dados) {
        dados.push(atividade);
        // console.log("Status - 3");
        // console.log(dados);
    });
}

/*Fim*/

function getDiasMes(month, year) {
    month--;

    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
        days.push(format(date.getDate()));
        date.setDate(date.getDate() + 1);
    }
    return days;
}

function format(s) {
    s = padLeft(s, '0', 2);
    // console.log(s);
    return s;
}

function padLeft(text, padChar, size) {
    return (String(padChar).repeat(size) + text).substr(size * -1, size);
}

/*fim*/

/*Factory*/

function factoryContrato(siteNome, month, year, token, days) {
    let contrato = {};
    contrato.siteNome = siteNome;
    contrato.month = month;
    contrato.year = year;
    contrato.days = days;
    contrato.token = token;
    return contrato;
}

function factoryAtivdades(contrato, realizada, quant) {
    let atividades = {};
    atividades.siteNome = contrato.siteNome;
    atividades.realizada = realizada;
    atividades.idAtividade = `${contrato.year}-${contrato.month}-${contrato.days}`;
    atividades.quant = quant;
    return atividades;
}













function del() {
    let del = true;
    Status1.deleteMany({
        p: del
    }, (err) => {
        if (err) {
            //res.status(500).send(err);
        } else {
            //res.status(200).send({});
        }
    });
}











module.exports = "Funcinou";