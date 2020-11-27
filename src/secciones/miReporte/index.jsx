import React from 'react'
import Sidebar from '../../layout/sidebarRight'
import ReporteDia from './reporteDia'
export default function index() {
    return (
        <div className="section">
            <h1>Mis Reportes</h1>
            <div className="d-flex" id="wrapper-Container">
                <div id="page-content-container">
                    <div className="container-fluid">
                        <div className="cardGeneral">
                            {/*--------------------NAVBAR HEADER--------------------------- */}
                            <nav className="navbar navbar-expand-lg navbar-light bg-principal pt-3">
                                <div className="container">
                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">

                                        </ul>
                                    </div>
                                </div>
                            </nav>
                            <ReporteDia />

                        </div>
                    </div>
                </div>
                <Sidebar>
                    <div className="row">
                        <div className="col-12">
                            <ReporteDia />
                        </div>
                    </div>
                </Sidebar>
            </div>
        </div>
    )
}
