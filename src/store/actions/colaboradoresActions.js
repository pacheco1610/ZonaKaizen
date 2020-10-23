export const COLABORADORES = 'COLABORADORES'
export const colaboradores_action = (colaborador) =>{
    return{
        type:COLABORADORES,
        payload:colaborador
    }
}

export const COLABORADOR = 'COLABORADOR'
export const colaborador_action = (colaborador) =>{
    return{
        type:COLABORADOR,
        payload:colaborador
    }
}