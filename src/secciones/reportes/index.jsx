import React from 'react'
import Filtro from './filtro'
import { connect } from 'react-redux'
function Index(props) {
    const Nreportes = (reportes) => {
        const filter = reportes.filter(item => item.estatus !== true)
        if (filter.lengt===0) {
            return('reportes completos')
            
        }else{
            return(`${filter.length} reportes pendientes`)
        }
    }
    return (
        <div className="section">
            <h1>Reportes</h1>
            <div className="d-flex" id="wrapper-Container">
                <div id="page-content-container">
                    <div className="container-fluid">
                        <div className="cardGeneral">
                            {/*--------------------NAVBAR HEADER--------------------------- */}
                            <nav className="navbar navbar-expand-lg navbar-light bg-principal pt-3">

                            </nav>
                            <div className="row">
                                {props.colaboradores.map(colaborador => {
                                    if (colaborador.reportes!==undefined) {
                                        return (<div className="col-12 bt-block btn text-white bg-secundario rounded p-1 m-1">
                                        <div className="container d-flex">
                                            <div>
                                                <img src={colaborador.photo}
                                                className="rounded-circle imgFiltro mr-2" key={colaborador.uid} id={colaborador.uid} />
                                                <label htmlFor="">{colaborador.nombre}</label>
                                            </div>
                                            <div className="ml-auto">
                                                <label htmlFor="">{Nreportes(colaborador.reportes)}</label>
                                            </div>
                                        </div>
                                    </div>)
                                    }else{
                                        return (<div className="col-12 bt-block btn text-white bg-secundario rounded p-1 m-1">
                                        <div className="container d-flex">
                                            <div>
                                                <img src={colaborador.photo}
                                                className="rounded-circle imgFiltro mr-2" key={colaborador.uid} id={colaborador.uid} />
                                                <label htmlFor="">{colaborador.nombre}</label>
                                            </div>
                                            <div className="ml-auto">
                                                <label htmlFor="">Sin reportes</label>
                                            </div>
                                        </div>
                                    </div>)
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const PropsStore = state => {
    return {
        colaboradores: state.colaboradores.colaboradores
    }
}
export default connect(PropsStore)(Index)