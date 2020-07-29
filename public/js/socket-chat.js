
const socket = io();

var params = new URLSearchParams(window.location.search);

if(!params.has('nombre') || !params.has('sala') ){
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');

}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function(){
    console.log('conectado al servidor');

    socket.emit('entrarChat', usuario, (resp)=>{
        //console.log(resp.persona.nombre + ' Online');
        console.log(resp.nombre + ' Online');
        renderizarUsuarios(resp.conectados);
        renderizarConexion(resp.nombre + ' se ha conectado a la sala');
    })

})

socket.on('conectados', (resp)=>{
    //console.log(resp);
    renderizarUsuarios(resp);
})

socket.on('genteConectada', (resp)=>{
   // console.log(resp);
    renderizarUsuarios(resp);
})

socket.on('mensaje', (resp)=>{
    console.log(resp);
    renderizarMensajes(resp, false);
    scrollBottom();
})

socket.on('mensajePrivado', function(mensaje){
    console.log(mensaje);
})

socket.on('entrando', function(resp){
    //console.log(resp);
    renderizarConexion(resp + ' Se ha conectado a la sala');
})

socket.on('disconnect', function(){
    console.log('desconectado del servidor');
})

socket.on('desconexion', function(resp){
    //console.log(resp.mensaje)
    renderizarDesconexion(resp.mensaje);
})