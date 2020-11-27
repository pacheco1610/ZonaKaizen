import React from 'react'
import { useLocation, Link } from 'react-router-dom'


import { connect } from 'react-redux'


function Menu(props) {
    const locaction = useLocation().pathname
    const menuResult = props.usuario.menu.concat(
        { direccion: '/', icono: 'fas fa-calendar-check', key: 1, titulo: 'Tareas' },
        { direccion: '/mireporte', icono: 'fas fa-id-card-alt', key: 6, titulo: 'Mis Reportes' }
    )
    const permisosResult = props.permisos.concat(
        { direccion: '/', icono: 'fas fa-calendar-check', key: 1, titulo: 'Tareas' },
        { direccion: '/mireporte', icono: 'fas fa-id-card-alt', key: 6, titulo: 'Mis Reportes' }
    )
    const menu = menuResult.sort(function (a, b) {
        return (a.key - b.key)
    })
    const permisos = permisosResult.sort(function (a, b) {
        return (a.key - b.key)
    })
    if (props.estado.puesto !== 'Dueño') {
        return (menu.map(seccion => {
            if (seccion.direccion === locaction) {
                return (
                    <Link to={seccion.direccion} key={seccion.key} className="d-block button-sidebarSelect p-3 pl-4">
                        <i className={`${seccion.icono} mr-3`}></i>
                        <span>{seccion.titulo}</span>
                    </Link>
                )
            } else {
                return (
                    <Link to={seccion.direccion} key={seccion.key} className="d-block button-sidebar p-3 pl-4">
                        <i className={`${seccion.icono} mr-3`}></i>
                        <span>{seccion.titulo}</span>
                    </Link>
                )
            }
        }))
    } else {
        return (permisos.map(seccion => {
            if (seccion.direccion === locaction) {
                return (
                    <Link to={seccion.direccion} key={seccion.key} className="d-block button-sidebarSelect p-3 pl-4">
                        <i className={`${seccion.icono} mr-3`}></i>
                        <span>{seccion.titulo}</span>
                    </Link>
                )
            } else {
                return (
                    <Link to={seccion.direccion} key={seccion.key} className="d-block button-sidebar p-3 pl-4">
                        <i className={`${seccion.icono} mr-3`}></i>
                        <span>{seccion.titulo}</span>
                    </Link>
                )
            }
        }))
    }
}


const PropsStore = state => {
    return {
        usuario: state.usuario.usuario,
        permisos: state.permisos.permisos
    }
}
export default connect(PropsStore)(Menu)