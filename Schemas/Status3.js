const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const ContratosStatus3 = new Schema({
    idAtividade: String,
    siteNome: String,
    realizada: Boolean,
    quant:String 
});


module.exports = mongoose.model("Status3", ContratosStatus3);