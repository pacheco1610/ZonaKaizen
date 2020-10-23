import {EMPRESA} from '../actions/empresaActions'

const default_empresas={
    nombre:'defaul'
}

const empresa = (state=default_empresas,action)=>{
    switch(action.type){
        case EMPRESA:{
            return{
                ...state,nombre:action.payload
            }
        }
        default: return state
    }
}

export default empresa;