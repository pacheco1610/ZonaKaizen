import React, { useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

function BadGesTarea(props) {
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
    const DragEnd = (e) => {
        document.getElementById(e.target.id).classList.remove('dragTarea')
        document.getElementById(e.target.id).style.padding = "-5rem"
    }
    const DragNDrop = (e, tarea) => {
        document.getElementById(e.target.id).classList.add('dragTarea')
        props.setTarea(tarea)
    }
    const clickTarea = (tarea, renderModal) => {
        props.setTarea(tarea)
        props.setModal(true)
        if (renderModal===1&&tarea.asignador===props.usuario.uid) {
            props.setRenderModal(4)
        }else{
            props.setRenderModal(renderModal)
        }
        
    }
    const toggleTarea = () => {
        document.getElementById('divNuevatarea').classList.toggle('toggleNuevatarea')
        document.getElementById('NuevaTarea').classList.toggle('toggleNuevatarea')
    }
    if (props.tareas.filter(item => filterTareas(item, props.tipo)).length > 0) {
        return (
            props.tareas.filter(item => filterTareas(item, props.tipo)).map(tarea => {
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
                                    {tarea.responsables.map(responsable => <img src={(props.colaboradores.find(item => item.uid === responsable.uid)).photo} className="rounded-circle" alt="" />)}
                                </div>
                            </div>
                        </div>
                    )
                }else{
                    return(
                        <div className="bg-light d-block rounded mt-2"
                            key={tarea.uidTarea}
                            id={tarea.uidTarea}
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
                                    {tarea.responsables.map(responsable => <img src={(props.colaboradores.find(item => item.uid === responsable.uid)).photo} className="rounded-circle" alt="" />)}
                                </div>
                            </div>
                        </div>
                    )
                }
            }
            ))
    } else if(props.tipo===false){
        return (
            <div className="p-5 DragZoneNuevaTarea text-center" onClick={()=>toggleTarea()}>
                <i class="fas fa-plus-circle"></i>
                <p className="h6">Crea una nueva tarea</p>
            </div>
        )
    }else{
        return (
            <div className="p-5 DragZone text-center">
                <p className="h6">Arrastra tus tareas</p>
            </div>
        )
    }

}

const PropsStore = state => {
    return {
        tareas: state.tareas.tareas,
        colaboradores: state.colaboradores.colaboradores,
        usuario: state.usuario.usuario
    }
}
export default connect(PropsStore)(BadGesTarea)