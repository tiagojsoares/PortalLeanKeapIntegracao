var qs = require('qs');
var axios = require('axios');
const Status1 = require('./Schemas/Status1');
const Status2 = require('./Schemas/Status2');
const Status3 = require('./Schemas/Status3');
const Status4 = require('./Schemas/Status4');
let query = ObterToken();
let token = "vazio";
const delay = require('delay');

const start = new Date("2021-12-01");
const end = new Date();
let loop = new Date(start);

delStatus1();
delStatus2();
delStatus3();
delStatus4();



function ObterAtividadesMes(year, month, days) {

    var settingsStatus1 = {
        url: `https://lighthousev2.lkp.app.br/v1/atividades?SelectedDate=${year}-${month}-${days}&StatusId=1`,
        method: 'GET',
        // timeout: 0,
        headers: {
            EmpresaId: '3554',
            // SiteId: 35222,
            Authorization: token,
            'Content-Type': 'application/json',
            // Accept: "*/*"
        },
    };

    axios(settingsStatus1).then(function (response) {
        const dados = (response.data);
        dados.map(a => {
            let dataPrevista = formatdateYear(a.dataPrevista);
            let add = new Status1(
                {
                    tarefa: a.tarefa,
                    numero: a.numero,
                    descricao: a.descricao,
                    dataPrevista: dataPrevista,
                    dataRealizada: a.dataRealizada,
                    tempoPrevisto: a.tempoPrevisto,
                    aplicacaoPlanoAtividade: a.aplicacaoPlanoAtividade,
                    planoAtividade: a.planoAtividade,
                    atividade: a.atividade,
                    siteNome: a.siteNome,
                    grupoAreaNome: a.grupoAreaNome,
                    subGrupoAreaNome: a.subGrupoAreaNome,
                    areaNome: a.areaNome,
                    equipNome: a.equipNome,
                    sistemaEmpresaNome: a.sistemaEmpresaNome,
                    qtdMaterial: a.qtdMaterial,
                    executores: a.executores,
                    realizada: a.realizada
                }
            );

            add.save((err, dep) => {
                if (err) {
                    //res.status(500).send(err);
                    console.log(err);
                } else {
                    //res.status(200).send(dep);
                    // console.log('Gravando status 1');
                }
            });
        });
    });


    var settingsStatus2 = {
        url: `https://lighthousev2.lkp.app.br/v1/atividades?SelectedDate=${year}-${month}-${days}&StatusId=2`,
        method: 'GET',
        timeout: 0,
        headers: {
            EmpresaId: '3554',
            // SiteId: 35222,
            Authorization: token,
            'Content-Type': 'application/x-www-form-urlencoded',
            // Accept: "*/*"
        },
    };

    axios(settingsStatus2).then(function (response) {
        const dados = (response.data);
        dados.map(a => {
            let dataPrevista = formatdateYear(a.dataPrevista);
            let dataRealizada = formatdateYear(a.dataRealizada);
            let add = new Status2(
                {
                    tarefa: a.tarefa,
                    numero: a.numero,
                    descricao: a.descricao,
                    dataPrevista: dataPrevista,
                    dataRealizada: dataRealizada,
                    tempoPrevisto: a.tempoPrevisto,
                    aplicacaoPlanoAtividade: a.aplicacaoPlanoAtividade,
                    planoAtividade: a.planoAtividade,
                    atividade: a.atividade,
                    siteNome: a.siteNome,
                    grupoAreaNome: a.grupoAreaNome,
                    subGrupoAreaNome: a.subGrupoAreaNome,
                    areaNome: a.areaNome,
                    equipNome: a.equipNome,
                    sistemaEmpresaNome: a.sistemaEmpresaNome,
                    qtdMaterial: a.qtdMaterial,
                    executores: a.executores,
                    realizada: a.realizada
                }
            );

            add.save((err, dep) => {
                if (err) {
                    //res.status(500).send(err);
                    console.log(err);
                } else {
                    //res.status(200).send(dep);
                    // console.log('Gravando status 2');
                }
            });
        });

    });

    var settingsStatus3 = {
        url: `https://lighthousev2.lkp.app.br/v1/atividades?SelectedDate=${year}-${month}-${days}&StatusId=3`,
        method: 'GET',
        timeout: 0,
        headers: {
            EmpresaId: '3554',
            // SiteId: 35222,
            Authorization: token,
            'Content-Type': 'application/x-www-form-urlencoded',
            // Accept: "*/*"
        },
    };

    axios(settingsStatus3).then(function (response) {
        const dados = (response.data);
        dados.map(a => {
            let dataPrevista = formatdateYear(a.dataPrevista);
            let dataRealizada = formatdateYear(a.dataRealizada);
            let add = new Status3(
                {
                    tarefa: a.tarefa,
                    numero: a.numero,
                    descricao: a.descricao,
                    dataPrevista: dataPrevista,
                    dataRealizada: dataRealizada,
                    tempoPrevisto: a.tempoPrevisto,
                    aplicacaoPlanoAtividade: a.aplicacaoPlanoAtividade,
                    planoAtividade: a.planoAtividade,
                    atividade: a.atividade,
                    siteNome: a.siteNome,
                    grupoAreaNome: a.grupoAreaNome,
                    subGrupoAreaNome: a.subGrupoAreaNome,
                    areaNome: a.areaNome,
                    equipNome: a.equipNome,
                    sistemaEmpresaNome: a.sistemaEmpresaNome,
                    qtdMaterial: a.qtdMaterial,
                    executores: a.executores,
                    realizada: a.realizada
                }
            );

            add.save((err, dep) => {
                if (err) {
                    //res.status(500).send(err);
                    console.log(err);
                } else {
                    //res.status(200).send(dep);
                    // console.log('Gravando status 3');
                }
            });
        });

    });

    var settingsStatus4 = {
        url: `https://lighthousev2.lkp.app.br/v1/atividades?SelectedDate=${year}-${month}-${days}&StatusId=4`,
        method: 'GET',
        timeout: 0,
        headers: {
            EmpresaId: '3554',
            // SiteId: 45222,
            Authorization: token,
            'Content-Type': 'application/x-www-form-urlencoded',
            // Accept: "*/*"
        },
    };

    axios(settingsStatus4).then(function (response) {
        const dados = (response.data);
        dados.map(a => {
            let dataPrevista = formatdateYear(a.dataPrevista);
            let dataRealizada = formatdateYear(a.dataRealizada);
            let add = new Status4(
                {
                    tarefa: a.tarefa,
                    numero: a.numero,
                    descricao: a.descricao,
                    dataPrevista: dataPrevista,
                    dataRealizada: dataRealizada,
                    tempoPrevisto: a.tempoPrevisto,
                    aplicacaoPlanoAtividade: a.aplicacaoPlanoAtividade,
                    planoAtividade: a.planoAtividade,
                    atividade: a.atividade,
                    siteNome: a.siteNome,
                    grupoAreaNome: a.grupoAreaNome,
                    subGrupoAreaNome: a.subGrupoAreaNome,
                    areaNome: a.areaNome,
                    equipNome: a.equipNome,
                    sistemaEmpresaNome: a.sistemaEmpresaNome,
                    qtdMaterial: a.qtdMaterial,
                    executores: a.executores,
                    realizada: a.realizada
                }
            );

            add.save((err, dep) => {
                if (err) {
                    //res.status(500).send(err);
                    console.log(err);
                } else {
                    //res.status(200).send(dep);
                    // console.log('Gravando status 4');
                }
            });
        });

    });


}



