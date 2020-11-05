import React,{useState,useEffect} from 'react'
import moment from 'moment'
import firebase from '../../context/firebaseConfig'
import {connect} from 'react-redux'
function Mensajes(props) {
    const [mensajes,setMensajes]=useState([])
    useEffect(() => {
        firebase.database().ref(`tareas/${props.tarea.uidTarea}`).on('child_added',snap=>{
            if(snap.key=="historial"){
                setMensajes(snap.val())
            }
        })
        firebase.database().ref(`tareas/${props.tarea.uidTarea}`).on('child_changed',snap=>{
            if(snap.key=="historial"){
                setMensajes(snap.val())
            }
        })
    }, [])
    return(
        mensajes.map(mensaje=>{
            if (mensaje.tipo === "notificacion") {
                return (
                    <div key={mensaje.fecha + mensaje.uid} className="burbuja shadow bg-secundario p-1 mb-2 rounded ml-auto mr-auto text-center">
                        <small className="bg-text-secundario">{moment(mensaje.fecha).format('DD/MM/YYYY')}</small>
                        <small className="bg-text-secundario d-block">{mensaje.data}</small>
                    </div>
                )
            } else if (mensaje.tipo === "mensaje" && mensaje.uid === props.usuario.uid) {
                return (
                    <div className="burbuja bg-secundario p-1 pr-3 mb-2 rounded ml-auto shadow">
                        <div className="emisorBurbuja text-right">
                            <small className="bg-text-secundario">{props.colaboradores.find(item => item.uid === mensaje.uid).nombre}</small>
                        </div>
                        <div className="textoBurbuja text-right">
                            {mensaje.data}
                        </div>
                        <div className="fechaBurbuja text-left">
                            <small className="bg-text-secundario">{moment(mensaje.fecha).format('DD/MM/YYYY')}</small>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="burbuja bg-secundario p-1 pl-3 mb-2 rounded shadow">
                        <div className="emisorBurbuja">
                            <small className="bg-text-secundario">Emmanuel Aviles Pacheco</small>
                        </div>
                        <div className="textoBurbuja">
                            {mensaje.data}
                        </div>
                        <div className="fechaBurbuja text-right">
                            <small className="bg-text-secundario">{moment(mensaje.fecha).format('DD/MM/YYYY')}</small>
                        </div>
                    </div>
                )
            }
        })
    )
}

const PropsStore = state => {
    return {
        colaboradores: state.colaboradores.colaboradores,
        clientes: state.clientes.clientes,
        usuario: state.usuario.usuario
    }
}
export default connect(PropsStore)(Mensajes)