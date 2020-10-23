import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {editpuestos_action} from '../../store/actions/puestosActions'
import firebase from '../../context/firebaseConfig'
function Perfiles(props) {
    const eliminarPuesto = (puesto) =>{
        firebase.database().ref(`puestos/${puesto.uid}`).update(null)
    }
    if (props.puestos.length>0) {
        return (
            <div className="contenedorTabla">
                <table className=" text-white">
                    <thead>
                        <tr>
                            <th scope="col">Puesto</th>
                            <th scope="col">Proposito</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-principal">
                        {props.puestos.map(puesto=>{
                            return(
                                <tr key={puesto.key}>
                                    <td>{puesto.Puesto}</td>
                                    <td>{puesto.Proposito}</td>
                                    <td>
                                        <Link to="/perfildepuestos/edtiPuesto" onClick={()=>props.editpuestos_action(puesto)} className="bg-primary btn text-white m-1">Editar</Link>
                                        <button className="bg-danger btn text-white" onClick={()=>eliminarPuesto(puesto)}>Eliminar</button>
                                    </td>
                                </tr>
                            )
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
                        <th scope="col">Puesto</th>
                        <th scope="col">Proposito</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody className="bg-principal">
                    <tr className="text-center">
                        No tienen ningun puesto creado
                    </tr>
                </tbody>
            </table>
        </div>
        )
    }
}
const PropsStore = state =>{
    return{
        puestos:state.puestos.puestos
    }
}
const functionStore ={
    editpuestos_action
}
export default connect(PropsStore,functionStore)(Perfiles)