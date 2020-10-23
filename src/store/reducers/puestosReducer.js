
import {PUESTOS,EDITPUESTOS,UPDATEPUESTO} from '../actions/puestosActions'

const default_puestos={
    puestos:[],
    editPuesto:{}
}

const puestos = (state=default_puestos,action)=>{
    switch(action.type){
        case PUESTOS:{
            return{
                ...state,puestos:state.puestos.concat(action.payload)
            }
        }
        case EDITPUESTOS:{
            return{
                ...state,editPuesto:action.payload
            }
        }
        case UPDATEPUESTO:{
            return({
                ...state,puestos:action.payload
            })
        }
        default: return state
    }
}

export default puestos;