
class Usuarios {

    constructor(){
        this.personas = [];
    }

    // Metodos
//--------------------------------------------
    // agregar persona
    agregarPersona(id, data){

        let persona = {
            id,
            nombre: data.nombre,
            sala: data.sala
        }

        this.personas.push(persona);

        return {
            persona, 
            personas: this.personas
        }

    }

//--------------------------------------------
    // get persona por id

    getPersonaPorId(id){

        let persona = this.personas.filter( persona=>{
            return persona.id === id
        } )[0];

        return persona;

    }

//--------------------------------------------
    // get personas

    getPersonas(){
        return this.personas;
    }

//--------------------------------------------
    // get personas por sala

    getPersonasPorSala(sala){
        let personasConectadas = this.personas.filter(result=>{
            return result.sala === sala;
        })

        return personasConectadas;
    }
//--------------------------------------------
    // borrar persona

    borrarPersona(id){

        let borrado = this.getPersonaPorId(id);
        
        this.personas = this.personas.filter(result=>{
            return result.id != id;
        })

        return {
            personas: this.personas,
            borrado
        };

    }

}

module.exports = {
    Usuarios
}