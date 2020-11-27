import React, { useState } from 'react'
import { connect } from 'react-redux'
import moment, { utc } from 'moment'
import LinesEllipsis from 'react-lines-ellipsis'
import 'moment-timezone'
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
        const covers = document.getElementsByClassName(`avanceCover`)
        for (let index = 0; index < covers.length; index++) {
            covers[index].style.opacity = "1" 
        }
    }
    const DragNDrop = (e, tarea) => {
        document.getElementById(e.target.id).classList.add('dragTarea')
        props.setTarea(tarea)
        const covers = document.getElementsByClassName(`avanceCover`)
        for (let index = 0; index < covers.length; index++) {
            covers[index].style.opacity = "0.1" 
        }
    }
    const clickTarea = (tarea, renderModal) => {
        props.setTarea(tarea)
        props.setModal(true)
        if (renderModal === 1 && tarea.asignador === props.usuario.uid) {
            props.setRenderModal(4)
        } else {
            props.setRenderModal(renderModal)
        }

    }
    const toggleTarea = () => {
        document.getElementById('divNuevatarea').classList.toggle('toggleNuevatarea')
        document.getElementById('NuevaTarea').classList.toggle('toggleNuevatarea')
    }
    const fechas = (fecha,hora) => {
        const utcFecha = moment(`${fecha}T${hora}`).tz('America/Bahia_Banderas').format()
        const today = moment().tz('America/Bahia_Banderas').format()
        if (moment(today).isAfter(utcFecha)) {
            return (<div className="float-right text-danger">finalizo {moment(utcFecha).endOf('day').fromNow()}</div>)
        } else {
            return (<div className="float-right bg-text-warning">finaliza {moment(utcFecha).endOf('day').from(today)}</div>)
        }
        /*
        {moment().isAfter(tarea.fechaEvento)
            ? 
            : 
        }*/
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
                                <div className="col-12 card-fecha align-items-center">
                                    {moment(tarea.fechaEvento).format("DD/MM/YYYY")}
                                    {fechas(tarea.fechaEvento,tarea.hora)}

                                </div>
                                <div className="col-12 card-titulo">
                                    {tarea.titulo}
                                </div>
                                <div className="col-12 card-cuerpo">
                                    <LinesEllipsis
                                        text={tarea.descripcion}
                                        maxLine='2'
                                        ellipsis='...'
                                        trimRight
                                        basedOn='letters'
                                    />
                                    <hr />
                                    {tarea.responsables.map(responsable => <img src={(props.colaboradores.find(item => item.uid === responsable.uid)).photo} className="rounded-circle mr-1" alt="" />)}
                                </div>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className="bg-light d-block rounded mt-2"
                            key={tarea.uidTarea}
                            id={tarea.uidTarea}
                            onClick={() => clickTarea(tarea, 1)}>
                            <div className="row">
                                <div className="col-12 card-fecha">
                                    {moment(tarea.fechaEvento).format("DD/MM/YYYY")}
                                    {fechas(tarea.fechaEvento,tarea.hora)}
                                </div>
                                <div className="col-12 card-titulo">
                                    {tarea.titulo}
                                </div>
                                <div className="col-12 card-cuerpo">
                                    <LinesEllipsis
                                        text={tarea.descripcion}
                                        maxLine='2'
                                        ellipsis='...'
                                        trimRight
                                        basedOn='letters'
                                    />
                                    <hr />
                                    {tarea.responsables.map(responsable => <img src={(props.colaboradores.find(item => item.uid === responsable.uid)).photo} className="rounded-circle" alt="" />)}
                                </div>
                            </div>
                        </div>
                    )
                }
            }
            ))
    } else if (props.tipo === false) {
        return (
            <div className="p-5 DragZoneNuevaTarea text-center" onClick={() => toggleTarea()}>
                <i class="fas fa-plus-circle"></i>
                <p className="h6">Crea una nueva tarea</p>
            </div>
        )
    } else {
        return (
            <></>
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