import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Modal from '../../layout/modal/index'
import Edit from './editTarea'
import DetallesTarea from './detallesTarea'
import Progreso from './progreso'
import Realizada from './realizada'
import Badges from './badgesTarea'
function List(props) {
    const [tarea, setTarea] = useState({})
    const [modal, setModal] = useState(false)
    const [renderModa, setRenderModal] = useState(1)

    const onDragEnter = (e) => {
        if (e.target.id !== '') {
            document.querySelector(`#${e.target.id} div`).style.opacity = "50%"
        }

    }
    const onDrop = (e, render) => {
        if (e.target.id !== '') {
            document.querySelector(`#${e.target.id} div`).style.opacity = "100%"
        }
        setModal(true)
        setRenderModal(render)
    }
    const onDragLeave = (e) => {
        if (e.target.id !== '') {
            document.querySelector(`#${e.target.id} div`).style.opacity = "100%"
        }

    }
    const renderModal = (renderModa) => {
        switch (renderModa) {
            case 1:
                return (
                    <DetallesTarea tarea={tarea}  />
                )
            case 2:
                return (
                    <Progreso tarea={tarea} setModal={setModal} />
                )
            case 3:
                return (
                    <Realizada tarea={tarea} setModal={setModal}/>
                )
            case 4: 
                    return(
                       <Edit tarea={tarea} setModal={setModal}/>
                    )
        }

    }

    return (
        <>
            <div className="row mt-4">
                <div className="col-4">
                    <div className="card bg-principal">
                        <div className="card-header bg-primary">
                            Tareas
                    </div>
                        <div className="card-body" id="tareas"
                        >
                           <Badges tareas={props.tareas} tipo={false} 
                                setModal={setModal} 
                                setRenderModal={setRenderModal} 
                                setTarea={setTarea}/>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card bg-principal">
                        <div className="card-header bg-warning">
                            En Progreso
                    </div>
                        <div className="card-body" id="enProgreso"
                            onDragOver={(e) => e.preventDefault()}
                            onDragEnter={(e) => onDragEnter(e)}
                            onDrop={(e) => onDrop(e, 2)}
                            onDragLeave={(e) => onDragLeave(e)}
                            >
                                <Badges tareas={props.tareas} tipo="avance" 
                                setModal={setModal} 
                                setRenderModal={setRenderModal} 
                                setTarea={setTarea}/>
                        </div>
                    </div>
                    </div>
                    <div className="col-4">
                        <div className="card bg-principal">
                            <div className="card-header bg-success">
                                Realizada
                            </div>
                            <div className="card-body" id="realizada"
                                onDragOver={(e) => e.preventDefault()}
                                onDragEnter={(e) => onDragEnter(e)}
                                onDrop={(e) => onDrop(e, 3)}
                                onDragLeave={(e) => onDragLeave(e)}>
                                    <Badges tareas={props.tareas} tipo="realizada" 
                                    setModal={setModal} 
                                    setRenderModal={setRenderModal} 
                                    setTarea={setTarea}/>
                            </div>

                        </div>
                    </div>
                </div>
                <Modal toggle={modal} isClose={setModal}>
                    {renderModal(renderModa)}
                </Modal>
        </>
    )
}

const PropsStore = state => {
    return {
                tareas: state.tareas.tareas,
        colaboradores: state.colaboradores.colaboradores,
        usuario: state.usuario.usuario
    }
}
export default connect(PropsStore)(List)