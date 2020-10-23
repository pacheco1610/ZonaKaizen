import React, { useState } from 'react'
import { connect } from 'react-redux'
import firebase from '../../context/firebaseConfig'
import moment from 'moment'
import Responsables from './responsables'

function DetallesTarea(props) {
    const [MensajeInput, setMensajeInput] = useState()
    const [porcentaje, setporcentaje] = useState(0)
    const [nombreArchivo, setnombreArchivo]=useState('')
    const mensajes = (mensaje) => {
        if (mensaje.tipo === "notificacion") {
            return (
                <div key={mensaje.fecha + mensaje.uid} className="burbuja bg-secundario p-1 mb-2 rounded ml-auto mr-auto text-center">
                    <small className="bg-text-secundario">{moment(mensaje.fecha).format('DD/MM/YYYY')}</small>
                    <small className="bg-text-secundario d-block">{mensaje.data}</small>
                </div>
            )
        } else if (mensaje.tipo === "mensaje" && mensaje.uid === props.usuario.uid) {
            return (
                <div className="burbuja bg-secundario p-1 pr-3 mb-2 rounded ml-auto">
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
                <div className="burbuja bg-secundario p-1 pl-3 mb-2 rounded">
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
    }
    const enviarMensaje = (e) => {
        e.preventDefault()
        const historial = props.tarea.historial
        historial.push({
            data: MensajeInput,
            fecha: moment().format('YYYY-MM-DD'),
            tipo: "mensaje",
            uid: props.usuario.uid
        })
        const update = ({ ...props.tarea, historial: historial })
        firebase.database().ref(`tareas/${props.tarea.uidTarea}`).update(update)
        document.getElementById("mensaje").reset();
    }

    const handleOnChange = (event) => {
        document.getElementById('progressBar').classList.toggle('progressToggled')
        const file = event.target.files[0]
        setnombreArchivo(file.name)
        const storageRef = firebase.storage().ref(`${props.tarea.uidTarea}/${file.name}`)
        const task = storageRef.put(file)
        task.on('state_changed', (snapshot) => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setporcentaje(percentage)
        }, (error) => {
            console.error(error.message)
        }, () => {
            setTimeout(function(){
                document.getElementById('progressBar').classList.toggle('progressToggled')
            }, 1000);
        })
    }

    return (
        <div className="row">
            <div className="col-12 bg-text-secundario">
                <i className="far fa-address-card mr-2 d-inline"></i>
                <p className="h6 d-inline"><strong>Titulo de tarea</strong></p>
            </div>
            <div className="col-12">
                <p className="h4">{props.tarea.titulo}</p>
            </div>
            <div className="col-12">
                <div className="container bg-principal p-2 rounded">
                    <div className="row">
                        <div className="col-7">
                            <p className="h6 bg-text-secundario d-block"><strong>Asignada por:</strong></p>
                            <img src="https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg" alt="" className="img-fluid rounded-circle img-drop mr-2" />
                            <p className="h6 bg-text-secundario d-inline"><strong>Emmanuel Aviles Pacheco</strong></p>
                        </div>
                        <div className="col-5">
                            <p className="h6 bg-text-secundario d-block"><strong>Fecha Limite:</strong></p>
                            <p className="h6 bg-text-secundario"><i className="far fa-clock mr-2"></i>{moment(props.tarea.fechaEvento).format('DD/MM/YYYY')}<br/>{props.tarea.hora}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 mt-2">
                <div className="d-inline bg-text-secundario">
                    <i className="fas fa-align-left mr-2"></i>
                    <p className="h6 d-inline"><strong>Descripción</strong></p>
                </div>
                <div className="bg-principal p-2 rounded">
                    {props.tarea.descripcion}
                </div>
            </div>
            <div className="col-12 mt-2">
                <div className="d-inline bg-text-secundario">
                    <i className="fas fa-users mr-2"></i>
                    <p className="h6 d-inline"><strong>Responsables</strong></p>
                </div>
                {props.tarea.responsables.map(responsable => {
                    const colaborador = (props.colaboradores.find(item => item.uid === responsable.uid))
                    return (<Responsables responsable={responsable} colaborador={colaborador}/>)
                })}
            </div>
            {props.tarea.clienteRelacionado &&
                <div className="col-12 mt-2">
                    <div className="d-inline bg-text-secundario">
                        <i className="fas fa-user-tag mr-2"></i>
                        <p className="h6 d-inline"><strong>Cliente Relacionado</strong></p>
                    </div>
                    <div className="bg-principal p-2 rounded">
                        <label className="col-12 col-md-6 col-xl-3" >{props.tarea.clienteRelacionado.nombre} {props.tarea.clienteRelacionado.apellido}</label>
                        <label className="col-12 col-md-6 col-xl-3" >{props.tarea.clienteRelacionado.empresa}</label>
                        <label className="col-12 col-md-6 col-xl-3" >{props.tarea.clienteRelacionado.telefono}</label>
                        <label className="col-12 col-md-6 col-xl-3" >{props.tarea.clienteRelacionado.email}</label>
                    </div>
                </div>}
            <div className="col-12 mt-2">
                <div className="d-inline bg-text-secundario">
                    <i className="fas fa-paperclip mr-2"></i>
                    <p className="h6 d-inline"><strong>Archivos adjuntos</strong></p>
                </div>
                <div className="bg-principal p-2 rounded">
                    {props.tarea.descripcion}
                </div>
            </div>
            <div className="col-12 mt-2">
                <div className="bg-principal p-2 rounded">
                    <div className="chat bg-primario rounded p-2">
                        {props.tarea.historial.map(mensaje =>
                            mensajes(mensaje)
                        )}

                    </div>
                    <div className="mensaje ml-auto p-2">
                        <div className="p-2 progressBar progressToggled" id="progressBar">
                            <i className="far fa-file-archive mr-2"></i>
                            {nombreArchivo}
                            <progress value={porcentaje} max="100"  className="ml-2"/>
                        </div>
                        <div className="form-group d-inline">
                            <label className="label mr-3 ml-2">
                                <i className="fas fa-paperclip"></i>
                                <input type="file" onChange={(e) => handleOnChange(e)} />
                            </label>
                        </div>
                        <form id="mensaje" onSubmit={(e) => enviarMensaje(e)} className="d-inline">
                            <input required type="text" onChange={(e) => setMensajeInput(e.target.value)} className="form-control InputMensaje d-inline" />
                            <button className="btn text-white" type="submit"><i className="fas fa-paper-plane"></i></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const PropsStore = state => {
    return {
        colaboradores: state.colaboradores.colaboradores,
        clientes: state.clientes.clientes,
        usuario: state.usuario.usuario
    }
}
export default connect(PropsStore)(DetallesTarea)