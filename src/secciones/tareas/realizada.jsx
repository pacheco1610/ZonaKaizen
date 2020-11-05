import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import firebase from '../../context/firebaseConfig'
function Realizada(props) {
    const [MensajeInput, setMensajeInput] = useState()
    const [porcentaje, setporcentaje] = useState(0)
    const [nombreArchivo, setnombreArchivo] = useState('')
    const [archivos, SetArchivos] = useState([])
    useEffect(() => {
        firebase.database().ref(`tareas/${props.tarea.uidTarea}/responsables/`).on('child_added', snap => {
            if (snap.val().uid === props.usuario.uid) {
                if (snap.val().archivos) {
                    SetArchivos(snap.val().archivos)
                }
            }
        })
        firebase.database().ref(`tareas/${props.tarea.uidTarea}/responsables/`).on('child_changed', snap => {
            if (snap.val().uid === props.usuario.uid) {
                if (snap.val().archivos) {
                    SetArchivos(snap.val().archivos)
                }
            }
        })
    }, [])

    const handleTarea = (e) => {
        e.preventDefault()
        const responsable = props.tarea.responsables.find(item => item.uid === props.usuario.uid)
        const filter = props.tarea.responsables.filter(item => item.uid !== props.usuario.uid)
        filter.push({ ...responsable, estatusTarea: "realizada" })
        firebase.database().ref(`tareas/${props.tarea.uidTarea}/`).update({ ...props.tarea, responsables: filter,minfo:"" })
        props.setModal(false)
        document.getElementById("mensaje").reset();
    }
    const handleOnChange = (event) => {
        document.getElementById('progressBar').classList.toggle('progressToggled')
        const file = event.target.files[0]
        setnombreArchivo(file.name)
        const storageRef = firebase.storage().ref(`${props.tarea.uidTarea}/${props.usuario.uid}/${file.name}`)
        const task = storageRef.put(file)
        task.on('state_changed', (snapshot) => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setporcentaje(percentage)
        }, (error) => {
            console.error(error.message)
        }, () => {
            setTimeout(function () {
                document.getElementById('progressBar').classList.toggle('progressToggled')
                firebase.database().ref(`tareas/${props.tarea.uidTarea}/responsables/${props.tarea.responsables.findIndex(item => item.uid === props.usuario.uid)}/`)
                    .update({ archivos: archivos.concat(file.name) })
            }, 1000);
        })
    }
    const handleRemoveArchivo = (archivo) => {
        firebase.storage().ref(`${props.tarea.uidTarea}/${props.usuario.uid}/`).child(archivo).delete()
        firebase.database().ref(`tareas/${props.tarea.uidTarea}/responsables/${props.tarea.responsables.findIndex(item => item.uid === props.usuario.uid)}/`)
            .update({ archivos: archivos.filter(item => item !== archivo) })
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
                            <img src={(props.colaboradores.find(item => item.uid === props.tarea.asignador)).photo} alt="" className="img-fluid rounded-circle img-drop mr-2" />
                            <p className="h6 bg-text-secundario d-inline"><strong>{(props.colaboradores.find(item => item.uid === props.tarea.asignador)).nombre}</strong></p>
                        </div>
                        <div className="col-5">
                            <p className="h6 bg-text-secundario d-block"><strong>Fecha Limite:</strong></p>
                            <p className="h6 bg-text-secundario"><i className="far fa-clock mr-2"></i>{moment(props.tarea.fechaEvento).format('DD/MM/YYYY')}<br />{props.tarea.hora}</p>
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
                <div className="bg-principal p-2 rounded">
                    <div className="row">
                        {archivos.map(archivo =>
                            <div className="bg-secundario p-2 rounded col-3 mr-2">
                                <div className="text-right text-white btnClass" onClick={() => handleRemoveArchivo(archivo)}>X</div>
                                <div className="text-center">
                                    <i className="fas fa-paperclip mb-2"></i>
                                    <snap className="d-block">{archivo}</snap>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="col-12 mt-2">
                <div className="bg-principal p-2 rounded">
                    <div className="mensaje ml-auto p-2">
                        <div className="p-2 progressBar progressToggled" id="progressBar">
                            <i className="far fa-file-archive mr-2"></i>
                            {nombreArchivo}
                            <progress value={porcentaje} max="100" className="ml-2" />
                        </div>
                        <div className="form-group d-inline">
                            <label className="labelinputFile mr-3 ml-4">
                                <i className="fas fa-paperclip"></i>
                                <input type="file" className="InputFile" onChange={(e) => handleOnChange(e)} />
                            </label>
                        </div>
                        <form id="mensaje" onSubmit={(e) => handleTarea(e)} className="d-inline">
                            <input required type="text" onChange={(e) => setMensajeInput(e.target.value)} className="form-control InputMensaje d-inline" />
                            <button className="btn btn-block bg-correcto text-white mt-2" type="submit">Finalizar Tarea</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}
const PropsStore = state => {
    return {
        usuario: state.usuario.usuario,
        colaboradores: state.colaboradores.colaboradores
    }
}
export default connect(PropsStore)(Realizada)