import React,{useState,useEffect} from 'react'
import InputPuesto from './inputPuestos'
import InputPermisos from './inputPermisos'
import { connect } from 'react-redux'
import {toggleAlert} from '../../layout/alerts'
import firebase from '../../context/firebaseConfig'
import randomColor from 'randomcolor'
import Invitacion from '../nuevosUsuarios/invitacion'

function NuevoColaborador(props) {
    const [estado, setEstado] = useState({permisos:[],menu:props.permisos,puesto:{Puesto:'Selecciona un puesto'},nombre:'',referencia:''})

    useEffect(() => {
        setEstado({...estado,menu:props.permisos})
    }, [props.permisos])

    const SelectPuesto = (itemPuesto) =>{
        setEstado({...estado,puesto:itemPuesto})
        document.querySelector('.Puestos').classList.toggle('toggle')
        document.querySelector('.PuestosCover').classList.toggle('toggle')
    }
    const toggleRight = () =>{
        document.getElementById('wrapper-Container').classList.toggle('toggled')
    }
    const agregarPermiso = (permiso)=>{
        const array = estado.permisos
        array.push(permiso)
        setEstado({...estado,permisos:estado.permisos,menu:estado.menu.filter(item=>item.key !==permiso.key)})
        document.querySelector('.Permisos').classList.toggle('toggle')
        document.querySelector('.PermisosCover').classList.toggle('toggle')
    }
    const removerPermiso = (permiso) =>{
        const array = estado.permisos.filter(item => item.key !== permiso.key)
        const ArrayMenu = estado.menu
        ArrayMenu.push(permiso)
        setEstado({...estado,permisos:array})
    }
    const AltaColaborador = () =>{
        if (estado.puesto.Puesto==='Selecciona un puesto') {
            document.getElementById('puesto').classList.add('inputRquerid')
        }else if(estado.nombre===''||estado.nombre===undefined){
            document.getElementById('nombre').classList.add('inputRquerid')
        }else{
            const referenciaRandom =props.usuario.empresa+(Math.floor((Math.random() * 1000) + 1))
            firebase.database().ref('usuarios').push({
                nombre:estado.nombre,
                empresa:props.usuario.empresa,
                menu:estado.permisos,
                puesto:estado.puesto.key,
                photo:'https://firebasestorage.googleapis.com/v0/b/kaizen-6d3d0.appspot.com/o/img%2Fdescarga.png?alt=media&token=109a3f25-aa79-4ab1-b4ac-5adf12f5875b',
                color:randomColor(),
                uid:referenciaRandom,
                estatus:false,
                puntaje:{
                    nivel:'Principiante',
                    puntaje:0
                }
            }).then(()=>{
                setEstado({...estado,permisos:[],menu:props.permisos,puesto:{Puesto:'Selecciona un puesto'},nombre:'',referencia:referenciaRandom})
                toggleAlert('sucefull','Agregado Correctamente')
                document.getElementById('copinvitation').classList.toggle('copyinvitation')
            })
           
        }
    }
    const Invitacion = () =>{
        const element = document.getElementById('invitacion')
        document.execCommand('copy', false, element.select());
    }
    return (
        <div>
        {/*------------------NAVBAR----------- */}
            <nav className="navbar navbar-expand-lg navbar-light bg-principal mb-1">
                <span className="bg-text-secundario"><i className="fas fa-user-friends"></i> Agregar Colaborador</span>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                        <button className="btn bg-text-secundario" onClick={()=>toggleRight()}><i className="fas fa-times"></i></button>
                    </ul>
            </div>
            </nav>

            <div className="col-12 mb-3">
                <label>Nombre del Colaborador</label>
                <input type="text" id="nombre" onFocus={()=>document.getElementById('nombre').classList.remove('inputRquerid')} value={estado.nombre} onChange={(e)=>setEstado({...estado,nombre:e.target.value})} className="form-control requerid InputGeneral" placeholder="Nombre del Colaborador"/>
            </div>
            <div className="col-12 mb-3">
                <label>Seleccionar Puesto</label>
                <InputPuesto SelectPuesto={SelectPuesto} puesto={estado.puesto}/>
            </div>
            <div className="col-12 mb-3">
                <label>Seleccionar Permisos</label>
                <InputPermisos agregarPermiso={agregarPermiso} menu={estado.menu}/>
            </div>
            <div className="col-12 mb-3">
                    {
                        estado.permisos.map(permiso=>{
                            return(
                                <div className="col-12 p-1 bg-correcto rounded mb-2" key={permiso.key}>
                                    <div className="row align-items-center">
                                        <div className="col-12">
                                            <button  className="btn text-white" onClick={()=>removerPermiso(permiso)}><i className="fas fa-minus-circle"></i></button>
                                            Tiene permisos de {permiso.titulo}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        )
                    }

            </div>
            <div className="col-12 mb-4">
                <label>Invitación</label>
                <input type="text" value={`${window.location.origin}/invitation/${estado.referencia}`} id="invitacion" className="form-control requerid inputInvitacion" placeholder="Referencia"/>
                <div className="btn btn-block text-white text-center copyinvitation" id="copinvitation" onClick={()=>Invitacion()}>copiar Invitación</div>
            </div>
            <div className="col-12">
                <button className="btn btn-primary btn-block" onClick={()=>AltaColaborador()}>Agregar Colaborador</button>
            </div>
        </div>
    )
}
const PropsStore = state =>{
    return{
        permisos:state.permisos.permisos,
        usuario:state.usuario.usuario
    }
}
export default connect(PropsStore)(NuevoColaborador)