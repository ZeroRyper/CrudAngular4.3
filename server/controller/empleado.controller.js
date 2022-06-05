const Empleados = require("../models/Empleados");

const empleadoController = {};
                                //async permite una ejecusión asíncrona de una función 
//Listar todos los empleados    
empleadoController.getEmpleados = async (req, res) =>{
    const empleados = await Empleados.find(); //Select * from empleados
    res.json(empleados);
} //Fin de getEmpleados

empleadoController.createEmpleado = async (req, res) =>{
    //req.body contiene los datos del empleado a guardar
    //console.log(req.body);
    //res.json("Empleado recibido");
    const empleado = new Empleados({
    nombre : req.body.nombre,
    puesto : req.body.puesto,
    departamento : req.body.departamento,
    salario : req.body.salario
    });
    await empleado.save()
    res.json({
        'status':'Empleado guardado correctamente'
    })
}; //Fin de createEmpleado

//Consultar un empleado por id
empleadoController.getEmpleado = async (req, res) =>{
    //Obtener el id de la petición
    //console.log(req.params);
    //res.json("Recibido");
    const empleado = await Empleados.findById(req.params.id);
    res.json(empleado);
}; //Fin de getEmpleado

//Actualizar un empleado
empleadoController.updateEmpleado = async (req, res) =>{
    const { id } = request.params;
    const empleado = {
        nombre: req.body.nombre,
        puesto: req.body.puesto,
        departamento: req.body.departamento,
        salario: req.body.salario
    }
    await Empleados.findByIdAndUpdate(id, {$set: empleado}, {new: true});
    res.json({status: 'Empleado actualizado correctamente'});
}; //Fin de updateEmpleado

empleadoController.deleteEmpleado = async (req, res) =>{
    const { id } = req.params;
    await Empleados.findByIdAndDelete(id);
    res.json({status: 'Empleado eliminado correctamente'});
}; //Fin de deleteEmpleado




module.exports = empleadoController;