import React, { useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/es';
import { connect } from 'react-redux'
import Realizadas from './tareasRealizadas'
import Pendientes from './pendientes'
import NuevaTarea from '../tareas/nuevatarea'
import firebase from '../../context/firebaseConfig'
import SinRealziar from './sinRealizar'

function ReporteDia(props) {
    const [TareasRealizadas, setTareasRealizadas] = useState([])
    const [TareasAgendadas, setTareasAgendadas] = useState([])
    const [objetivo, setObjetivo] = useState('')
    const [confirmacion, setConfirmado] = useState(undefined)
    const [noRealizadas, setnoRealizadas] = useState([])
    useEffect(() => {
        setTareasRealizadas(props.tareas.filter(tarea => tarea.responsables.find(responsable => responsable.uid = props.usuario.uid).estatusTarea === "realizada"))
        setTareasAgendadas(props.tareas.filter(tarea => tarea.fechaEvento === moment().add(1, 'days').format('YYYY-MM-DD')))
        setnoRealizadas(props.tareas.filter(tarea =>
            filterRealizadas(tarea)
        ))
    }, [props.tareas])
    const filterRealizadas = (tarea) => {
        if (tarea.fechaEvento === moment().format('YYYY-MM-DD') && tarea.responsables.find(item => item.uid === props.usuario.uid).estatusTarea !== 'false') {
            return (tarea)
        }
    }
    const TareaToggle = () => {
        document.getElementById('divNuevatarea').classList.toggle('toggleNuevatarea')
        document.getElementById('NuevaTarea').classList.toggle('toggleNuevatarea')
    }
    const enviarReporte = (e) => {
        e.preventDefault()
        if (confirmacion !==undefined) {
            const reporte = 
                {
                    fecha:moment().format('YYYY-MM-DD'),
                    TareasRealizadas:TareasRealizadas,
                    TareasAgendadas:TareasAgendadas,
                    TareasNoRealizadas:noRealizadas,
                    Retroalimentacion:objetivo,
                    estatus:true
                }
            if (props.usuario.reportes!==undefined) {
                const arreglo = props.usuario.reportes.filter(item =>  moment(item.fecha).format('YYYY-MM-DD') !==  moment().format('YYYY-MM-DD'))
                arreglo.push(reporte)
                firebase.database().ref(`usuarios/${props.usuario.key}`).update({reportes:arreglo})
            }else{
                const reportes= [reporte]
                firebase.database().ref(`usuarios/${props.usuario.key}`).update({reportes:reportes})
            }
        }else{
            document.getElementById('confirmacion').classList.add('border')
            document.getElementById('confirmacion').classList.add('border-danger')
        }
    }
    const confirmacionTarea = (data) =>{
        setConfirmado(data)
        if (data!==false) {
            document.getElementById('addtarea').setAttribute('style','display:"" !important')
        }
        document.getElementById('confirmacion').setAttribute('style','display:none !important')
    }
    return (
        <>
            <div className="">
                <p className="h4 text-center">Informe de actividades del día {moment().format("Do MMMM YYYY")}</p>
                <form action="" className="row" onSubmit={(e) => enviarReporte(e)}>
                    <div className="col-12">
                        <div class="form-group"><p class="h6 d-inline bg-text-secundario">
                            <strong className="">Retroalimentacion</strong></p>
                            <textarea id="descripcion" onChange={(e) => setObjetivo(e.target.value)} className="form-control InputGeneral mt-2" required></textarea>
                        </div>
                    </div>
                    <div className="col-12">
                        <p class="h6 d-inline bg-text-secundario"><strong>Tus tareas realizadas</strong></p>
                        <Realizadas />
                        <div className="container">
                            <div className="d-flex align-items-center bg-primary text-left m-2 p-2 rounded text-white"  id="confirmacion">
                                ¿Deseas agregar mas tareas?
                                <div className="ml-auto">
                                <button type="button" className="btn border text-white mr-2" onClick={()=>confirmacionTarea(true)}>Si</button>
                                <button type="button" className="btn border text-white" onClick={()=>confirmacionTarea(false)}>No</button>
                                </div>
                            </div>
                            <button type="button" onClick={() => TareaToggle()} id="addtarea" style={{display:'none'}} className="btn btn-block bg-primary text-left m-2 p-2 rounded text-white"><i className="fas fa-plus"></i> Agregar Tarea</button>
                        </div>
                    </div>
                    <div className="col-12">
                        <p className="h6 dinline bg-text-secundario">
                            <strong>Tareas sin terminar</strong>
                            <SinRealziar/>
                        </p>
                    </div>
                    <div className="col-12">
                        <p class="h6 d-inline bg-text-secundario"><strong>Mis prioridades de mañana</strong></p>
                        <Pendientes />
                        <div className="container">
                            <button type="button" onClick={() => TareaToggle()} className="btn btn-block bg-primary text-left m-2 p-2 rounded text-white"><i className="fas fa-plus"></i> Agregar Tarea para mañana</button>
                        </div>
                    </div>
                    <div className="container mt-2 d-flex">
                        <button type="submit" className="btn bg-primary text-white ml-auto">Enviar Reporte</button>
                    </div>
                </form>
            </div>
            <NuevaTarea RenderButton={false} />
        </>
    )
}
const PropsStore = state => {
    return {
        usuario: state.usuario.usuario,
        tareas: state.tareas.tareas
    }
}
export default connect(PropsStore)(ReporteDia)