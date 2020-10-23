
import {CLIENTES,UPDATECLIENTES,CLIENTE} from '../actions/clientesActions'

const default_clientes={
    clientes:[],
    cliente:{}
}

const clientes = (state=default_clientes,action)=>{
    switch(action.type){
        case CLIENTES:{
            return{
                ...state,clientes:state.clientes.concat(action.payload)
            }
        }
        case UPDATECLIENTES:{
            return({
                ...state,clientes:action.payload
            })
        }
        case CLIENTE:{
            return({
                ...state,cliente:action.payload
            })
        }
        default: return state
    }
}

export default clientes;