import React from 'react'
import firebase from '../context/firebaseConfig'
import Alert,{toggleAlert} from './alerts'
export default function navbar() {
    const signOut = ()=>{
        firebase.auth().signOut()
        window.location.reload()
    }
    return (
        <React.Fragment>
        <Alert/>
        <nav className="navbar navbar-expand-lg navbar-light bg-principal pb-3 pt-3">
            <div className="container">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
 
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                    <button className="btn  bg-text-secundario" onClick={()=>toggleAlert("warning",'ahora si es un texto machin larguisimo')}><i className="fas fa-bell"></i></button>
                    <button className="btn  bg-text-secundario"><i className="fas fa-cog"></i></button>
                    <button className="btn bg-text-secundario" onClick={()=>signOut()}>
                        Salir
                        <i className="fas fa-sign-out-alt ml-2"></i>
                    </button>
                </ul>
            </div>
            </div>
        </nav>
        </React.Fragment>
    )
}
