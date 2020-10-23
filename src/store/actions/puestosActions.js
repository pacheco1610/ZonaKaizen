export const PUESTOS = 'PUESTOS'
export const puestos_action = (puesto) =>{
    return{
        type:PUESTOS,
        payload:puesto
    }
}
export const EDITPUESTOS = 'EDITPUESTOS'
export const editpuestos_action = (puesto) =>{
    return{
        type:EDITPUESTOS,
        payload:puesto
    }
}
export const UPDATEPUESTO = 'UPDATEPUESTO'
export const updatepuestos_action = (puesto) =>{
    return{
        type:UPDATEPUESTO,
        payload:puesto
    }
}