const { response } = require('express')
const { Tutoria } = require('../models')



const getTutorias = async (req,res = response )=>{
    const { limite = 10 , desde=0 } =  req.query;
    const query = { status:true };

    const [ sum, tutorias ] = await Promise.all([
        Tutoria.countDocuments(query),
        Tutoria.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
  
    res.json({
      sum, 
      tutorias
    })
}


const getTutoria= async (req, res =  response)=>{
    const {id} = req.params
    const tutoria=  await Tutorado.findById(id);
    res.json(tutoria);
}


const createTutoria = async(req,res=response)=>{
    const { status, ...body } =  req.body;    
    const existTutoria =  await Tutoria.findOne({ID_TUTOR: body.ID_TUTOR}, {ID_TUTORADO: body.ID_TUTORADO})

    if (existTutoria)
    {
        return res.status(400).json({
            msg:`La tutoria ya existe`
        })
    }

    const data = {
        ...body,
        ID_TUTOR: body.ID_TUTOR,
        ID_TUTORADO: body.ID_TUTORADO,
        asignatura: body.asignatura,
        numeroHoras: body.numeroHoras,
        fecha: body.fecha,
        hora: body.hora
    }

    const tutoria = new Tutoria(data);

    const newTutoria =  await tutoria.save();
    res.status(201).json(newTutoria);
}



const updateTutoria= async (req, res=response)=>{
    const {id} = req.params;
    const { status, ...data } =  req.body;
    // console.log(id,data)
    const updatedTutoria =  await Tutoria.findByIdAndUpdate(id,data, {new: true} )
    res.json(updatedTutoria);
}


const deleteTutoria= async (req, res = response)=>{
    const {id} = req.params;
    const deletedTutoria =  await Tutoria.findByIdAndUpdate(id, {status:false}, {new:true} );
    res.json(deletedTutoria);
}

module.exports = {
    getTutoria,
    getTutorias,
    createTutoria,
    updateTutoria,
    deleteTutoria
};