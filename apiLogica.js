var axios = require('axios');
var qs = require('qs');
const Status1 = require('./Schemas/Status1');
const Status2 = require('./Schemas/Status2');
const Status3 = require('./Schemas/Status3');
const Status4 = require('./Schemas/Status3');
const ObterContratos = require('./Schemas/contratos');
let ArrayContratosGlobalStatus1 = [];
let ArrayContratosGlobalStatus2 = [];
let ArrayContratosGlobalStatus3 = [];
let ArrayContratosGlobalStatus4 = [];


/* Iniciando A logica*/
(ObterContratos.then(a => {
    let contrato = factoryContrato('SICOOB CREDICITRUS', '11', '2021', '');
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
    dias = [19];


    let queryContrato = [];
    query.then((dados) => {
        contrato.token = dados;
        dias.map((d) => {
            console.log(`Iniciando Logica Dia: ${d}`);
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
        // console.log(`Cadastrando Status1 do dia ${atividades.idAtividade}`);
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
        // console.log(`Cadastrando Status2 do dia ${atividades.idAtividade}`);
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
        // console.log(`Cadastrando Status3 do dia ${atividades.idAtividade}`);
        cadastrarAtividadesStatus3(atividades);
    });

    var settingsStatus4 = {
        url: `https://lighthousev2.lkp.app.br/v1/atividades?SelectedDate=${contrato.year}-${contrato.month}-${contrato.days}&StatusId=4`,
        method: 'GET',
        timeout: 0,
        headers: {
            EmpresaId: '3554',
            // SiteId: 45222,
            Authorization: contrato.token,
            'Content-Type': 'application/x-www-form-urlencoded',
            // Accept: "*/*"
        },
    };

    axios(settingsStatus4).then(function (response) {
        const dados = (response.data);
        contratoStatus4 = dados.filter((a) => a.siteNome === contrato.siteNome);
        let atividades = factoryAtivdades(contrato, true, contratoStatus4.length);
        console.log(atividades);
        // console.log(`Cadastrando Status4 do dia ${atividades.idAtividade}`);
        cadastrarAtividadesStatus4(atividades);
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
function listarAtividadesStatus4() {
    let atividades = Status4;
    return atividades;
}
/*Fim*/

/*Cadastrar*/
function cadastrarAtividadesStatus1(atividade) {
    const query = listarAtividadesStatus1();
    query.find().exec(function (erro, dados) {
        delStatus1();
        ArrayContratosGlobalStatus1.push(atividade);
        ArrayContratosGlobalStatus1 = ArrayContratosGlobalStatus1.filter(function (este, i) {
            return ArrayContratosGlobalStatus1.indexOf(este) === i;
        });
        ArrayContratosGlobalStatus1.map(a => {
            let add = new Status1(
                {
                    idAtividade: a.idAtividade,
                    siteNome: a.siteNome,
                    realizada: a.realizada,
                    quant: a.quant
                }
            );
            add.save((err, dep) => {
                if (err) {
                    //res.status(500).send(err);
                    console.log(err);
                } else {
                    //res.status(200).send(dep);
                    console.log(`Gravando status 1 ${add.idAtividade}`);
                }
            });

        });
    });


}

function cadastrarAtividadesStatus2(atividade) {
    const query = listarAtividadesStatus2();
    query.find().exec(function (erro, dados) {
        delStatus2();
        ArrayContratosGlobalStatus2.push(atividade);
        ArrayContratosGlobalStatus2 = ArrayContratosGlobalStatus2.filter(function (este, i) {
            return ArrayContratosGlobalStatus2.indexOf(este) === i;
        });
        ArrayContratosGlobalStatus2.map(a => {
            let add = new Status2(
                {
                    idAtividade: a.idAtividade,
                    siteNome: a.siteNome,
                    realizada: a.realizada,
                    quant: a.quant
                }
            );
            add.save((err, dep) => {
                if (err) {
                    //res.status(500).send(err);
                    console.log(err);
                } else {
                    //res.status(200).send(dep);
                    console.log(`Gravando status 2 ${add.idAtividade}`);
                }
            });
        });
    });
}

function cadastrarAtividadesStatus3(atividade) {
    const query = listarAtividadesStatus3();
    query.find().exec(function (erro, dados) {
        delStatus3();
        ArrayContratosGlobalStatus3.push(atividade);
        ArrayContratosGlobalStatus3 = ArrayContratosGlobalStatus3.filter(function (este, i) {
            return ArrayContratosGlobalStatus3.indexOf(este) === i;
        });
        ArrayContratosGlobalStatus3.map(a => {
            let add = new Status3(
                {
                    idAtividade: a.idAtividade,
                    siteNome: a.siteNome,
                    realizada: a.realizada,
                    quant: a.quant
                }
            );
            add.save((err, dep) => {
                if (err) {
                    //res.status(500).send(err);
                    console.log(err);
                } else {
                    //res.status(200).send(dep);
                    console.log(`Gravando status 3 ${add.idAtividade}`);
                }
            });
        });
    });
}

function cadastrarAtividadesStatus4(atividade) {
    const query = listarAtividadesStatus4();
    query.find().exec(function (erro, dados) {
        delStatus4();
        ArrayContratosGlobalStatus4.push(atividade);
        ArrayContratosGlobalStatus4 = ArrayContratosGlobalStatus4.filter(function (este, i) {
            return ArrayContratosGlobalStatus4.indexOf(este) === i;
        });
        ArrayContratosGlobalStatus4.map(a => {
            let add = new Status4(
                {
                    idAtividade: a.idAtividade,
                    siteNome: a.siteNome,
                    realizada: a.realizada,
                    quant: a.quant
                }
            );
            add.save((err, dep) => {
                if (err) {
                    //res.status(500).send(err);
                    console.log(err);
                } else {
                    //res.status(200).send(dep);
                    console.log(`Gravando status 4 ${add.idAtividade}`);
                }
            });
        });
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













function delStatus1() {
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
function delStatus2() {
    let del = true;
    Status2.deleteMany({
        p: del
    }, (err) => {
        if (err) {
            //res.status(500).send(err);
        } else {
            //res.status(200).send({});
        }
    });
}
function delStatus3() {
    let del = true;
    Status3.deleteMany({
        p: del
    }, (err) => {
        if (err) {
            //res.status(500).send(err);
        } else {
            //res.status(200).send({});
        }
    });
}
function delStatus4() {
    let del = true;
    Status4.deleteMany({
        p: del
    }, (err) => {
        if (err) {
            //res.status(500).send(err);
        } else {
            //res.status(200).send({});
        }
    });
}










