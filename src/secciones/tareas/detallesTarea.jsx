import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import firebase from '../../context/firebaseConfig'
import moment from 'moment'
import Responsables from './responsables'
import Mensajes from './mensajes'
import Tooltip from '../../layout/tooltip'
function DetallesTarea(props) {
    const [MensajeInput, setMensajeInput] = useState()
    const [porcentaje, setporcentaje] = useState(0)
    const [nombreArchivo, setnombreArchivo] = useState('')
    const [toggleTooltip, setToggleTooltip] = useState(false)
    const [dataTooltip, setDataTooltip] = useState('')
    const [data, setData] = useState(props.tarea)
    useEffect(() => {
        firebase.database().ref(`tareas/${props.tarea.uidTarea}`).on('child_changed', snap => {
            setData({ ...data, [snap.key]: snap.val() })
        })
        setTimeout(ScrollChat, 100);
    }, [])
    const enviarMensaje = (e) => {
        e.preventDefault()
        const update = data.historial
        update.push({
            data: MensajeInput,
            fecha: moment().format('YYYY-MM-DD'),
            tipo: "mensaje",
            uid: props.usuario.uid
        })
        firebase.database().ref(`tareas/${data.uidTarea}`).update({ historial: update })
        document.getElementById("mensaje").reset();
        setTimeout(ScrollChat, 100);
    }
    function ScrollChat() {
        document.getElementById("chat").scrollTop = document.getElementById("chat").scrollHeight;
    }
    const handleOnChange = (event) => {
        document.getElementById('progressBar').classList.toggle('progressToggled')
        const file = event.target.files[0]
        setnombreArchivo(file.name)
        firebase.database().ref(`${data.uidTarea}/`).update({ titulo: 'vamos a cambiar' })
        const storageRef = firebase.storage().ref(`${data.uidTarea}/${file.name}`)
        const task = storageRef.put(file)
        task.on('state_changed', (snapshot) => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setporcentaje(percentage)
        }, (error) => {
            console.error(error.message)
        }, () => {
            setTimeout(function () {
                document.getElementById('progressBar').classList.toggle('progressToggled')
            }, 1000);
        })
        if (props.tarea.archivos !== undefined) {
            firebase.database().ref(`tareas/${props.tarea.uidTarea}`).update({ archivos: props.tarea.archivos.concat({ nombre: file.name, uid: props.usuario.uid }) })
        } else {
            firebase.database().ref(`tareas/${props.tarea.uidTarea}`).update({ archivos: [{ nombre: file.name, uid: props.usuario.uid }] })
        }

    }
    const tooltip = (item) => {
        setToggleTooltip(true)
        setDataTooltip(item.nombre)
    }
    const dataDrop = () => {
        document.getElementById('datadropEdit').classList.toggle('datadropToggle')
        document.getElementById('coverPickerEdit').classList.toggle('datadropToggle')
    }
    const actualizaFecha = (date) => {
        setData({ ...data, fechaEvento: date })
        dataDrop()
    }
    const filterColaboradores = (item) => {
        if (!data.responsables.find(responsable => responsable.uid === item.uid)) {
            return (item)
        }

    }
    const AgregarResponsable = (colaborador) => {
        setData({ ...data, responsables: data.responsables.concat({ estatusTarea: false, fechaAsing: moment().format('YYYY-MM-DD'), uid: colaborador.uid }) })
    }
    const DescarArchivo = (item) => {
        firebase.storage().ref(`/${props.tarea.uidTarea}/${item.nombre}`).getDownloadURL().then(function (url) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(event) {
                var a = document.createElement('a');
                a.href = window.URL.createObjectURL(xhr.response);
                a.download = item.nombre;
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();                           
            };
            xhr.open('GET', url);
            xhr.send();
        });
    }
    return (
        <div className="flexbox-container">
            <div className="">
                <div className="row detallestarea">
                    <div className="col-12 bg-text-secundario">
                        <i className="far fa-address-card mr-2 d-inline"></i>
                        <p className="h6 d-inline"><strong>Titulo de tarea</strong></p>
                    </div>
                    <div className="col-12">
                    <p className="fechaYhora"><label className="h4 mr-5">{data.titulo}</label>
                        <label className="mr-1 FechaLimite">Fecha Limite: </label>{moment(props.tarea.fechaEvento).format('DD/MM/YYYY')} <i className="far fa-clock ml-2"></i> {props.tarea.hora}</p>

                    </div>
                    <div className="col-12">
                        <div className="container bg-principal p-2 rounded">
                            <div className="row">
                                <div className="col-12">
                                    <p className="h6 bg-text-secundario d-block"><strong>Asignada por:</strong></p>
                                    <img src={(props.colaboradores.find(item => item.uid === data.asignador)).photo} alt="" className="img-fluid rounded-circle img-drop mr-2" />
                                    <p className="h6 bg-text-secundario d-inline"><strong>{(props.colaboradores.find(item => item.uid === data.asignador)).nombre}</strong></p>
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
                            {data.descripcion}
                        </div>
                    </div>
                    <div className="col-12 mt-2">
                        <div className="d-inline bg-text-secundario">
                            <i className="fas fa-users mr-2"></i>
                            <p className="h6 d-inline"><strong>Responsables</strong></p>
                        </div>
                        {data.responsables.map(responsable => {
                            return (<Responsables responsable={responsable}
                                colaborador={props.colaboradores.find(item => item.uid === responsable.uid)}
                                edit={false} />)
                        })}
                    </div>
                    {data.clienteRelacionado &&
                        <div className="col-12 mt-2">
                            <div className="d-inline bg-text-secundario">
                                <i className="fas fa-user-tag mr-2"></i>
                                <p className="h6 d-inline"><strong>Cliente Relacionado</strong></p>
                            </div>
                            <div className="bg-principal p-2 rounded">
                                <label className="col-12 col-md-6 col-xl-6" >{data.clienteRelacionado.nombre} {data.clienteRelacionado.apellido}</label>
                                <label className="col-12 col-md-6 col-xl-6" >{data.clienteRelacionado.empresa}</label>
                                <label className="col-12 col-md-6 col-xl-4" ><i className="fas fa-phone"></i> {data.clienteRelacionado.telefono}</label>
                                <label className="col-12 col-md-6 col-xl-8" ><i className="fas fa-envelope-open-text"></i> {data.clienteRelacionado.email}</label>
                            </div>
                        </div>}
                    <div className="col-12 mt-2">
                        <div className="d-inline bg-text-secundario">
                            <i className="fas fa-paperclip mr-2"></i>
                            <p className="h6 d-inline"><strong>Archivos adjuntos</strong></p>
                        </div>
                        <div className="bg-principal p-2 rounded">
                            <div className="row">
                                {data.archivos ? data.archivos.map(item => {
                                    return (
                                        <>
                                            <Tooltip data={dataTooltip} toggle={toggleTooltip} />
                                            <div className="p-2 rounded col-3 m-2 AgregarAdjunto text-center" onClick={() => DescarArchivo(item)} onMouseOut={() => setToggleTooltip(false)} onMouseOver={() => tooltip(item)}>
                                                <i className="fas fa-paperclip"></i>
                                                <snap className="d-block">{item.nombre}</snap>
                                            </div>
                                        </>
                                    )
                                }
                                ) : <div>Sin archivos adjuntos</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="bg-principal p-2 rounded contenedorChat">
                    <div className="chat bg-primario rounded p-2" id="chat">
                        <Mensajes tarea={data} />
                    </div>
                    <div className="mensaje ml-auto p-2 bg-principal rounded shadow">
                        <div className="p-2 progressBar progressToggled" id="progressBar">
                            <i className="far fa-file-archive mr-2"></i>
                            {nombreArchivo}
                            <progress value={porcentaje} max="100" className="ml-2" />
                        </div>
                        <form id="mensaje" onSubmit={(e) => enviarMensaje(e)} className="d-inline">
                            <div className="inputMensaje">
                                <div className="d-inline">
                                    <label className="labelinputFile mr-3">
                                        <i className="fas fa-paperclip"></i>
                                        <input type="file" className="InputFile" onChange={(e) => handleOnChange(e)} />
                                    </label>
                                </div>

                                <input required type="text" onChange={(e) => setMensajeInput(e.target.value)} className="form-control InputMensaje d-inline" />
                                <button className="btn text-white" type="submit"><i className="fas fa-paper-plane"></i></button>
                            </div>
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