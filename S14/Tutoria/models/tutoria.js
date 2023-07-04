const { model, Schema } = require('mongoose');

const TutoriaSchema = Schema(
    {
        ID_TUTOR: {
            type: String,
            ref:'Tutor',
            required: [ true, 'La identificacion del Tutor debe ser necesaria']
        },
        ID_TUTORADO: {
            type: String,
            ref:'Tutorado',
            required: [ true, 'La identificacion del Tutorado debe ser necesaria']
        },
        status:{
            type: Boolean,
            default: true,
            required:true
        },
        asignatura:{
            type: String,
            required: [ true, 'La asignatura de la tutoria debe ser indicada']
        },
        numeroHoras:{
            type:String,
            required: [ true, 'El numero de hora de la tutoria debe ser indicada']

        },
        fecha:{
            type:String,
            required: [ true, 'La fecha de la tutoria debe ser indicada']
        },
        hora:{
            type:String,
            required: [ true, 'La hora de la tutoria debe ser indicada']
        }
    }
);


module.exports = model('Tutoria', TutoriaSchema );