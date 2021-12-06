
const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const ContratosStatus1 = new Schema({
    idAtividade: String,
    siteNome: String,
    realizada: Boolean,
    quant:String 
});


module.exports = mongoose.model("Status1", ContratosStatus1);
