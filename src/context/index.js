import React,{useEffect,useState} from 'react'
import {connect} from 'react-redux'
import {usuario_action} from '../store/actions/usuarioActions'

import Spinner from '../layout/spinner'
import NuevoUsuario from '../secciones/nuevosUsuarios/index'
import {empresa} from './empresa'
import {permisos} from './permisos'
import {puestos} from './puestos'
import {colaboradores} from './colaboradores'
import {clientes} from './clientes'
import {tareas} from './tareas'
import {usuarios} from './usuarios'
function Index(props) {
    const [loading,setLoading]=useState(true)
    useEffect(() => {
        permisos(props.firebase)
        props.firebase.database().ref('usuarios').orderByChild('uid').equalTo(props.auth.uid).once("value")
        .then((snapshot)=> {
            if (snapshot.exists()!==true) {
                props.usuario_action({
                    nombre:props.auth.displayName,
                    photo:props.auth.photoURL,
                    uid:props.auth.uid,
                    registrado:false,
                })
                setLoading(false)
            }
            else {
                const snap = snapshot.val()[Object.keys(snapshot.val())[0]]
                const usuario = Object.assign(snap,{registrado:true})
                props.usuario_action(usuario)
                usuarios(props.firebase,usuario.uid)
                empresa(props.firebase,snap.empresa)
                puestos(props.firebase,snap.empresa)
                colaboradores(props.firebase,snap.empresa)
                clientes(props.firebase,snap.empresa)
                tareas(props.firebase,snap.empresa,props.auth.uid)
                setLoading(false)
            }
            
        })
    }, [])
    
    if (loading!==true) {
        if (props.usuario.registrado===true) {
            return (
                <React.Fragment>
                    {props.children}
                </React.Fragment>
            )
        }
        else{
            return(<NuevoUsuario/>)
        }
    }else{
        return(<Spinner/>)
    }
   
}

const PropsStore = state =>{
    return{
        usuario:state.usuario.usuario
    }
}
const functionStore ={
    usuario_action
}
export default connect(PropsStore,functionStore)(Index)