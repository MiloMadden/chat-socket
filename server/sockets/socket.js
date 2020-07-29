
const { io } = require('../server');

const { crearMensaje } = require('../utilidades/utilidades');

const { Usuarios } = require('../classes/usuarios');

let usuarios = new Usuarios();

io.on('connection', (client)=>{

    // metodos

    // entrar al chat
    client.on('entrarChat', function(data, callback){
        
        console.log(data.nombre + ' se ha conectado a la sala de '+ data.sala);

        client.join(data.sala);

        let respuesta = usuarios.agregarPersona(client.id, data);
        let usuariosConectados = usuarios.getPersonasPorSala(data.sala); 

        client.broadcast.to(data.sala).emit('conectados', usuariosConectados);

        client.broadcast.to(data.sala).emit('entrando', data.nombre);

        callback({
            nombre: respuesta.persona.nombre,
            conectados: usuariosConectados
        })

    })

    // desconectarse del chat
    client.on('disconnect', function(){

        let personaBorrada = usuarios.borrarPersona(client.id);
        let msg = crearMensaje('Admin', `${personaBorrada.borrado.nombre} salio de la sala`)

        console.log(personaBorrada.borrado.nombre + ' se ha desconectado de la sala ' + personaBorrada.borrado.sala);

        client.broadcast.to(personaBorrada.borrado.sala).emit('desconexion', msg );

        client.broadcast.to(personaBorrada.borrado.sala).emit('genteConectada', usuarios.getPersonasPorSala(personaBorrada.borrado.sala));

    })


    // mensaje privado
    client.on('mensajePrivado', function(data){

        let persona = usuarios.getPersonaPorId(client.id);
        
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

    })

    // mensaje a todos
    client.on('mensaje', function(data, callback){
        
        let persona = usuarios.getPersonaPorId(client.id);

        let mensaje = crearMensaje(persona.nombre, data);

        client.broadcast.to(persona.sala).emit('mensaje', mensaje); 

        //console.log(mensaje);

        callback(mensaje);

    })



})
