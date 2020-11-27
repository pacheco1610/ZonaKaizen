import React from 'react'
import {connect} from 'react-redux'
import {colaborador_action} from '../../store/actions/colaboradoresActions'
function Colaboradores(props) {
    const HandleColaborador = (colaborador)=>{

        props.colaborador_action(colaborador)
        props.toggleRight(2)
    }
    if (props.colaboradores.length>0) {
        return (
            <div className="contenedorTabla">
                <table className=" text-white">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Estatus</th>
                        </tr>
                    </thead>
                    <tbody className="bg-principal">
                        {props.colaboradores.map(colaborador=>{
                            if (colaborador.estatus!==false) {
                                return(
                                    <tr className="trButton" key={colaborador.uid} onClick={()=>HandleColaborador(colaborador)}>
                                        <td>{colaborador.nombre}</td>
                                        <td>Activo</td>
                                    </tr>
                                )
                            }else{
                                return(
                                    <tr className="trButton" key={colaborador.uid} onClick={()=>HandleColaborador(colaborador)}>
                                        <td>{colaborador.nombre}</td>
                                        <td>Inactivo</td>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </table>
            </div>
        )
    }else{
        return(
            <div className="contenedorTabla">
            <table className=" text-white">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Estatus</th>
                    </tr>
                </thead>
                <tbody className="bg-principal">
                    <tr className="text-center">
                        Sin ningun Colaborador
                    </tr>
                </tbody>
            </table>
        </div>
        )
    }
}
const PropsStore = state =>{
    return{
        colaboradores:state.colaboradores.colaboradores
    }
}
const functionStore ={
    colaborador_action
}

export default connect(PropsStore,functionStore)(Colaboradores)