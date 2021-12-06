const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const ContratosStatus4 = new Schema({
    idAtividade: String,
    siteNome: String,
    realizada: Boolean,
    quant:String 
});


module.exports = mongoose.model("Status4", ContratosStatus4);