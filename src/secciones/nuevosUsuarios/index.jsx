import React,{useState} from 'react'
import './estilos.css'
import firebase from '../../context/firebaseConfig'


import Bienvenida from './bienvenida'
import Empleado from './empleado'
import Empresa from './empresa'
export default function Index(props) {
    const [render, setRender] =useState(1)

    const UpdateView =(view) =>{
        setRender(view)
    }
    const renderView = (render) =>{
        switch (render) {
            case 1:
                return(<Bienvenida UpdateView={UpdateView}/>)
            case 2:
                return(<Empleado usuario={props.usuario}/>)
            case 3:
                return(<Empresa/>)
            default:
                break;
        }
    }
    return (
        <div>
            <div className="contenedor">
                <div className="card-login">
                    <h1 className="titulo-bienvenida">Bienvenido</h1>
                    {renderView(render)}
                    <div className="row">
                        <div className="col-4 ml-auto mt-3">
                            <button className="btn btn-block bg-secundario text-white" onClick={()=>firebase.auth().signOut()}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
