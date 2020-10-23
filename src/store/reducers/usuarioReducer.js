import {USUARIO} from '../actions/usuarioActions'

const default_usuario={
    usuario:{
        registrado:false
    },
    colaboradores:[]
}

const usuario = (state=default_usuario,action)=>{
    switch(action.type){
        case USUARIO:{
            return{
                ...state,usuario:action.payload
            }
        }
        default: return state
    }
}

export default usuario;