import React,{useState,useEffect} from 'react'
import InputPuesto from './inputPuestos'
import InputPermisos from './inputPermisos'
import { connect } from 'react-redux'
import {toggleAlert} from '../../layout/alerts'
import firebase from '../../context/firebaseConfig'

function EditColaborador(props) {
    const [estado, setEstado] = useState({...props.colaborador,puesto:props.puestos.find(item=>item.key===props.colaborador.puesto),permisos:[]})
    
    useEffect(() => {
        setEstado({...props.colaborador,puesto:props.puestos.find(item=>item.key===props.colaborador.puesto),permisos:[]})
        filterPermisos()
        console.log(estado)
    }, [props.colaborador])
    const filterPermisos = () =>{
        let array = props.permisos
        estado.menu.map(item=>{
            if(!array.includes(item)){
                array = array.filter(permiso=>permiso.key !== item.key)
            }
        setEstado({...props.colaborador,permisos:array})
        })
        
    }
    const SelectPuesto = (itemPuesto) =>{
        setEstado({...estado,puesto:itemPuesto})
        document.querySelector('.Puestos').classList.toggle('toggle')
        document.querySelector('.PuestosCover').classList.toggle('toggle')
    }
    const toggleRight = () =>{
        document.getElementById('wrapper-Container').classList.toggle('toggled')
    }
    const agregarPermiso = (permiso)=>{
        const array = estado.menu
        array.push(permiso)
        setEstado({...estado,menu:array,permisos:estado.permisos.filter(item=>item.key !==permiso.key)})
        document.querySelector('.Permisos').classList.toggle('toggle')
        document.querySelector('.PermisosCover').classList.toggle('toggle')
    }
    const removerPermiso = (permiso) =>{
        if (permiso.key!==1) {
            const array = estado.menu.filter(item => item.key !== permiso.key)
            const ArrayMenu = estado.permisos
            ArrayMenu.push(permiso)
            setEstado({...estado,menu:array})
        }
    }
    const AltaColaborador = () =>{
        if (estado.puesto.Puesto==='Selecciona un puesto') {
            document.getElementById('puesto').classList.add('inputRquerid')
        }else if(estado.nombre===''||estado.nombre===undefined){
            document.getElementById('nombre').classList.add('inputRquerid')
        }else{
            firebase.database().ref(`usuarios/${props.colaborador.id}`).update(estado).then(()=>{

                toggleAlert('sucefull','Colaborador Actualizado')
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
                <span className="bg-text-secundario"><i className="fas fa-user-friends"></i> Editar Colaborador</span>
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
                <InputPermisos agregarPermiso={agregarPermiso} menu={estado.permisos}/>
            </div>
            <div className="col-12 mb-3">
                    {
                        estado.menu.map(permiso=>{
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
                <label>Referencia</label>
                <input type="text" value={`${window.location.origin}/invitation/${estado.uid}`} id="invitacion" className="form-control requerid inputInvitacion" placeholder="Referencia"/>
                <div className="btn btn-block text-white text-center" id="copinvitation" onClick={()=>Invitacion()}>copiar Invitación</div>
            </div>
            <div className="col-12">
                <button className="btn btn-primary btn-block" onClick={()=>AltaColaborador()}>Guardar Cambios</button>
            </div>
        </div>
    )
}
const PropsStore = state =>{
    return{
        permisos:state.permisos.permisos,
        usuario:state.usuario.usuario,
        colaborador:state.colaboradores.colaborador,
        puestos:state.puestos.puestos
    }
}
export default connect(PropsStore)(EditColaborador)