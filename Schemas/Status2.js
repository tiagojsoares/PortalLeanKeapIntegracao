const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const ContratosStatus2 = new Schema({
    idAtividade: String,
    siteNome: String,
    realizada: Boolean,
});


module.exports = mongoose.model("Status2", ContratosStatus2);