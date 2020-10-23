/*Cargamos Permisos del menu y habilidades cargamos en el store*/

export const PERMISOS = 'PERMISOS'
export const permisos_action = (permiso) =>{
    return{
        type:PERMISOS,
        payload:permiso
    }
}

export const HABILIDADES = 'HABILIDADES'
export const habilidades_action = (habilidad) =>{
    return{
        type:HABILIDADES,
        payload:habilidad
    }
}