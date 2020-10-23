export const CLIENTES = 'CLIENTES'
export const clientes_action = (puesto) =>{
    return{
        type:CLIENTES,
        payload:puesto
    }
}
export const UPDATECLIENTES = 'UPDATECLIENTES'
export const updateclientes_action = (puesto) =>{
    return{
        type:UPDATECLIENTES,
        payload:puesto
    }
}
export const CLIENTE = 'CLIENTE'
export const cliente_action = (puesto) =>{
    return{
        type:CLIENTE,
        payload:puesto
    }
}