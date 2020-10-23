import {combineReducers} from 'redux'
import usuario from './usuarioReducer'
import colaboradores from './colaboradoresReducer'
import empresa from './empresaReducer'
import permisos from './permisosReducer'
import puestos from './puestosReducer'
import clientes from './clientesReducer'
import tareas from './tareasReducer'
const Reducers = combineReducers({
    usuario,
    colaboradores,
    empresa,
    permisos,
    puestos,
    clientes,
    tareas
    
})

export default Reducers 