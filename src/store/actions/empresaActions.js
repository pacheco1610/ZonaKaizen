export const EMPRESA = 'EMPRESA'
export const empresa_action = (empresa) =>{
    return{
        type:EMPRESA,
        payload:empresa
    }
}