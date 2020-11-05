import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import firebase from '../../context/firebaseConfig'
import moment from 'moment'
import Responsables from './responsables'
import Mensajes from './mensajes'
import Tooltip from '../../layout/tooltip'
import InputFilter from './inputColaboradores'
import DatePicker, { DateInput, TimeInput } from '@trendmicro/react-datepicker'
import responsables from './responsables'
function DetallesTarea(props) {
    const [MensajeInput, setMensajeInput] = useState()
    const [porcentaje, setporcentaje] = useState(0)
    const [nombreArchivo, setnombreArchivo] = useState('')
    const [toggleTooltip, setToggleTooltip] = useState(false)
    const [dataTooltip, setDataTooltip] = useState('')
    const [data, setData] = useState(props.tarea)
    useEffect(() => {
        firebase.database().ref(`tareas/${props.tarea.uidTarea}`).on('child_changed',snap=>{
            setData({...data,[snap.key]:snap.val()})
        })
        setTimeout(ScrollChat,100);
    },[])
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
        setTimeout(ScrollChat,100);
    }
    function ScrollChat(){
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
        setData({ ...data, responsables: data.responsables.concat({ estatusTarea: false, fechaAsing: moment().format('YYYY-MM-DD'), uid: colaborador.uid })})
        firebase.database().ref(`tareas/${props.tarea.uidTarea}`).update({responsables:data.responsables.concat({ estatusTarea: false, fechaAsing: moment().format('YYYY-MM-DD'), uid: colaborador.uid })})
    }
    const DescarArchivo = (item) => {
        firebase.storage().ref(`/-MKpOLkLBZVe6GBu-Yl7/254417-P48REP-313_0003_Capa-4.png`).getDownloadURL().then(function (url) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function (event) {
                var blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();

        }).catch(function (error) {
            // Handle any errors
        });
    }
    const autorizarTarea = () =>{
        firebase.database().ref(`tareas/${props.tarea.uidTarea}`).update({autorizacion:true})
        props.setModal(false)
    }
    const update =(campo,data)=>{
        firebase.database().ref(`tareas/${props.tarea.uidTarea}`).update({[campo]:data})
    }
    const removeResponsable = (colaborador) =>{
        const filter =  data.responsables.filter(item => item.uid !== colaborador.uid)
        setData({ ...data, responsables: filter})
        firebase.database().ref(`tareas/${props.tarea.uidTarea}`).update({responsables:filter})
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
                        <p className="h4">{data.titulo}</p>
                    </div>
                    <div className="col-12">
                        <div className="container bg-principal p-2 rounded">
                            <div className="row">
                                <div className="col-7">
                                    <p className="h6 bg-text-secundario d-block"><strong>Asignada por:</strong></p>
                                    <img src={(props.colaboradores.find(item => item.uid === data.asignador)).photo} alt="" className="img-fluid rounded-circle img-drop mr-2" />
                                    <p className="h6 bg-text-secundario d-inline"><strong>{(props.colaboradores.find(item => item.uid === data.asignador)).nombre}</strong></p>
                                </div>
                                <div className="col-5">
                                    <p className="h6 bg-text-secundario d-block"><strong>Fecha Limite:</strong></p>
                                    <div className="dropInputPickerEdit" onClick={() => dataDrop()}>
                                        <DateInput
                                            value={data.fechaEvento}
                                            onChange={value => {
                                                setData({ ...data, fechaEvento: value })
                                            }}

                                        />
                                    </div>
                                    <div id="datadropEdit" className="datadropEdit datadropToggle p-2 rounded">
                                        <DatePicker
                                            locale={'es'}
                                            defaultDate={data.fechaEvento}
                                            onSelect={date => actualizaFecha(date)}
                                        />
                                        <div className="d-flex p-2">
                                            <p className="h6 bg-text-secundario mr-3"><strong>Hora de entrega:</strong></p>
                                            <TimeInput
                                                value={data.hora}
                                                onChange={value => setData({ ...data, hora: value })}
                                            />
                                        </div>
                                    </div>
                                    <div onClick={() => dataDrop()} id="coverPickerEdit" className="coverPicker datadropToggle"></div>
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
                            <textarea value={data.descripcion} onBlur={()=>update('descripcion',data.descripcion)} onChange={(e) => setData({ ...data, descripcion: e.target.value })} className="form-control InputGeneral mt-2" rows="1" placeholder="Agrega un cometario a tu avance" />
                        </div>
                    </div>
                    <div className="col-12 mt-2">
                        <div className="d-inline bg-text-secundario">
                            <i className="fas fa-users mr-2"></i>
                            <p className="h6 d-inline"><strong>Responsables</strong></p>
                        </div>
                        <div className="mb-2 mt-1">
                            <InputFilter AgregarResponsable={AgregarResponsable} colaboradores={props.colaboradores.filter(item => filterColaboradores(item))} identificador="EditTareaInput" />
                        </div>
                        {data.responsables.map(responsable => {
                            return (<Responsables responsable={responsable} removeResponsable={removeResponsable} colaborador={props.colaboradores.find(item => item.uid === responsable.uid)} edit={true}/>)
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
                                <label className="col-12 col-md-6 col-xl-8 " ><i className="fas fa-envelope-open-text"></i> {data.clienteRelacionado.email}</label>
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
                    <div className="col-12 mt-2">
                        <button className="btn btn-block bg-success text-white" onClick={()=>autorizarTarea()}>Autorizar Tarea</button>
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