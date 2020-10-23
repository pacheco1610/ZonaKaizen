/*Cargamos Permisos del menu y habilidades cargamos en el store desde actions*/

import {PERMISOS,HABILIDADES} from '../actions/permisosActions'

const default_permisos={
    permisos:[],
    habilidades:[]
}

const permisos = (state=default_permisos,action)=>{
    switch(action.type){
        case PERMISOS:{
            return{
                ...state,permisos:state.permisos.concat(action.payload)
            }
        }
        case HABILIDADES:{
            return{
                ...state,habilidades:state.habilidades.concat(action.payload)
            }
        }
        default: return state
    }
}

export default permisos;