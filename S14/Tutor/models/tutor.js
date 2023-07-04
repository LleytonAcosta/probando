const { model, Schema } = require('mongoose');

const TutorSchema = Schema(
    {
        nombre:{
            type: String,
            required: [ true, 'El nombre del tutor debe ser necesario'],
            unique:true
        },
        status:{
            type: Boolean,
            default: true,
            required:true
        },
        identificacion:{
            type: String,
            required: [ true, 'La identificacion del Tutor debe ser necesaria'],
            unique:true,
        },
        experiencia:{
            type:String,
            required: [ true, 'Ingrese la experiencia del tutor'],
        },
        
    }
);

module.exports = model('Tutor', TutorSchema );