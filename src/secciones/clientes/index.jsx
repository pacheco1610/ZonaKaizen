import React, { useState } from 'react'
import Sidebar from '../../layout/sidebarRight'
import NuevoCliente from './nuevoCliente'
import './estilos.css'
import Clientes from './clientes'
import EditCliente from './editCliente'

export default function Index() {
    const [view, Setview] = useState(1)
    const [tCliente, setTcliente] = useState('Prospecto')
    const [titulo, setTitulo] = useState('Prospecto')
    const renderView = () => {
        switch (view) {
            case 1:
                return (<NuevoCliente titulo={titulo} tCliente={tCliente} />)
            case 2:
                return (<EditCliente />)
            default:
                break;
        }
    }
    const tabSelect = (tCliente) => {
        setTitulo(tCliente)
        setTcliente(tCliente)
    }
    const toggleRight = (render) => {
        Setview(render)
        if (!document.querySelector('.toggled')) {
            document.getElementById('wrapper-Container').classList.toggle('toggled')
        }
    }
    return (
        <>
            <div className="section">
                <h1>Clientes</h1>
                <div className="d-flex" id="wrapper-Container">
                    <div id="page-content-container">
                        <div className="container-fluid">
                            <div className="cardGeneral">
                                {/*--------------------NAVBAR HEADER--------------------------- */}
                                <nav className="navbar navbar-expand-lg navbar-light bg-principal pb-3 pt-3">
                                    <div className="container">
                                        <button className="btn bg-primary text-white" onClick={() => toggleRight(1)}>Agregar {titulo}</button>
                                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">

                                            </ul>
                                        </div>
                                    </div>
                                </nav>
                                <div className="row tab-clientes">
                                    <nav>
                                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                            <a onClick={() => tabSelect('Prospecto')} className="nav-item nav-link active" name="prospectos" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Prospectos</a>
                                            <a onClick={() => tabSelect('Contactado')} className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Contactados</a>
                                            <a onClick={() => tabSelect('Cliente Activo')} className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Clientes Activos</a>
                                            <a onClick={() => tabSelect('Cliente Satisfecho')} className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-satisfechos" role="tab" aria-controls="nav-satisfechos" aria-selected="false">Clientes Satisfecho</a>
                                        </div>
                                    </nav>
                                    <div className="tab-content btn-block mt-2" id="nav-tabContent">
                                        <div className="tab-pane fade show active" name="Propspecto" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                            <Clientes tCliente={tCliente} toggleRight={toggleRight} />
                                        </div>
                                        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                            <Clientes tCliente={tCliente} toggleRight={toggleRight} />
                                        </div>
                                        <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                            <Clientes tCliente={tCliente} toggleRight={toggleRight} />
                                        </div>
                                        <div className="tab-pane fade" id="nav-satisfechos" role="tabpanel" aria-labelledby="nav-contact-tab">
                                            <Clientes tCliente={tCliente} toggleRight={toggleRight} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Sidebar>
                        <div className="row">
                            <div className="col-12">
                                {renderView()}
                            </div>
                        </div>
                    </Sidebar>
                </div>
            </div>
        </>
    )
}
