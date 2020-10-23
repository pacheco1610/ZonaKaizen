import React from 'react'
import './estilos.css'
import {Link} from 'react-router-dom'
import Sidebar from '../../layout/sidebarRight'

export default function index(props) {
    return (
        <div className="section">
        <h1>Perfil de Puestos</h1>
        <div className="d-flex" id="wrapper-Container">
            <div id="page-content-container">
                <div className="container-fluid">
                    <div className="cardGeneral">
                        {/*--------------------NAVBAR HEADER--------------------------- */}
                        <nav className="navbar navbar-expand-lg navbar-light bg-principal pb-3 pt-3">
                            <div className="container">
                                <Link className="btn btn-primary" to="/perfildepuestos/nuevoPuesto">Nuevo Puesto</Link>
                            </div>
                        </nav>
                        {props.children}
                    </div>
                </div>
            </div>
            <Sidebar>
                <div className="row">
                    <div className="col-12">
                        Jalate
                    </div>
                </div>
            </Sidebar>
        </div>
    </div>
    )
}
