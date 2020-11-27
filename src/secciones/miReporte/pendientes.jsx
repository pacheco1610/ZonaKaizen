import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import DetallesTarea from '../tareas/detallesTarea'
import Modal from '../../layout/modal/index'
function Pendientes(props) {
    const [manana, setManana] = useState([])
    const [modal, setModal] = useState(false)
    const [tarea, setTarea] = useState({})

    useEffect(() => {
        setManana(props.tareas.filter(tarea => tarea.fechaEvento === moment().add(1, 'days').format('YYYY-MM-DD')))
    }, [props.tareas])
    const abrirTarea = (tarea) => {
        setModal(true)
        setTarea(tarea)
    }

    if (manana.length > 0) {
        return (
            <>
                <div className="container">
                    {manana.map(tarea => {
                        return (<button type="button" onClick={() => abrirTarea(tarea)} className="btn btn-block text-left bg-secundario text-white m-2 p-2 rounded">{tarea.titulo}</button>)
                    })}
                </div>
                <Modal toggle={modal} isClose={setModal}>
                    <DetallesTarea tarea={tarea} />
                </Modal>
            </>
        )
    } else {
        return (
            <>
                <span className="d-block">Planea tu dia de mañana</span>
                <Modal toggle={modal} isClose={setModal}>
                    <DetallesTarea tarea={tarea} />
                </Modal>
            </>
        )
    }

}
const PropsStore = state => {
    return {
        tareas: state.tareas.tareas,
        usuario: state.usuario.usuario
    }
}
export default connect(PropsStore)(Pendientes)
