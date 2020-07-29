//var socket = io();
var params = new URLSearchParams(window.location.search);

var nombre = params.get('nombre');
var sala = params.get('sala');

// Referencias de jquery

var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var textMensaje = $('#textMensaje');
var divChatbox = $('#divChatbox');

// Funciones para renderizar usuarios

function renderizarUsuarios(personas){ // arreglo de personas

    console.log(personas);

    var html = '';
    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span>'+params.get('sala')+'</span></a>';
    html += '</li>';

    for(let i = 0 ; i < personas.length ; i++){
        
        html += '<li>';
        html += '   <a data-id="'+personas[i].id+'" href="javascript:void(0)"><img src="assets/images/users/2.jpg" alt="user-img" class="img-circle"> <span>'+personas[i].nombre+'<small class="text-warning">Away</small></span></a>';
        html += '</li>'; 

    }

    divUsuarios.html(html);
      

}

function renderizarMensajes(mensaje, yo){

    var fecha = new Date();
    var hora = fecha.getHours()+' : '+fecha.getMinutes();


    var html = '';

    if(yo){

        html += '<li class="reverse">';
        html += '<div class="chat-content">';
        html += '<h5>'+mensaje.nombre+'</h5>';
        html += '<div class="box bg-light-inverse">'+mensaje.mensaje.mensaje+'</div>';
        html += '</div>';
        html += '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '<div class="chat-time">'+hora+'</div>';
        html += '</li>';

    }else{

        html += '<li class="animated fadeIn">';
        html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        html += '<div class="chat-content">';
        html += '<h5>'+mensaje.nombre+'</h5>';
        html += '<div class="box bg-light-info">'+mensaje.mensaje.mensaje+'</div>';
        html += '</div>';
        html += '<div class="chat-time">'+hora+'</div>';
        html += '</li>';   

    }
        
    divChatbox.append(html);

}

function renderizarDesconexion(mensaje){
    
    var html = '';

    html += '<li class="animated fadeIn">';
    html += '<div class="chat-content">';
    html += '<h5>'+mensaje+'</h5>';
    html += '</div>';
    html += '</li>'; 

    divChatbox.append(html);


}

function renderizarConexion(mensaje){
    
    var html = '';

    html += '<li class="animated fadeIn">';
    html += '<div class="chat-content">';
    html += '<h5>'+mensaje+'</h5>';
    html += '</div>';
    html += '</li>'; 

    divChatbox.append(html);


}


function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

// listeners

divUsuarios.on('click', 'a', function(){

    var id = $(this).data('id');

    if(id){
        console.log(id);
    }

})

formEnviar.on('submit', function(e){
    
    e.preventDefault();

    if(textMensaje.val().trim().length === 0){
        return;
    }

    console.log('click')
    
    socket.emit('mensaje', {
        nombre,
        mensaje: textMensaje.val()
    }, function(resp){
        console.log('Mensaje Enviado: '+resp.mensaje.mensaje)
        textMensaje.val('').focus();

        renderizarMensajes(resp, true)

        scrollBottom();
    });
    

})

