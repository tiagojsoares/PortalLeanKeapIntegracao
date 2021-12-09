
const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const ContratosStatus1 = new Schema({
    tarefa: String,
    numero: String,
    descricao: String,
    dataPrevista: String,
    dataRealizada: String,
    tempoPrevisto: String,
    aplicacaoPlanoAtividade: String,
    planoAtividade: String,
    atividade: String,
    siteNome: String,
    grupoAreaNome: String,
    subGrupoAreaNome: String,
    areaNome: String,
    equipNome: String,
    sistemaEmpresaNome: String,
    qtdMaterial: String,
    executores: String,
    realizada: String
});


module.exports = mongoose.model("Status1", ContratosStatus1);
