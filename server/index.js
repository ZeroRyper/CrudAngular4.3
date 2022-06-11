
const express = require('express');//permite crear el servidor web
const morgan = require('morgan');//permite visualizar las peticiones del usuario
const cors = require('cors');//permite comunicacion desde fuera del servicio
const jwt =require('jsonwebtoken');
const bodyParser=require('body-parser');
const bcrypt=require('bcryptjs');
const authorization=require('auth-header');

const Users=require('./models/Users');

const app = express();
//Conectamos la base de datos
const { mongoose } = require('./database'); 
const { request } = require('express');
const { response } = require('express');


//Configuraciones
app.set('port',process.env.PORT || 3100);
app.set('secret','my_secret_1357');

//Mideleware
app.use(morgan('dev'));//solo se carga en desarrollo
app.use(express.json());//permite interpretar respuestas json dentro del servidor
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//Rutas del servidor
app.use('/api/empleados',require('./routes/empleados.routes'));
app.use('/api/Users',require('./routes/users.routes'));

//Ruta para iniciar sesion en el api
app.post('/api/login',async(req,res)=>{
const email=req.body.email;
const passwd=req.body.password;
return new Promise((resolve,reject)=>{
    Users.findOne({email:email})
    .then((user)=>{
        if(!user){
            res.json({success:false,message:'Usuario no encontrado'})
        }else{
            if(bcrypt.compareSync(passwd,user.password)){
                const expire=3600;
                const token=jwt.sign(
                    {user},
                    app.get('secret'),
                    {expiresIn:expire}
                )
                
res.json({
    success:true,
    token:token
})
            }else{
                res.json({success:false,message:'Password no coincide'})
            }//else
        }//else
    })//.then
})//new Promise
});//Fin de /api/login


//El token se envía a través de request . body (en un json)
// request.query.token (en la url)
// request. headers (contiene las cabeceras de authorization )
app.use((req, res, next)=>{
    var tokenauth='';

        if(request.get('authorization')){
            auth=authorization.parse(request.get('authorization'));
            if(auth.scheme=='token-auth')
            tokenauth=auth.token;
        }
    
const token= req.body.token || //json
req.query.token || //url
tokenauth;

if(token){
    jwt.verify(token,app.get('secret'),(err,decoded)=>{
        if(err){
            return res.json({success:false,message:'fallo en la autenticacion'})
        }
        else{
            req.decoded=decoded;
            next();
        }
    })
}else{
    return res.status(403).send({
        succes:false,
        message:'el token no existe'
    })
}

});//Fin de app.use


//Iniciar servidor
app.listen(app.get('port'), (   )=>{
    console.log("Servidor corriendo en el puerto "+app.get('port'));
});
/*
//Funciones
function ensureToken(req,res,next){
    const headerAuth=req.headers['authorization']
    console.log(headerAuth);
    //headerAuth sera igual a undefined si el usuario no ha iniciado sesion
    if(typeof headerAuth !=='undefined'){
        //Separamos el encabezado
        const auth =headerAuth.split("");
        const authToken=auth[1];
        req.token=authToken;
        next();

    }else{
        //Codigo 403 indica que la ruta no esta permitida hasta que el usuario se autentique
        res.sendStatus(403);
    }
    
}
*/
/*
app.get('/api/users',ensureToken,(req,res)=>{
    jwt.verify(req.token,'my_secret_key_1357',(err,data)=>{
        if(err){
            //se genera un estatus 403 que indica que el token 
            //no fue generado a partir de esa llave secreta
            res.sendStatus(403);
        }else{
            res.json({
                text:'users',
                data
            })
        }
    })
   
})
*/