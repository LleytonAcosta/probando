const { Router } = require('express')
const { check } =  require('express-validator')

const { getTutoria,
    getTutorias,
    createTutoria,
    updateTutoria,
    deleteTutoria
    } = require('../controllers').Tutoria;

const { validateFields } = require('../middlewares')

const router = Router();

///                       RUTA PARA ACCEDER A LO DESEADO    
//https://localhost:2500/api/v2/tutorias/ declarado el puerto en el .env

//GET GLOBAL
router.get('/', getTutorias);

//GET INDIVIDUAL
router.get('/:id', [ 
    check('id', 'Este no es un ID de Mongo correcto').isMongoId() 
 ]  , getTutoria);

//POST DATOS
router.post('/',[
    check('ID_TUTOR', 'La identificacion del Tutor no es correcta').not().isEmpty(),
    check('ID_TUTORADO', 'La identificacion del Tutorado no es correcta').not().isEmpty(),
    check('asignatura', 'La asignatura de la tutoria no es correcta').not().isEmpty(),
    check('numeroHoras', 'El numero de hora de la tutoria no es correcta').not().isEmpty(),
    check('fecha', 'La fecha de la tutoria no es correcta').not().isEmpty(),
    check('hora', 'La hora de la tutoria no es correcta').not().isEmpty(),

    validateFields
] , createTutoria)

//PUT DATOS
router.put('/:id', updateTutoria)

//DELETE DATOS
router.delete('/:id',[
    check('id','Debe ser un id de mongo VALIDO').isMongoId()
], deleteTutoria)

module.exports = router;