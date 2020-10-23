import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Modal from '../../layout/modal/index'
import moment from 'moment'
import DetallesTarea from './detallesTarea'
import Progreso from './progreso'
import Realizada from './realizada'
function List(props) {
    const [tarea, setTarea] = useState({})
    const [modal, setModal] = useState(false)
    const [renderModa, setRenderModal] = useState(1)

    useEffect(() => {
        console.log(props.tareas)
    }, props.tareas)

    const imagenResponable = (uid) => {
        const imagen = (props.colaboradores.filter(item => item.uid === uid))[0]
        return imagen.photo
    }
    const filterTareas = (item, estatus) => {
        if (item.minfo) {
            if (item.minfo.estatusTarea === estatus) { /*Aqui le decidiremos si va en tarea, progreso,realizada*/
                return (item)
            }
        } else if (estatus === false) { /* Aqui proyectamos las tareas que tengo asignadas */
            if (item.autorizacion === false) {
                return (item)
            }
        }
    }
    const DragNDrop = (e, tarea) => {
        document.getElementById(e.target.id).classList.add('dragTarea')
        setTarea(tarea)
    }
    const DragEnd = (e) => {
        document.getElementById(e.target.id).classList.remove('dragTarea')
        document.getElementById(e.target.id).style.padding = "-5rem"
    }
    const onDragEnter = (e) => {
        if (e.target.id !== '') {
            document.getElementById(e.target.id).style.paddingTop = "8rem"
        }

    }
    const onDrop = (e, render) => {
        if (e.target.id !== '') {
            document.getElementById(e.target.id).style.padding = "1.25rem"
        }
        setModal(true)
        setRenderModal(render)
    }
    const onDragLeave = (e) => {
        if (e.target.id !== '') {
            document.getElementById(e.target.id).style.padding = "1.25rem"
        }

    }
    const clickTarea = (tarea, renderModal) => {
        setTarea(tarea)
        setModal(true)
        setRenderModal(renderModal)
    }
    const renderModal = (renderModa) => {
        switch (renderModa) {
            case 1:
                return (
                    <DetallesTarea tarea={tarea} />
                )
            case 2:
                return (
                    <Progreso tarea={tarea} />
                )
            case 3:
                return (
                    <Realizada tarea={tarea} />
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
                            onDragOver={(e) => e.preventDefault()}
                            onDragEnter={(e) => onDragEnter(e)}
                            onDrop={(e) => onDrop(e)}
                            onDragLeave={(e) => onDragLeave(e)}>
                            {props.tareas.filter(item => filterTareas(item, false)).map(tarea => {
                                const comprobar = tarea.responsables.find(item => item.uid === props.usuario.uid)
                                if (comprobar !== undefined) {
                                    return (
                                        <div className="bg-light d-block rounded mt-2"
                                            key={tarea.uidTarea}
                                            id={tarea.uidTarea}
                                            draggable
                                            onDragEnd={(e) => DragEnd(e)}
                                            onDragStart={(e) => DragNDrop(e, tarea)}
                                            onClick={() => clickTarea(tarea, 1)}>
                                            <div className="row">
                                                <div className="col-12 card-fecha">
                                                    {moment(tarea.fechaEvento).format("DD/MM/YYYY")}
                                                </div>
                                                <div className="col-12 card-titulo">
                                                    {tarea.titulo}
                                                </div>
                                                <div className="col-12 card-cuerpo">
                                                    <hr />
                                                    {tarea.responsables.map(responsable => <img src={imagenResponable(responsable.uid)} className="rounded-circle" alt="" />)}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className="bg-light d-block rounded mt-2"
                                            key={tarea.uidTarea}
                                            id={tarea.uidTarea}
                                            onDragEnd={(e) => DragEnd(e)}
                                            onDragStart={(e) => DragNDrop(e, tarea)}
                                            onClick={() => clickTarea(tarea, 1)}>
                                            <div className="row">
                                                <div className="col-12 card-fecha">
                                                    {moment(tarea.fechaEvento).format("DD/MM/YYYY")}
                                                </div>
                                                <div className="col-12 card-titulo">
                                                    {tarea.titulo}
                                                </div>
                                                <div className="col-12 card-cuerpo">
                                                    <hr />
                                                    {tarea.responsables.map(responsable => <img src={imagenResponable(responsable.uid)} className="rounded-circle" alt="" />)}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            }
                            )}
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
                            onDragLeave={(e) => onDragLeave(e)}>

                            {props.tareas.filter(item => filterTareas(item, 'avance')).map(tarea =>
                                <div className="bg-light d-block rounded mt-2"
                                    key={tarea.uidTarea}
                                    id={tarea.uidTarea}
                                    draggable
                                    onDragEnd={(e) => DragEnd(e)}
                                    onDragStart={(e) => DragNDrop(e, tarea)}
                                    onClick={() => clickTarea(tarea, 1)}>
                                    <div className="row">
                                        <div className="col-12 card-fecha">
                                            {moment(tarea.fechaEvento).format("DD/MM/YYYY")}
                                        </div>
                                        <div className="col-12 card-titulo">
                                            {tarea.titulo}
                                        </div>
                                        <div className="col-12 card-cuerpo">
                                            <hr />
                                            {tarea.responsables.map(responsable => <img src={imagenResponable(responsable.uid)} className="rounded-circle" alt="" />)}
                                        </div>
                                    </div>
                                </div>
                            )}
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
                            {props.tareas.filter(item => filterTareas(item, 'realizada')).map(tarea =>
                                <div className="bg-light d-block rounded mt-2"
                                    key={tarea.uidTarea}
                                    id={tarea.uidTarea}
                                    draggable
                                    onDragEnd={(e) => DragEnd(e)}
                                    onDragStart={(e) => DragNDrop(e, tarea)}
                                    onClick={() => clickTarea(tarea, 1)}>
                                    <div className="row">
                                        <div className="col-12 card-fecha">
                                            {moment(tarea.fechaEvento).format("DD/MM/YYYY")}
                                        </div>
                                        <div className="col-12 card-titulo">
                                            {tarea.titulo}
                                        </div>
                                        <div className="col-12 card-cuerpo">
                                            <hr />
                                            {tarea.responsables.map(responsable => <img src={imagenResponable(responsable.uid)} className="rounded-circle" alt="" />)}
                                        </div>
                                    </div>
                                </div>
                            )}
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