import {COLABORADORES,COLABORADOR} from '../actions/colaboradoresActions'

const default_colaboradores={
    colaboradores:[],
    colaborador:{}
}

const colaboradores = (state=default_colaboradores,action)=>{
    switch(action.type){
        case COLABORADORES:{
            return{
                ...state,colaboradores:state.colaboradores.concat(action.payload)
            }
        }
        case COLABORADOR:{
            return{
                ...state,colaborador:action.payload
            }
        }
        default: return state
    }
}

export default colaboradores;