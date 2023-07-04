const { response } = require('express');
const { Tutor } = require('../models');


const getTutores = async (req,res = response )=>{
    const { limite = 10 , desde=0 } =  req.query;
    const query = { status:true };

    const [ sum, tutores ] = await Promise.all([
        Tutor.countDocuments(query),
        Tutor.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
  
    res.json({
      sum, 
      tutores
    })
}

const getTutor = async (req, res= response)=>{
    const {id} = req.params
    const tutor=  await Tutor.findById(id);
    res.json(tutor);
}

const createTutor = async(req,res=response)=>{
    const { status, ...body } =  req.body;
    
    const existTutor =  await Tutor.findOne({nombre: body.nombre})

    if (existTutor)
    {
        return res.status(400).json({
            msg:`El tutor ${ existeTutor.nombre } ya existe`
        })
    }

    const data = {
        ...body,
        nombre: body.nombre,
        identificacion: body.identificacion,
        experiencia: body.experiencia

    }

    const tutor = new Tutor(data);

    const newTutor =  await tutor.save();
    res.status(201).json(newTutor);
}


const updateTutor = async(req,res =  response)=>{
    const {id} = req.params;
    const { status, ...data } =  req.body;
    const categoryTutor =  await Tutor.findByIdAndUpdate(id,data, {new: true} )
    res.json(categoryTutor);
}

const deleteTutor =  async (req, res= response)=>{
    const {id} = req.params;
    const deletedTutor =  await Tutor.findByIdAndUpdate(id, {status:false}, {new:true} );
    res.json(deletedTutor);
}

 module.exports ={
    createTutor,
    getTutor,
    getTutores,
    updateTutor,
    deleteTutor
 }