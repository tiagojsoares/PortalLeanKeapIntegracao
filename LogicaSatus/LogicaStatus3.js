const qs = require('qs');
const rax = require('retry-axios');

rax.attach();
const axios = require('axios');
// const delay = require('delay');
const Status3 = require('../Schemas/Status3');

function padLeft(text, padChar, size) {
  return (String(padChar).repeat(size) + text).substr(size * -1, size);
}

// Misc Functions --------------------------------
function format(string) {
  let s = string;
  s = padLeft(s, '0', 2);
  // console.log(s);
  return s;
}

function formatdateYear(string) {
  const date = new Date(string);
  const year = date.getFullYear();
  const month = format(date.getMonth() + 1);
  const day = format(date.getDate());
  const fullYear = (`${year}-${month}-${day}`);
  return fullYear;
}

let token = '';

let ano = new Date();
// Uma ano atras
ano = (ano.getFullYear() - 2);
// ano = (ano.getFullYear());

const start = new Date(`${ano}-01-01`);
// const start = new Date('2021-12-14');
const end = new Date();
let loop = new Date(start);

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

delStatus3();

async function ObterAtividadesMes(year, month, days) {
  const settingsstatus3 = {
    raxConfig: {
      retry: 50, // number of retry when facing 4xx or 5xx
      noResponseRetries: 50, // number of retry when facing connection error
      retryDelay: 5000,
      onRetryAttempt: (err) => {
        const cfg = rax.getConfig(err);
        console.log(`Retry attempt Status 1 #${cfg.currentRetryAttempt}`); // track current trial
      },
    },

    url: `https://lighthousev2.lkp.app.br/v1/atividades?SelectedDate=${year}-${month}-${days}&StatusId=1`,
    method: 'GET',
    headers: {
      EmpresaId: '3554',
      // SiteId: 35222,
      Authorization: token,
      'Content-Type': 'application/json',
      // Accept: "*/*",
      timeout: 50, // don't forget this one
    },

  };
  const requeststatus3 = async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const req = await axios(settingsstatus3)
        .then((response) => {
          const dados = (response.data);
          // eslint-disable-next-line array-callback-return
          dados.map((a) => {
            const dataPrevista = formatdateYear(a.dataPrevista);
            const add = new Status3(
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

            add.save((err) => {
              if (err) {
                // res.status(500).send(err);
                console.log(err);
              } else {
                // console.log(dep);
                // res.status(200).send(dep);
                // console.log('Gravando status 1');
              }
            });
          });
        });
    } catch (errorstatus3) {
      console.log(errorstatus3);
    }
  };
  requeststatus3();
}

async function MainLogic() {
  if (loop <= end) {
    // Loop until
    const newDate = loop.setDate(loop.getDate() + 1);
    loop = new Date(newDate);
    const year = loop.getFullYear();
    const month = format(loop.getMonth() + 1);
    const day = format(loop.getDate());
    console.log(`Rondando status3: ${year}-${month}-${day}`);
    ObterAtividadesMes(year, month, day);
  } else {
    // eslint-disable-next-line no-use-before-define
    EndTimer();
    console.log('Finalizando Status3');
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
async function StartTimer() {
  if (token === '') {
    console.log('Vazio');
    ObterToken();
  } else {
    // console.log('tenho o token');
    MainLogic();
  }
  //
}

const myVar = setInterval(StartTimer, 2000);
// Functions Inciando Logica

function EndTimer() {
  clearInterval(myVar);
}

console.log('Iniciando Logica');
// Timer Inciando
