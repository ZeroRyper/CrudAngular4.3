const express=require('express');
const router=express.Router();

const users=require('../controller/user.controller');

//Obtener todos los ususarios 
router.get('/',users.getUsers);

//Agregar un usuario
router.post('/',users.createUser)

//Eliminar un usuario
router.delete('/:id',users.deleteUser);

//Actulaizar un usuario
router.put('/:id',users.updateUser);

//Obtener un usuario
router.get('/:id',users.getUser);

module.exports=router;