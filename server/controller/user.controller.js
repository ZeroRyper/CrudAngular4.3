const bcrypt = require('bcryptjs/dist/bcrypt');
const { request,response } = require('express');
const Users =require('../models/Users');

const usersController={}

//Listar todos los usuarios
usersController.getUsers=async(request,response)=>{
const users=await Users.find();
response.json(users);    
}

//Crear un usuario 
usersController.createUser=async(request,response)=>{
    const name=request.body.name;
    const email=request.body.email;
    const password=request.body.password;
    const tipo=request.body.tipo;
    const User=new Users({
        name:name,
        email:email,
        password:password,
        tipo:tipo
    });
    User.password=bcrypt.hashSync(password,10);
    await User.save()
    .then((user)=>{
        response.json(user);
    })
    .catch((err)=>{
        return response.json({message:'Error user exists'});
    })
}

usersController.deleteUser=async(req,res)=>{
    await Users.findByIdAndRemove(req.params.id)
    .then((user)=>{
        res.json({status:'Usuario eliminado',user:user});
    })
    .catch((err)=>{
        console.log(err);
        return res.json({message:'Error al eliminar el usuario'});
    })
}//Fin del deleteUser

usersController.updateUser=async(req,res)=>{
    const {id}=req.params;
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const tipo=req.body.type;

    const user=new Users({
        name:name,
        email:email,
        password:password,
        tipo:tipo
    });
    user._id=id;
    user.password=bcrypt.hashSync(password,10);
    await Users.findById(id,{$set:user},{new:true})
    .then((user)=>{
        res.json({status:'Usuario actualizado',user:user});
    })
    .catch((err)=>{
        console.log(err);
        return res.json({message:'Error al actulizar el usuario'});
    });
}//Fin de updateUser

//Buscar un usuario por id
usersController.getUser=async(req,res)=>{
  await Users.findById(req.params.id)
    .then((user)=>{
        res.json(user);
    })
    .catch((err)=>{
        console.log(err);
        return res.json({message:'Error al obtener ususario'})
    })
}//Fin de getUser
module.exports=usersController;
