
const { Router } = require('express');
const router = Router();
const alumnosController = require("../controller/alumnos.controller")

router.get('/alumnos', alumnosController.getAlumnosOrId);

router.post('/alumnos', alumnosController.createAlumno);

router.put('/alumnos', alumnosController.updateAlumno);

router.delete('/alumnos', alumnosController.deleteAlumno);

router.get('/media', alumnosController.notaMediaById);

router.get('/apuntadas', alumnosController.allAsignaturasOrByAlumnoId);

router.get('/impartidas', alumnosController.allAsignaturasOrByProfesorId);

module.exports = router;