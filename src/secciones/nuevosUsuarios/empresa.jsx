import React,{useState} from 'react'
import firebase from '../../context/firebaseConfig'
import {connect} from 'react-redux'
import {usuario_action} from '../../store/actions/usuarioActions'
import randomColor from 'randomcolor'
function Empresa(props) {
    const [nombre,setNombre] = useState('')
    const guardar = () =>{
        firebase.database().ref('/empresas').push({
            nombre:nombre,
            propietario:props.usuario.uid,
            referencia:props.usuario.uid
        })
        firebase.database().ref('/usuarios').push({
            nombre:props.usuario.nombre,
            empresa:props.usuario.uid,
            menu:props.permisos,
            puesto:props.usuario.uid,
            photo:props.usuario.photo,
            color:randomColor(),
            uid:props.usuario.uid,
            puntaje:{
                nivel:'Principiante',
                puntaje:0
            },
            estatus:true
        })
        firebase.database().ref('/puestos').push({
            "Autorizo" : "",
            "Departamento" : "",
            "Diaria" : "",
            "Directamente" : "",
            "Edad" : "",
            "Elaboro" : "",
            "Escolaridad" : "",
            "Eventuales" : "",
            "Experiencia" : "",
            "Fecha" : "",
            "General" : "",
            "Horario" : "",
            "Manejo" : "",
            "Mensual" : "",
            "Oficina" : " ",
            "Organigrama" : "",
            "Otros" : "",
            "Proposito" : "Un gran lider",
            "Puesto" : "Dueño",
            "Quincenal" : "",
            "Reviso" : "",
            "Semanales" : "",
            "Sexo" : "",
            "empresa" : props.usuario.uid,
            "habilidades" : [ {
              "checked" : "",
              "key" : 0,
              "titulo" : "Trabajar bajo presión"
            }, {
              "checked" : "",
              "key" : 2,
              "titulo" : "Comunicación oral"
            }, {
              "checked" : "",
              "key" : 3,
              "titulo" : "Habilidad en costos y presupuestos"
            }, {
              "checked" : "",
              "key" : 4,
              "titulo" : "Habilidad de negociación "
            }, {
              "checked" : "",
              "key" : 5,
              "titulo" : "Haber trabajado en obra como residente "
            }, {
              "checked" : "",
              "key" : 8,
              "titulo" : "Responsabilidad "
            }, {
              "checked" : "",
              "key" : 9,
              "titulo" : "Trabajo en equipo"
            }, {
              "checked" : "",
              "key" : 11,
              "titulo" : "Ser practico"
            }, {
              "checked" : "",
              "key" : 1,
              "titulo" : "Capacidad analítica"
            }, {
              "checked" : "",
              "key" : 6,
              "titulo" : "Actitud al cambio"
            }, {
              "checked" : "",
              "key" : 7,
              "titulo" : "Iniciativa "
            }, {
              "checked" : "",
              "key" : 10,
              "titulo" : "Profesionalismo"
            } ],
            "key" : props.usuario.uid,
            "responsabilidades" : [],
        })
        
        props.usuario_action({
            nombre:props.usuario.nombre,
            empresa:props.usuario.uid,
            menu:props.permisos,
            puesto:props.usuario.uid,
            photo:props.usuario.photo,
            color:randomColor(),
            uid:props.usuario.uid,
            registrado:true,
            puntaje:{
                nivel:'Principiante',
                puntaje:0
            },
            estatus:true
        })
    }
    return (
        <div className="row">
            <div className="col-12 text-center">
                <span className="bg-text-secundario">Ingresa el nombre de tu empresa</span>
            </div>
            <div className="col-12 mt-3">
                <input 
                type="email" 
                className="form-control InputGeneral"
                placeholder="Ingresa el nombre de tu empresa" 
                value={nombre}
                onChange={(e)=>setNombre(e.target.value)}/>
            </div>
            <div className="col-12 mt-3">
                <button className="btn btn-block btn-primary" onClick={()=>guardar()}>Continuar</button>
            </div>
        </div>
    )
}
const PropsStore = state =>{
    return{
        usuario:state.usuario.usuario,
        permisos:state.permisos.permisos
    }
}
const functionStore ={
    usuario_action
}
export default connect(PropsStore,functionStore)(Empresa)