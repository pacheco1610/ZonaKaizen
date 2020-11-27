import React from 'react'
import './estilos.css'
import { Link } from 'react-router-dom'
import firebase from '../../context/firebaseConfig'
export default function Index(props) {
    const google = new firebase.auth.GoogleAuthProvider();
    const facebook = new firebase.auth.FacebookAuthProvider()
    const socialLogin = async (prev) => {
        await firebase
            .auth()
            .signInWithPopup(prev)
            .catch(error => {
                console.log(error.message)
            });
    }
    return (
        <div>
            <div className="contenedor">
                <div className="card-login">
                    <div className="container bg-secundario p-4 rounded">
                    <h3 className="titulo-bienvenida">Zona Kaizen</h3>
                        <div className="row">
                            <div className="col-12">
                                <input type="email" className="form-control InputGeneral" placeholder="Enter email" />
                            </div>
                            <div className="col-12 mt-3">
                                <input type="email" className="form-control InputGeneral" placeholder="Enter email" />
                            </div>
                            <div className="col-12 mt-3">
                                <button className="btn btn-block btn-primary">Iniciar Sesion</button>
                            </div>
                            <div className="col-12 mt-3 text-center">
                                ¿No tienes cuenta? <Link to="/login">Registrate</Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <hr className="login" />
                            </div>
                            <div className="col-12 mt-2">
                                <button className="btn btn-block btn-google" onClick={() => socialLogin(google)}>Iniciar Sesion Google</button>
                            </div>
                            <div className="col-12 mt-3">
                                <button className="btn btn-block btn-facebook" onClick={() => socialLogin(facebook)}>Iniciar Sesion Facebook</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-imagen ml-4">
                    <img src="/images/login.png" alt="" />
                </div>
            </div>
            <div className="particles">
            </div>
        </div>
    )
}