function MainLogic() {
    if (loop <= end) {











        // Loop until
        let newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
        let year = loop.getFullYear();
        let month = format(loop.getMonth() + 1);
        let day = format(loop.getDate());
        console.log('Rondando: ' + year + "-" + month + "-" + day);
        ObterAtividadesMes(year, month, day);


    } else {
        EndTimer()
        console.log('Finalizando');
    }
}









function ObterToken() {

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

            token = 'Bearer ' + response.data.authToken.token;
            console.log("Obtendo Token");
            return token;
        })
        .catch(function (error) {
            console.log(error);
        });



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












// Misc Functions --------------------------------
function format(s) {
    s = padLeft(s, '0', 2);
    // console.log(s);
    return s;
}

function padLeft(text, padChar, size) {
    return (String(padChar).repeat(size) + text).substr(size * -1, size);
}
function formatdateYear(string) {

    var date = new Date(string);
    let year = date.getFullYear();
    let month = format(date.getMonth() + 1);
    let day = format(date.getDate());
    let fullYear = (year + "-" + month + "-" + day);
    return fullYear;
}





// Functions Inciando Logica
function StartTimer() {

    MainLogic();
}
function EndTimer() {
    clearInterval(myVar);
}

console.log('Iniciando Logica');
//Timer Inciando
var myVar = setInterval(StartTimer, 10000);


