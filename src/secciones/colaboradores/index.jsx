import React,{useState} from 'react'
import Sidebar from '../../layout/sidebarRight'
import NuevoColaborador from './nuevoColaborador'
import Colaboradores from './colaboradores'
import EditColaborador from './editColaborador'
import firebase from '../../context/firebaseConfig'
import './estilos.css'

export default function Index() {
    const [view, Setview] = useState(1)
    const renderView = ()=>{
        switch (view) {
            case 1:
                return(<NuevoColaborador/>)
            case 2:
                return(<EditColaborador/>)
            default:
                break;
        }
    }
    const toggleRight =(render)=>{
        Setview(render)
        if (!document.querySelector('.toggled')) {
            document.getElementById('wrapper-Container').classList.toggle('toggled')
        }
    }

    return (
        <div className="section">
        <h1>Colaboradores</h1>
        <div className="d-flex" id="wrapper-Container">
            <div id="page-content-container">
                <div className="container-fluid">
                    <div className="cardGeneral">
                        {/*--------------------NAVBAR HEADER--------------------------- */}
                        <nav className="navbar navbar-expand-lg navbar-light bg-principal pt-3">
                            <div className="container">
                                <button className="btn bg-primary text-white" onClick={()=>toggleRight(1)}>Nuevo Colaborador</button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                                   
                                </ul>
                            </div>
                            </div>
                        </nav>
                        <Colaboradores toggleRight={toggleRight}/>
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
    )
}
