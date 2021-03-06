import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Menu from './menu'
import firebase from '../context/firebaseConfig'

function Sidebar(props) {
    const [estado, setEstado] = useState({ puesto: 'puesto' })
    useEffect(() => {
        const puesto = props.puestos.filter(item => item.key === props.usuario.puesto)[0]
        if (puesto !== undefined) {
            setEstado({ ...estado, puesto: puesto.Puesto })
        }
    }, [props.puestos])
    const handleOnChange = (event) => {
        const file = event.target.files[0]
        const update = firebase.storage().ref(`img/${props.usuario.uid}`).put(file)
        update.on('state_changed', (snapshot) => {
        }, (error) => {
        }, () => {
            update.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                firebase.database().ref('usuarios').orderByChild('uid').equalTo(props.usuario.uid).on('child_added',(snap)=>{
                    firebase.database().ref(`usuarios/${snap.key}`).update({photo:downloadURL})
                })
                //
              });
        })
    }
    return (
        <div id="sidebar-container" className="bg-principal">
            <div className="logo text-center mt-3">
                <h4 className="text-light font-weight-bold mb-0">ZonaKaizen</h4>
            </div>
            <div className="row mt-5 justify-content-center ">
                <label className="label text-center ImgPerfilDiv">
                    <img src={props.usuario.photo}
                        alt=""
                        className="img-fluid rounded-circle img-perfil"
                    />
                    <div className="imgContenido img-fluid rounded-circle">
                        <strong>Cambiar imagen de perfil</strong>
                    </div>
                    <input type="file" accept="image/*" onChange={(e) => handleOnChange(e)} />
                </label>
            </div>
            <div className="row text-center justify-content-center mt-2">
                <div className="col-12">
                    <h4 className="h-small">{props.usuario.nombre}</h4>
                </div>
            </div>
            <div className="row text-center mt-2">
                <div className="col-6">
                    <h4 className="span-small">{estado.puesto}</h4>
                </div>
                <div className="col-6">
                    <h4 className="span-small">{props.empresa.nombre}</h4>
                </div>
            </div>

            <div className="row justify-content-center mt-2">
                <button className="btn button-nivel">Nivel: {props.usuario.puntaje.nivel}</button>
            </div>
            <div className="menu mt-4">
                <Menu estado={estado} />
            </div>
        </div>
    )
}

const PropsStore = state => {
    return {
        usuario: state.usuario.usuario,
        empresa: state.empresa,
        puestos: state.puestos.puestos,
        permisos: state.permisos.permisos
    }
}
export default connect(PropsStore)(Sidebar)