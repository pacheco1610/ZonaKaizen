import React from 'react'
import { connect } from 'react-redux'
import {cliente_action} from '../../store/actions/clientesActions'

function Clientes(props) {

    const HandleCliente = (cliente)=>{
        props.cliente_action(cliente)
        props.toggleRight(2)
    }
    if (props.clientes.filter(item => item.tCliente === props.tCliente).length > 0) {
        return (
            <div className="contenedorTabla">
                <table className=" text-white">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Empresa</th>
                            <th scope="col">Teléfono</th>
                        </tr>
                    </thead>
                    <tbody className="bg-principal">
                        {props.clientes.filter(item => item.tCliente === props.tCliente).map(cliente =>
                            <tr className="trButton" onClick={()=>HandleCliente(cliente)}>
                                <td>{cliente.nombre} {cliente.apellido}</td>
                                <td>{cliente.empresa}</td>
                                <td>{cliente.telefono}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <div className="contenedorTabla">
                <table className=" text-white">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Empresa</th>
                            <th scope="col">Teléfono</th>
                        </tr>
                    </thead>
                    <tbody className="bg-principal">
                        <tr className="text-center">
                            'Sin Clientes Agregados'
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

const PropsStore = state => {
    return {
        clientes: state.clientes.clientes
    }
}
const functionStore ={
    cliente_action
}
export default connect(PropsStore,functionStore)(Clientes)