const { model, Schema } = require('mongoose');

const TutoradoSchema = Schema(
    {
        nombre:{
            type: String,
            required: [ true, 'El nombre del tutorado debe ser necesario'],
        },
        status:{
            type: Boolean,
            default: true,
            required:true
        },
        identificacion:{
            type: String,
            required: [ true, 'La identificacion del Tutorado debe ser necesaria'],
            unique:true,
        }
        
    }
);

module.exports = model('Tutorado', TutoradoSchema );