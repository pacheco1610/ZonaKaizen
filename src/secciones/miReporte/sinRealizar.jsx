import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import DetallesTarea from '../tareas/detallesTarea'
import Modal from '../../layout/modal/index'
function SinRealizar(props) {
    const [noRealizadas, setnoRealizadas] = useState([])
    const [modal, setModal] = useState(false)
    const [tarea, setTarea] = useState({})
    useEffect(() => {
        setnoRealizadas(props.tareas.filter(tarea =>
            filterRealizadas(tarea)
        ))
    }, [props.tareas])
    const filterRealizadas = (tarea) => {
        if (tarea.fechaEvento === moment().format('YYYY-MM-DD') && tarea.responsables.find(item => item.uid === props.usuario.uid).estatusTarea !== 'false') {
            return (tarea)
        }
    }
    const abrirTarea = (tarea) => {
        setModal(true)
        setTarea(tarea)
    }
   if (noRealizadas.length> 0) {
    return (
        <>
            <div className="container">
                {noRealizadas.map(tarea => {
                    return (<button type="button" onClick={() => abrirTarea(tarea)} className="btn btn-block text-left bg-danger text-white m-2 p-2 rounded">{tarea.titulo}</button>)
                })}
            </div>
            <Modal toggle={modal} isClose={setModal}>
                <DetallesTarea tarea={tarea} />
            </Modal>
        </>
    )
   }else{
        return(
            <span className="d-block">Felicidades terminaste tus tareas de hoy</span>
        )
   }
}

const PropsStore = state => {
    return {
        tareas: state.tareas.tareas,
        usuario: state.usuario.usuario
    }
}
export default connect(PropsStore)(SinRealizar)
