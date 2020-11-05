import React, { useState, useEffect } from 'react'
import InputFilter from './inputColaboradores'
import InputCliente from './inputClientes'
import { connect } from 'react-redux'
import moment from 'moment'
import DatePicker, { DateInput, TimeInput } from '@trendmicro/react-datepicker'
import firebase from '../../context/firebaseConfig'
import { toggleAlert } from '../../layout/alerts'
import ArchivosAdjuntos from './archivosAdjuntos'
import Spinner from './spinnerNuevaTarea'
function Nuevatarea(props) {
    const [estado, setEstado] = useState({ colaboradores: props.colaboradores, responsablesFirebase: [], responsables: [], clientes: [], cliente: { nombre: '', apellido: '' } })
    const [fecha, setFecha] = useState(moment().format('YYYY-MM-DD'))
    const [hora, setHora] = useState(moment().format('hh:mm:ss'))
    const [archivos, setArchivos] = useState([])
    const [nombreArchivos, setNombreArchivos] = useState([])
    const [spinner, setSpinner]= useState(false)
    useEffect(() => {
        setEstado({ ...estado, colaboradores: props.colaboradores, clientes: props.clientes })
    }, [props])
    const toggleTarea = () => {
        document.getElementById('divNuevatarea').classList.toggle('toggleNuevatarea')
        document.getElementById('NuevaTarea').classList.toggle('toggleNuevatarea')
    }
    const AgregarResponsable = (colaborador) => {
        const array = estado.responsables
        const array2 = estado.responsablesFirebase
        const filter = estado.colaboradores.filter(item => item.uid !== colaborador.uid)
        array.push(colaborador)
        array2.push({ uid: colaborador.uid, estatusTarea: false, fechaAsing: fecha })
        setEstado({ ...estado, responsables: array, colaboradores: filter, responsablesFirebase: array2 })
    }
    const RemoverResponsable = (colaborador) => {
        const array = estado.colaboradores
        const filter = estado.responsables.filter(item => item.uid !== colaborador.uid)
        array.push(colaborador)
        setEstado({ ...estado, responsables: filter, colaboradores: array })
    }
    const dataDrop = () => {
        document.getElementById('datadrop').classList.toggle('datadropToggle')
        document.getElementById('coverPicker').classList.toggle('datadropToggle')
    }
    const actualizaFecha = (date) => {
        setFecha(date)
        dataDrop()
    }
    const AgregarCliente = (cliente) => {
        setEstado({ ...estado, cliente: cliente })
        document.getElementById('clientes').classList.toggle('toggle')
        document.getElementById('clientescover').classList.toggle('toggle')
    }
    const handleTarea = async () => {
        if (!estado.titulo) {
            document.getElementById('titulo').classList.add('inputRquerid')
        }
        else if (estado.responsables.length <= 0) {
            document.getElementById('colaboradoresInput').classList.add('inputRquerid')
        }
        else if (!estado.descripcion) {
            document.getElementById('descripcion').classList.add('inputRquerid')
        }
        else {
            let comprobar = 0
            const params = {
                titulo: estado.titulo,
                responsables: estado.responsablesFirebase,
                clienteRelacionado: estado.cliente,
                fechaEvento: fecha,
                descripcion: estado.descripcion,
                empresa: props.usuario.empresa,
                asignador: props.usuario.uid,
                historial: [
                    {
                        tipo: "notificacion",
                        uid: props.usuario.uid,
                        fecha: fecha,
                        data: props.usuario.nombre + ' creo la tarea'
                    }
                ],
                hora: hora,
                autorizacion: false,
                archivos: nombreArchivos
            }
            const referencia = (firebase.database().ref('/tareas').push(params)).key

            await archivos.map(archivo=>{
                firebase.storage().ref(`${referencia}/${archivo.name}`).put(archivo)
                .on('state_changed', (snapshot) => {
                    setSpinner(true)
                }, (error) => {
                    console.error(error.message)
                }, () => {
                    setSpinner(false)
                })
            })
            setEstado({ colaboradores: props.colaboradores,archivos:[], titulo: "", descripcion: "", clientes: props.clientes, responsables: [], cliente: { nombre: '', apellido: '', descripcion: '' } })
            toggleAlert('sucefull', 'Agregado Correctamente')
        }
    }
    return (
        <>
            <button onClick={() => toggleTarea()} className="bg-primary btn rounded-circle text-white btn-tarea"><i className="fas fa-plus"></i></button>
            <div id="NuevaTarea" className="NuevaTarea bg-principal rounded p-3 toggleNuevatarea">
            <Spinner spinner={spinner}/>
                <div className="form-group ">
                    <div className="dropInputPicker" onClick={() => dataDrop()}>
                        <DateInput
                            value={fecha}
                            onChange={value => {
                                setFecha(value);
                            }}

                        />
                    </div>
                    <div id="datadrop" className="datadrop datadropToggle p-2 rounded">
                        <DatePicker
                            locale={'es'}
                            defaultDate={fecha}
                            onSelect={date => actualizaFecha(date)}
                        />
                        <div className="d-flex p-2">
                            <p className="h6 bg-text-secundario mr-3"><strong>Hora de entrega:</strong></p>
                            <TimeInput
                                value={hora}
                                onChange={value => { setHora(value) }}
                            />
                        </div>
                    </div>
                    <div onClick={() => dataDrop()} id="coverPicker" className="coverPicker datadropToggle"></div>
                </div>
                <div className="form-group">
                    <input id="titulo" value={estado.titulo} onFocus={() => document.getElementById('titulo').classList.remove('inputRquerid')} onChange={(e) => setEstado({ ...estado, titulo: e.target.value })} className="form-control inputTituloTarea" placeholder="Escribe el nombre de la tarea" />
                </div>
                <div className="form-group">
                    <label className="col-form-label">Responsables</label>
                    <InputFilter identificador="NuevaTareaInput" colaboradores={estado.colaboradores} AgregarResponsable={AgregarResponsable} />
                </div>
                <div className="form-group row ">
                    {estado.responsables.map(responsable =>
                        <div className="rounded p-2 bg-secundario text-white m-1" key={responsable.key}>
                            <img src={responsable.photo} alt="" className="img-fluid rounded-circle img-drop mr-2" />
                            {responsable.nombre}
                            <div className="btn text-white" onClick={() => RemoverResponsable(responsable)}><i className="fas fa-times"></i></div>
                        </div>)}
                </div>
                <div className="form-group">
                    <label className="col-form-label">Relacionar con cliente</label>
                    <InputCliente clientes={estado.clientes} AgregarCliente={AgregarCliente} cliente={estado.cliente} />
                </div>
                <div className="form-group">
                    <label className="col-form-label">Descripción</label>
                    <textarea value={estado.descripcion} onFocus={() => document.getElementById('descripcion').classList.remove('inputRquerid')} id="descripcion" onChange={(e) => setEstado({ ...estado, descripcion: e.target.value })} className="form-control InputGeneral" />
                </div>
                <div className="form-group">
                    <label className="col-form-label">Adjuntar Archivo</label>
                    <ArchivosAdjuntos setArchivos={setArchivos} archivos={archivos} nombreArchivos={nombreArchivos} setNombreArchivos={setNombreArchivos} />
                </div>
                <div className="form-group row justify-content-end">
                    <button className="bg-correcto btn" onClick={() => handleTarea()}>Comenzar tarea</button>
                </div>
            </div>
            <div id="divNuevatarea" className="divNuevatarea toggleNuevatarea" onClick={() => toggleTarea()}>
            </div>
        </>
    )
}
const PropsStore = state => {
    return {
        colaboradores: state.colaboradores.colaboradores,
        clientes: state.clientes.clientes,
        usuario: state.usuario.usuario
    }
}
export default connect(PropsStore)(Nuevatarea)