var axios = require('axios');
var qs = require('qs');


let query = ObterToken();





module.exports = query.then((token) => {
    let contratos={
        "contratos":(ObterContratos(token)),
        "token":token
    }
    
    return contratos;
});










function ObterContratos(token) {
    let queryContrato = [];
    currentTime = new Date();
    var year = currentTime.getFullYear();
    var month = format(currentTime.getMonth() + 1);
    var days = format(currentTime.getDate());

    var settingsStatus1 = {
        url: `https://lighthousev2.lkp.app.br/v1/unidades/ativas?empresaId=3554`,
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

    return axios(settingsStatus1).then(function (response) {
        const dados = (response.data);
        dados.map(a => {
            queryContrato.push(a.nome);
        });

        return queryContrato = queryContrato.filter(function (item, pos, self) {
            return self.indexOf(item) == pos;
        });



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




function format(s) {
    s = padLeft(s, '0', 2);
    // console.log(s);
    return s;
}

function padLeft(text, padChar, size) {
    return (String(padChar).repeat(size) + text).substr(size * -1, size);
}

// module.exports = "ola mundo";