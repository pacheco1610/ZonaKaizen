import React,{useState} from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import DetallesTarea from '../tareas/detallesTarea'
import Modal from '../../layout/modal/index'
function TareasRealizadas(props) {
    const [modal, setModal] = useState(false)
    const [tarea, setTarea] = useState({})
    const abrirTarea = (tarea) => {
        setModal(true)
        setTarea(tarea)
    }
    return (
        <>
            <div className="container">
                {props.tareas.map(tarea => {
                    if ((tarea.responsables.find(responsable => responsable.uid === props.usuario.uid
                        && responsable.estatusTarea === "realizada" && responsable.fechaRealizada === moment().format('YYYY-MM-DD')))) {
                        return (<button type="button" onClick={() => abrirTarea(tarea)} className="btn btn-block text-white text-left bg-correcto m-2 p-2 rounded">{tarea.titulo}</button>)
                    }
                })}
            </div>
            <Modal toggle={modal} isClose={setModal}>
                <DetallesTarea tarea={tarea}/>
            </Modal>
        </>
    )
}
const PropsStore = state => {
    return {
        tareas: state.tareas.tareas,
        usuario: state.usuario.usuario
    }
}
export default connect(PropsStore)(TareasRealizadas)