import React,{useState} from 'react'
import {connect} from 'react-redux'
import {numeroRandom} from '../../context/numerosRandoms'
import {toggleAlert} from '../../layout/alerts'
import firebase from '../../context/firebaseConfig'
function NuevoCliente(props) {
    const [estado, setEstado] = useState('')
    const toggleRight = () =>{
        document.getElementById('wrapper-Container').classList.toggle('toggled')
    }
    const GuardarCliente = () =>{
        let verificador = 0;
        const inputs = document.querySelectorAll('input[type=text]')
        for (let index = 0; index < inputs.length; index++) {
            if (inputs[index].value==="") {
                verificador = verificador +1
                document.getElementById(inputs[index].id).classList.add('inputRquerid')
            }
        }
        if (verificador===0) {
            firebase.database().ref('clientes').orderByChild('empresa').equalTo(estado.empresa).once("value")
            .then((snapshot)=> {
                if (snapshot.exists()!==true) {
                    const empresa = Object.assign(estado,{uidempresa:props.usuario.empresa,key:`${props.usuario.empresa}${numeroRandom()}`,tCliente:props.tCliente})
                    firebase.database().ref('clientes').push(empresa)
                    .then(()=>{
                        toggleAlert('sucefull','Cliente Agregado')
                        setEstado({
                            nombre:'',
                            apellido:'',
                            empresa:'',
                            rubro:'',
                            email:'',
                            telefono:'',
                            contacto:''
                        })
                    })
                }
                else {
                    toggleAlert('warning','Cliente ya existente')
                }
                
            })
        }
        
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-principal mb-1">
                <span className="bg-text-secundario"><i className="fas fa-user-tag"></i> Agregar {props.titulo}</span>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                        <button className="btn bg-text-secundario" onClick={()=>toggleRight()}><i className="fas fa-times"></i></button>
                    </ul>
                </div>
            </nav>
            <div className="col-12 mb-3">
                <label>Nombre del cliente</label>
                <input type="text" id="nombre" onFocus={()=>document.getElementById('nombre').classList.remove('inputRquerid')} 
                value={estado.nombre} 
                onChange={(e)=>setEstado({...estado,nombre:e.target.value})} 
                className="form-control requerid InputGeneral" placeholder="Nombre del cliente"/>
            </div>
            <div className="col-12 mb-3">
                <label>Apellido del cliente</label>
                <input type="text" id="apellido" onFocus={()=>document.getElementById('apellido').classList.remove('inputRquerid')} 
                value={estado.apellido} 
                onChange={(e)=>setEstado({...estado,apellido:e.target.value})} 
                className="form-control requerid InputGeneral" placeholder="Nombre del cliente"/>
            </div>
            <div className="col-12 mb-3">
                <label>Empresa</label>
                <input type="text" id="empresa" onFocus={()=>document.getElementById('empresa').classList.remove('inputRquerid')} 
                value={estado.empresa} 
                onChange={(e)=>setEstado({...estado,empresa:e.target.value})} 
                className="form-control requerid InputGeneral" placeholder="Nombre del cliente"/>
            </div>
            <div className="col-12 mb-3">
                <label>Rubro</label>
                <input type="text" id="rubro" onFocus={()=>document.getElementById('rubro').classList.remove('inputRquerid')} 
                value={estado.rubro} 
                onChange={(e)=>setEstado({...estado,rubro:e.target.value})} 
                className="form-control requerid InputGeneral" placeholder="Nombre del cliente"/>
            </div>
            <div className="col-12 mb-3">
                <label>Email</label>
                <input type="text" id="email" onFocus={()=>document.getElementById('email').classList.remove('inputRquerid')} 
                value={estado.email} 
                onChange={(e)=>setEstado({...estado,email:e.target.value})} 
                className="form-control requerid InputGeneral" placeholder="Nombre del cliente"/>
            </div>
            <div className="col-12 mb-3">
                <label>Telefono</label>
                <input type="text" id="telefono" onFocus={()=>document.getElementById('telefono').classList.remove('inputRquerid')} 
                value={estado.telefono} 
                onChange={(e)=>setEstado({...estado,telefono:e.target.value})} 
                className="form-control requerid InputGeneral" placeholder="Nombre del cliente"/>
            </div>
            <div className="col-12 mb-3">
                <label>Fuente de contacto</label>
                <input type="text" id="contacto" onFocus={()=>document.getElementById('contacto').classList.remove('inputRquerid')} 
                value={estado.contacto} 
                onChange={(e)=>setEstado({...estado,contacto:e.target.value})} 
                className="form-control requerid InputGeneral" placeholder="Nombre del cliente"/>
            </div>
            <div className="col-12">
                <button className="btn btn-primary btn-block" onClick={()=>GuardarCliente()}>Guardar Cliente</button>
            </div>
        </div>
    )
}

const PropsStore = state =>{
    return{
        usuario:state.usuario.usuario
    }
}
export default connect(PropsStore)(NuevoCliente)