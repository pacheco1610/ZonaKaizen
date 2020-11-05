export const TAREAS = 'TAREAS'
export const tareas_action = (tarea) =>{
    return{
        type:TAREAS,
        payload:tarea
    }
}
export const UPDATETAREA = 'UPDATETAREA'
export const updatetarea_action = (tarea) =>{
    return{
        type:UPDATETAREA,
        payload:tarea
    }
}
export const RESPONSABLESTAREAS = 'FILTROTAREAS'
export const responsable_action = (responsable) =>{
    return{
        type:RESPONSABLESTAREAS,
        payload:responsable
    }
}
/*export const EDITPUESTOS = 'EDITPUESTOS'
export const editpuestos_action = (puesto) =>{
    return{
        type:EDITPUESTOS,
        payload:puesto
    }
}*/
