const { response } = require('express');
const { Tutorado } = require('../models');


const getTutorados = async (req,res = response )=>{
    const { limite = 10 , desde=0 } =  req.query;
    const query = { status:true };

    const [ sum, tutorados ] = await Promise.all([
        Tutorado.countDocuments(query),
        Tutorado.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
  
    res.json({
      sum, 
      tutorados
    })
}


const getTutorado = async (req, res= response)=>{
    const {id} = req.params
    const tutorado=  await Tutorado.findById(id);
    res.json(tutorado);
}

const createTutorado = async(req,res=response)=>{
    const { status, ...body } =  req.body;
    
    const existTutorado =  await Tutorado.findOne({nombre: body.nombre})

    if (existTutorado)
    {
        return res.status(400).json({
            msg:`El tutorado ${ existeTutorado.nombre } ya existe`
        })
    }

    const data = {
        ...body,
        nombre: body.nombre,
        identificacion: body.identificacion,
    }

    const tutorado = new Tutorado(data);

    const newTutorado =  await tutorado.save();
    res.status(201).json(newTutorado);
}


const updateTutorado = async(req,res =  response)=>{
    const {id} = req.params;
    const { status, ...data } =  req.body;
    const categoryTutorado =  await Tutorado.findByIdAndUpdate(id,data, {new: true} )
    res.json(categoryTutorado);
}

const deleteTutorado =  async (req, res= response)=>{
    const {id} = req.params;
    const deletedTutorado =  await Tutorado.findByIdAndUpdate(id, {status:false}, {new:true} );
    res.json(deletedTutorado);
}

 module.exports ={
    createTutorado,
    getTutorado,
    getTutorados,
    updateTutorado,
    deleteTutorado
 }