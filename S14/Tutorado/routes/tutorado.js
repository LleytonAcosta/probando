const { Router } = require('express');
const { check } =  require('express-validator')


const {
    createTutorado,
    getTutorado,
    getTutorados,
    updateTutorado,
    deleteTutorado
} = require('../controllers').Tutorado;

const { validateFields } = require('../middlewares')

const router= Router();

///                       RUTA PARA ACCEDER A LO DESEADO    
//https://localhost:2500/api/v2/tutorados/ declarado el puerto en el .env

//GET GLOBAL
router.get('/', getTutorados );

//GET INDIVIDUAL
router.get('/:id'
,check('id', 'Este no es un ID de Mongo correcto').isMongoId()
 , getTutorado );

 //POST DATOS
 router.post('/',[
    check('nombre', 'El nombre del tutorado es requerido').not().isEmpty(),
    check('identificacion', 'La identificacion del tutorado es requerido').not().isEmpty(),
    validateFields
], createTutorado);

//PUT DATOS
 router.put('/:id', updateTutorado);

 //DELETE DATOS
 router.delete('/:id',[
    check('id','Debe ser un id de mongo VALIDO').isMongoId()
], deleteTutorado);

module.exports = router;