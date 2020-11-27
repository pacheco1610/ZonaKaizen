import React from 'react'
import Filtro from '../tareas/filtro'
import Lista from './lista'
export default function index() {
    return (
        <div className="section">
        <h1>Reportes</h1>
        <div className="d-flex" id="wrapper-Container">
            <div id="page-content-container">
                <div className="container-fluid">
                    <div className="cardGeneral">
                        {/*--------------------NAVBAR HEADER--------------------------- */}
                        <nav className="navbar navbar-expand-lg navbar-light bg-principal pt-3">
                            <div className="container">
                                <Filtro/>
                            </div>
                        </nav>
                        <Lista />
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
