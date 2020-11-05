import React,{useState} from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { editpuestos_action } from '../../store/actions/puestosActions'
import firebase from '../../context/firebaseConfig'
function Perfiles(props) {
    const [historial, setHistorial] = useState(useHistory())
    const eliminarPuesto = (puesto) => {
        firebase.database().ref(`puestos/${puesto.uid}`).update(null)
    }
    const editPuesto = (puesto) => {
        props.editpuestos_action(puesto)
        historial.push("/perfildepuestos/edtiPuesto");
    }
    if (props.puestos.length > 0) {
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
                        {props.puestos.map(puesto => {
                            return (
                                <tr key={puesto.key} className="filaPuesto" onClick={() => editPuesto(puesto)}>
                                    <td>{puesto.Puesto}</td>
                                    <td>{puesto.Proposito}</td>
                                </tr>
                            )
                        })}
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
const PropsStore = state => {
    return {
        puestos: state.puestos.puestos
    }
}
const functionStore = {
    editpuestos_action
}
export default connect(PropsStore, functionStore)(Perfiles)