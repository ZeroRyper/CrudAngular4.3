const express = require('express');
const router = express.Router();

//Importamos las funciones del controlador
const empleados = require('../controller/empleado.controller');
//CRUD - Create - Read (select) - Update - Delete

//Cuando el usuario pida /api/empleados/ se ejecuta la función getEmpleados del controlador
//http://localhost:3000/api/empleados
//Solicitar todos los empleados <-- Select * from empleados
router.get('/', empleados.getEmpleados);

//Crear un empleado
router.post('/', empleados.createEmpleado);

//Obtener un empleado
router.get('/:id', empleados.getEmpleado);

//Actualizar un empleado
router.put('/:id',empleados.updateEmpleado);

//Eliminar un empleado
router.delete('/:id', empleados.deleteEmpleado);
module.exports = router;
