
import {TAREAS,UPDATETAREA} from '../actions/tareasActions'

const default_tareas={
    tareas:[]
}

const tareas = (state=default_tareas,action)=>{
    switch(action.type){
        case TAREAS:{
            return{
                ...state,tareas:state.tareas.concat(action.payload)
            }
        }
        case UPDATETAREA:{
            return({
                ...state,tareas:action.payload
            })
        }
        /*case EDITPUESTOS:{
            return{
                ...state,editPuesto:action.payload
            }
        }*/
        default: return state
    }
}

export default tareas;