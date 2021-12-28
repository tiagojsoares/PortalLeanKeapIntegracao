const qs = require('qs');
const axios = require('axios');
const Status1 = require('./Schemas/Status1');
const Status2 = require('./Schemas/Status2');
const Status3 = require('./Schemas/Status3');
const Status4 = require('./Schemas/Status4');

const query = ObterToken();
let token = 'vazio';
const delay = require('delay');

let ano = new Date();
ano = (ano.getFullYear() - 2);
const start = new Date(`${ano}-01-01`);

const end = new Date();
let loop = new Date(start);

delStatus1();
delStatus2();
delStatus3();
delStatus4();

function ObterAtividadesMes(year, month, days) {
  const settingsStatus1 = {
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

  axios(settingsStatus1).then((response) => {
    const dados = (response.data);
    dados.map((a) => {
      const dataPrevista = formatdateYear(a.dataPrevista);
      const add = new Status1(
        {
          tarefa: a.tarefa,
          numero: a.numero,
          descricao: a.descricao,
          dataPrevista,
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
          realizada: a.realizada,
        },
      );

      add.save((err, dep) => {
        if (err) {
          // res.status(500).send(err);
          console.log(err);
        } else {
          // res.status(200).send(dep);
          // console.log('Gravando status 1');
        }
      });
    });
  });

  const settingsStatus2 = {
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

  axios(settingsStatus2).then((response) => {
    const dados = (response.data);
    dados.map((a) => {
      const dataPrevista = formatdateYear(a.dataPrevista);
      const dataRealizada = formatdateYear(a.dataRealizada);
      const add = new Status2(
        {
          tarefa: a.tarefa,
          numero: a.numero,
          descricao: a.descricao,
          dataPrevista,
          dataRealizada,
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
          realizada: a.realizada,
        },
      );

      add.save((err, dep) => {
        if (err) {
          // res.status(500).send(err);
          console.log(err);
        } else {
          // res.status(200).send(dep);
          // console.log('Gravando status 2');
        }
      });
    });
  });

  const settingsStatus3 = {
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

  axios(settingsStatus3).then((response) => {
    const dados = (response.data);
    dados.map((a) => {
      const dataPrevista = formatdateYear(a.dataPrevista);
      const dataRealizada = formatdateYear(a.dataRealizada);
      const add = new Status3(
        {
          tarefa: a.tarefa,
          numero: a.numero,
          descricao: a.descricao,
          dataPrevista,
          dataRealizada,
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
          realizada: a.realizada,
        },
      );

      add.save((err, dep) => {
        if (err) {
          // res.status(500).send(err);
          console.log(err);
        } else {
          // res.status(200).send(dep);
          // console.log('Gravando status 3');
        }
      });
    });
  });

  const settingsStatus4 = {
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

  axios(settingsStatus4).then((response) => {
    const dados = (response.data);
    dados.map((a) => {
      const dataPrevista = formatdateYear(a.dataPrevista);
      const dataRealizada = formatdateYear(a.dataRealizada);
      const add = new Status4(
        {
          tarefa: a.tarefa,
          numero: a.numero,
          descricao: a.descricao,
          dataPrevista,
          dataRealizada,
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
          realizada: a.realizada,
        },
      );

      add.save((err, dep) => {
        if (err) {
          // res.status(500).send(err);
          console.log(err);
        } else {
          // res.status(200).send(dep);
          // console.log('Gravando status 4');
        }
      });
    });
  });
}

function MainLogic() {
  if (loop <= end) {
    // Loop until
    const newDate = loop.setDate(loop.getDate() + 1);
    loop = new Date(newDate);
    const year = loop.getFullYear();
    const month = format(loop.getMonth() + 1);
    const day = format(loop.getDate());
    console.log(`Rondando: ${year}-${month}-${day}`);
    ObterAtividadesMes(year, month, day);
  } else {
    EndTimer();
    console.log('Finalizando');
  }
}

function ObterToken() {
  const dataToken = qs.stringify({
    Login: 'desen.controller',
    Password: 'controller123',
    Platform: '6',
    ExpireCurrentSession: 'true',
    StayConnected: 'true',
  });
  const configToken = {
    method: 'post',
    url: 'https://auth.lkp.app.br/v1/auth',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: dataToken,
  };

  return axios(configToken)
    .then((response) => {
      token = `Bearer ${response.data.authToken.token}`;
      console.log('Obtendo Token');
      return token;
    })
    .catch((error) => {
      console.log(error);
    });
}

function delStatus1() {
  const del = true;
  Status1.deleteMany({
    p: del,
  }, (err) => {
    if (err) {
      // res.status(500).send(err);
    } else {
      // res.status(200).send({});
    }
  });
}
function delStatus2() {
  const del = true;
  Status2.deleteMany({
    p: del,
  }, (err) => {
    if (err) {
      // res.status(500).send(err);
    } else {
      // res.status(200).send({});
    }
  });
}
function delStatus3() {
  const del = true;
  Status3.deleteMany({
    p: del,
  }, (err) => {
    if (err) {
      // res.status(500).send(err);
    } else {
      // res.status(200).send({});
    }
  });
}
function delStatus4() {
  const del = true;
  Status4.deleteMany({
    p: del,
  }, (err) => {
    if (err) {
      // res.status(500).send(err);
    } else {
      // res.status(200).send({});
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
  const date = new Date(string);
  const year = date.getFullYear();
  const month = format(date.getMonth() + 1);
  const day = format(date.getDate());
  const fullYear = (`${year}-${month}-${day}`);
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
// Timer Inciando
var myVar = setInterval(StartTimer, 10000);
