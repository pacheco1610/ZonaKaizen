import React, { useEffect, useState } from 'react'
import firebase from '../../context/firebaseConfig'
import { useParams,Redirect } from "react-router-dom";
export default function Invitacion() {
    const [user,setUser]=useState(false);
    const [id, setId] = useState(useParams().id)
    const [data, setData] = useState({})
    const [empresa, setEmpresa] = useState({})
    useEffect(() => {
        firebase.auth().onAuthStateChanged(async user => {
            if (user) {
                await firebase.database().ref('usuarios').orderByChild('uid').equalTo(`${id}`).on('child_added', async snap => {
                    firebase.database().ref(`usuarios/${snap.key}`).update({
                        photo:user.photoURL,
                        uid:user.uid,
                        nombre:user.displayName,
                        estatus:true
                    })
                    await firebase.database().ref('tareas').orderByChild('empresa').equalTo(snap.val().empresa).on('child_added', tarea => {
                        const misdatos = (tarea.val().responsables.find(item => item.uid === id))
                        if (misdatos !== undefined) {
                            const responsable = tarea.val().responsables.find(item => item.uid === id)
                            const filter = tarea.val().responsables.filter(item => item.uid !== id)
                            const array = filter.concat({ estatusTarea: false, fechaAsing: responsable.fechaAsing, uid: user.uid })
                            firebase.database().ref(`tareas/${tarea.key}`).update({ ...tarea.val(), responsables: array })
                        }
                    })
                })
                window.location.replace(window.location.origin);
                
            } else {
                setUser(false)
            }
    });
        firebase.database().ref('usuarios').orderByChild('uid').equalTo(`${id}`).on('child_added', snap => {
            setData(snap.val())
            firebase.database().ref('empresas').orderByChild('referencia').equalTo(`${snap.val().empresa}`).on('child_added', snapshot => {
                setEmpresa(snapshot.val())
            })
        })

    }, [])
    const google = new firebase.auth.GoogleAuthProvider();
    const facebook = new firebase.auth.FacebookAuthProvider();
    const socialLogin = async (prev) => {
        await firebase
            .auth()
            .signInWithPopup(prev)
            .then(()=>{
                
            })
            .catch(error => {
            });
    }
    if (user!==false) {
        return(
        <Redirect to="/"/> 
        )
    }else{
        return (
            <div className="contenedorInvitacion">
                <div className="p-2 divInvitacion">
                    <p className="tituloInvitacion h4">Bienvenid@ {data.nombre}</p>
                    <div className="descripcionInvitacion">Acabas de recibir una invitación para comenzar a trabajar en {empresa.nombre}</div>
                    <button className="btn btn-google mt-3" onClick={() => socialLogin(google)}>Continuar con Google</button>
                    <br/>
                    <button className="btn btn-facebook mt-3" onClick={() => socialLogin(facebook)}>Continuar con Facebook</button>
                </div>
            </div>
        )
    }

}
