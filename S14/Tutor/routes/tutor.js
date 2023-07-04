const { Router } = require('express')
const { check } =  require('express-validator')

const { 
        createTutor,
        getTutor,
        getTutores,
        updateTutor,
        deleteTutor 
     } = require('../controllers').Tutor;

const { validateFields } = require('../middlewares')

const router = Router();

///                       RUTA PARA ACCEDER A LO DESEADO    
//https://localhost:2500/api/v2/tutores/ declarado el puerto en el .env y el v2 en server.js

//GET GLOBAL
router.get('/', getTutores);

//GET INDIVIDUAL
router.get('/:id', [ 
    check('id', 'Este no es un ID de Mongo correcto').isMongoId() 
 ]  , getTutor);

//POST DATOS
router.post('/',[
    check('nombre', 'El nombre del tutor es requerido').not().isEmpty(),
    check('identificacion', 'La identificacion del tutor es requerido').not().isEmpty(),
    check('experiencia', 'La experiencia del tutor es requerido').not().isEmpty(),
    validateFields
] , createTutor)

//PUT DATOS
router.put('/:id', updateTutor)

//DELETE DATOS
router.delete('/:id',[
    check('id','Debe ser un id de mongo VALIDO').isMongoId()
], deleteTutor)

module.exports = router;