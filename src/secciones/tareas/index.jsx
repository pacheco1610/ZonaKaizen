import React,{useState} from 'react'
import './estilos.css'
import Sidebar from '../../layout/sidebarRight'
import ButtonSidebar from '../../layout/buttonSidebar'

import Calendario from './calendario'
import NuevaTarea from './nuevatarea'
import Lista from './lista'

export default function Index() {
    const [view,setView]=useState(1)
    const render = () =>{
        if (view===1) {
            if (document.getElementsByClassName('bg-text-blue').length>1) {
                selectIcon('list') 
            }
            return(<Lista/>)
        }else if(view===2){
            selectIcon('calendar')
            return(<Calendario/>)
        }
    }
    const selectIcon =(id)=>{
        const buttons = document.getElementsByClassName('bg-text-blue')
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.add('bg-text-secundario')
        }
        document.getElementById(id).classList.remove('bg-text-secundario')
        document.getElementById(id).classList.add('bg-text-blue')
    }
    return (
        <div className="section">
            <div className="d-flex" id="wrapper-Container">
                <div id="page-content-container">
                    <div className="container-fluid">
                        <div>
                            {/*--------------------NAVBAR HEADER--------------------------- */}
                            <nav className="navbar navbar-expand-lg navbar-light bg-principal navbarTareas shadow">
                                <div className="container">
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                                        <button id="list" className="btn bg-text-blue" onClick={()=>setView(1)}><i className="fas fa-list-ol"></i></button>
                                        <button id="calendar"className="btn bg-text-secundario" onClick={()=>setView(2)}><i className="far fa-calendar-alt"></i></button>
                                    </ul>
                                </div>
                                </div>
                            </nav>
                            {/*--------------------RENDER BODY--------------------------- */}
                            <div className="container mb-2">
                            </div>
                            {render()}
                        </div>
                    </div>
                </div>
            </div>
            <NuevaTarea/>
        </div>

    )
}
