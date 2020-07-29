
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
        console.log(resp.persona.nombre + ' Online');
        //console.log(resp.personas);
    })

})

socket.on('conectados', (resp)=>{
    console.log(resp);
})

socket.on('genteConectada', (resp)=>{
    console.log(resp);
})

socket.on('mensaje', (resp)=>{
    console.log(resp);
})

socket.on('mensajePrivado', function(mensaje){
    console.log(mensaje);
})

socket.on('disconnect', function(){
    console.log('desconectado del servidor');
})

socket.on('desconexion', function(resp){
    console.log(resp)
})