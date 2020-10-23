import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import firebase from '../../context/firebaseConfig'
import {toggleAlert} from '../../layout/alerts'
import {numeroRandom} from '../../context/numerosRandoms'
function NuevoPerfil(props) {
    const [estado, setEstado] = useState({})
    const [responsabilidades, setResponsabilidades]=useState([])
    const [habilidades,setHabilidades]=useState(props.habilidades)

    useEffect(() => {

        setHabilidades(props.habilidades)
    }, [props.habilidades])
    const onChange =(event,id)=>{
        setEstado({...estado,[id]:event.target.value})
        document.getElementById(id).classList.remove('inputRquerid')
    }
    const focusButton=(button)=>{
        document.getElementById(button).classList.add('btn-responsabilidad')
    }
    const addResponsabilidad = (tipo)=>{
        if (estado[tipo]!==""&&estado[tipo]) {
            const array=responsabilidades
            array.push({
                key:numeroRandom(),
                responsabilidad:estado[tipo],
                tipo:tipo
            })
            setResponsabilidades(array)
            setEstado({...estado,[tipo]:''})
        }
    }
    const removeResponsabilidad = (responsabilidad)=>{
        setResponsabilidades(responsabilidades.filter(item=>item.key !==responsabilidad))
    }
    const check=(habilidad)=>{
        const array = habilidades.filter(item=>item.key !== habilidad.key)
        const item = document.getElementById(habilidad.key)
        if (item.checked) {
            array.push({
                checked:"true",
                key:habilidad.key,
                titulo:habilidad.titulo
            })
            setHabilidades(array)
        }
        else{
            array.push({
                checked:"",
                key:habilidad.key,
                titulo:habilidad.titulo
            })
            setHabilidades(array)
        }
    }
    const CrearPuesto = ()=>{
        let verificador = 0;
        const inputs = document.querySelectorAll('input[type=text]')
        for (let index = 0; index < inputs.length; index++) {
            if (inputs[index].value==="") {
                verificador = verificador +1
                document.getElementById(inputs[index].id).classList.add('inputRquerid')
            }
        }
        if (document.getElementById('Proposito').value==="") {
            verificador = verificador +1
            document.getElementById('Proposito').classList.add('inputRquerid')
        }
        if (verificador===0) {
            firebase.database().ref('puestos').push(Object.assign(estado,{habilidades:habilidades,responsabilidades:responsabilidades,empresa:props.usuario.empresa,key:`${props.usuario.empresa}+${numeroRandom()}`}))
            .then(()=>{
                setEstado({...estado,
                    Puesto:'',
                    Departamento:'',
                    Organigrama:'',
                    Horario:'',
                    Proposito:'',
                    Directamente:'',
                    Edad:'',
                    Sexo:'',
                    Escolaridad:'',
                    Experiencia:'',
                    Manejo:'',
                    Oficina:'',
                    Otros:'',
                    Elaboro:'',
                    Reviso:'',
                    Autorizo:'',
                    Fecha:''
                    })
                setResponsabilidades([])
                setHabilidades([])
                toggleAlert('sucefull','Agregado correctamente')
            })
        }   
        //firebase.database().ref('puestos').push(Object.assign(estado,{habilidades:habilidades,responsabilidades:responsabilidades,empresa:props.usuario.empresa,key:randomColor()}))

       
        
        //console.log(inputs)

    }
    return (
        <div className="row mb-5 pb-5">
            <div className="col-12 col-xl-3 col-md-4 mt-2">
                <label>Nombre del Puesto</label>
                <input type="text" className="form-control requerid InputGeneral" value={estado.Puesto} onChange={(e)=>onChange(e,'Puesto')} id="Puesto" aria-describedby="emailHelp" placeholder="Nombre del Puesto"/>
            </div>
            <div className="col-12 col-xl-3 col-md-4 mt-2">
                <label>Departamento</label>
                <input type="text" className="form-control requerid InputGeneral" value={estado.Departamento} onChange={(e)=>onChange(e,'Departamento')} id="Departamento" aria-describedby="emailHelp" placeholder="Departamento"/>
            </div>
            <div className="col-12 col-xl-3 col-md-4 mt-2">
                <label>Reporta en el organigrama a</label>
                <input type="text" className="form-control requerid InputGeneral"value={estado.Organigrama} onChange={(e)=>onChange(e,'Organigrama')} id="Organigrama" aria-describedby="emailHelp" placeholder="Reporta en el organigrama a"/>
            </div>
            <div className="col-12 col-xl-3 col-md-4 mt-2">
                <label >Horario de trabajo</label>
                <input type="text" className="form-control requerid InputGeneral" value={estado.Horario} onChange={(e)=>onChange(e,'Horario')} id="Horario" aria-describedby="emailHelp" placeholder="Reporta en el organigrama a"/>
            </div>
            <div className="col-12 col-xl-6 col-md-6 mt-2 requerid InputGeneral">
                <label>Propósito del puesto</label>
                <textarea className="form-control InputGeneral" rows="5" value={estado.Proposito} onChange={(e)=>onChange(e,'Proposito')} id="Proposito" placeholder="Propósito del puesto"></textarea>
            </div>
            <div className="col-12 col-xl-6 col-md-6 mt-2">
                <label>Le reportan directamente</label>
                <input type="text" className="form-control requerid InputGeneral" value={estado.Directamente} onChange={(e)=>onChange(e,'Directamente')} id="Directamente" aria-describedby="emailHelp" placeholder="Le reportan directamente"/>
            </div>
            <div className="col-12 text-center mt-4 border-bottom">
                <label >Responsabilidades</label>
            </div>
            <div className="col-12 col-xl-12 col-md-12 mt-2">
                <label >Responsabilidades Generales</label>
                <div className="input-group mb-3">
                    <input type="email" id="General" value={estado.General} onChange={(e)=>onChange(e,'General')} onFocus={()=>focusButton('agregarGeneral')} className="form-control InputGeneral" placeholder="+ Agregar Responsabilidad" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                        <button id="agregarGeneral" onClick={()=>addResponsabilidad('General')}  className="btn bg-primary text-white remove" type="button"><i className="fas fa-plus-square"></i> Agregar</button>
                    </div>
                </div>
                <div className="row">
                    {responsabilidades.filter(item=>item.tipo==='General').map(responsabilidad=>
                        <div type="button"  
                        key={responsabilidad.key} 
                        className="col-12 btn btn-block bg-secundario text-white text-left mr-2 mb-2">
                            <span 
                            className="badge bg-blue float-right"
                            onClick={()=>removeResponsabilidad(responsabilidad.key)}
                            >
                                <i className="fas fa-times"></i>
                            </span> {responsabilidad.responsabilidad}
                        </div>  
                    )}
                </div>
            </div>
            <div className="col-12 col-xl-12 col-md-12 mt-2">
                <label >Responsabilidades Diaria</label>
                <div className="input-group mb-3">
                    <input type="email" id="Diaria" value={estado.Diaria} onChange={(e)=>onChange(e,'Diaria')} onFocus={()=>focusButton('agregarDiaria')} className="form-control InputGeneral" placeholder="+ Agregar Responsabilidad" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                        <button id="agregarDiaria" onClick={()=>addResponsabilidad('Diaria')}  className="btn bg-primary text-white remove" type="button"><i className="fas fa-plus-square"></i> Agregar</button>
                    </div>
                </div>
                <div className="row">
                    {responsabilidades.filter(item=>item.tipo==='Diaria').map(responsabilidad=>
                        <div type="button"  
                        key={responsabilidad.key} 
                        className="col-12 btn btn-block bg-secundario text-white text-left mr-2 mb-2">
                            <span 
                            className="badge bg-blue float-right"
                            onClick={()=>removeResponsabilidad(responsabilidad.key)}
                            >
                                <i className="fas fa-times"></i>
                            </span> {responsabilidad.responsabilidad}
                        </div>  
                    )}
                </div>
            </div>
            <div className="col-12 col-xl-12 col-md-12 mt-2">
                <label >Responsabilidades Semanales</label>
                <div className="input-group mb-3">
                    <input type="email" id="Semanales" value={estado.Semanales} onChange={(e)=>onChange(e,'Semanales')} onFocus={()=>focusButton('agregarSemanales')} className="form-control InputGeneral" placeholder="+ Agregar Responsabilidad" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                        <button id="agregarSemanales" onClick={()=>addResponsabilidad('Semanales')}  className="btn bg-primary text-white remove" type="button"><i className="fas fa-plus-square"></i> Agregar</button>
                    </div>
                </div>
                <div className="row">
                    {responsabilidades.filter(item=>item.tipo==='Semanales').map(responsabilidad=>
                        <div type="button"  
                        key={responsabilidad.key} 
                        className="col-12 btn btn-block bg-secundario text-white text-left mr-2 mb-2">
                            <span 
                            className="badge bg-blue float-right"
                            onClick={()=>removeResponsabilidad(responsabilidad.key)}
                            >
                                <i className="fas fa-times"></i>
                            </span> {responsabilidad.responsabilidad}
                        </div>  
                    )}
                </div>
            </div>
            <div className="col-12 col-xl-12 col-md-12 mt-2">
                <label >Responsabilidades Quincenal</label>
                <div className="input-group mb-3">
                    <input type="email" id="Quincenal" value={estado.Quincenal} onChange={(e)=>onChange(e,'Quincenal')} onFocus={()=>focusButton('agregarQuincenal')} className="form-control InputGeneral" placeholder="+ Agregar Responsabilidad" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                        <button id="agregarQuincenal" onClick={()=>addResponsabilidad('Quincenal')}  className="btn bg-primary text-white remove" type="button"><i className="fas fa-plus-square"></i> Agregar</button>
                    </div>
                </div>
                <div className="row">
                    {responsabilidades.filter(item=>item.tipo==='Quincenal').map(responsabilidad=>
                        <div type="button"  
                        key={responsabilidad.key} 
                        className="col-12 btn btn-block bg-secundario text-white text-left mr-2 mb-2">
                            <span 
                            className="badge bg-blue float-right"
                            onClick={()=>removeResponsabilidad(responsabilidad.key)}
                            >
                                <i className="fas fa-times"></i>
                            </span> {responsabilidad.responsabilidad}
                        </div>  
                    )}
                </div>
            </div>
            <div className="col-12 col-xl-12 col-md-12 mt-2">
                <label >Responsabilidades Mensual</label>
                <div className="input-group mb-3">
                    <input type="email" id="Mensual" value={estado.Mensual} onChange={(e)=>onChange(e,'Mensual')} onFocus={()=>focusButton('agregarMensual')} className="form-control InputGeneral" placeholder="+ Agregar Responsabilidad" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                        <button id="agregarMensual" onClick={()=>addResponsabilidad('Mensual')}  className="btn bg-primary text-white remove" type="button"><i className="fas fa-plus-square"></i> Agregar</button>
                    </div>
                </div>
                <div className="row">
                    {responsabilidades.filter(item=>item.tipo==='Mensual').map(responsabilidad=>
                        <div type="button"  
                        key={responsabilidad.key} 
                        className="col-12 btn btn-block bg-secundario text-white text-left mr-2 mb-2">
                            <span 
                            className="badge bg-blue float-right"
                            onClick={()=>removeResponsabilidad(responsabilidad.key)}
                            >
                                <i className="fas fa-times"></i>
                            </span> {responsabilidad.responsabilidad}
                        </div>  
                    )}
                </div>
            </div>
            <div className="col-12 col-xl-12 col-md-12 mt-2">
                <label >Responsabilidades Eventuales</label>
                <div className="input-group mb-3">
                    <input type="email" id="Eventuales" value={estado.Eventuales} onChange={(e)=>onChange(e,'Eventuales')} onFocus={()=>focusButton('agregarEventuales')} className="form-control InputGeneral" placeholder="+ Agregar Responsabilidad" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                        <button id="agregarEventuales" onClick={()=>addResponsabilidad('Eventuales')}  className="btn bg-primary text-white remove" type="button"><i className="fas fa-plus-square"></i> Agregar</button>
                    </div>
                </div>
                <div className="row">
                    {responsabilidades.filter(item=>item.tipo==='Eventuales').map(responsabilidad=>
                        <div type="button"  
                        key={responsabilidad.key} 
                        className="col-12 btn btn-block bg-secundario text-white text-left mr-2 mb-2">
                            <span 
                            className="badge bg-blue float-right"
                            onClick={()=>removeResponsabilidad(responsabilidad.key)}
                            >
                                <i className="fas fa-times"></i>
                            </span> {responsabilidad.responsabilidad}
                        </div>  
                    )}
                </div>
            </div>
            <div className="col-12 text-center mt-4 border-bottom">
                <label>Requerimientos del puesto / Experiencia laboral</label>
            </div>
            <div className="col-12 col-xl-3 col-md-4 mt-2">
                <label>Edad</label>
                <input type="text" className="form-control requerid InputGeneral" value={estado.Edad} onChange={(e)=>onChange(e,'Edad')} id="Edad" aria-describedby="emailHelp" placeholder="Edad"/>
            </div>
            <div className="col-12 col-xl-3 col-md-4 mt-2">
                <label >Sexo</label>
                <input type="text" className="form-control requerid InputGeneral" value={estado.Sexo} onChange={(e)=>onChange(e,'Sexo')} id="Sexo" aria-describedby="emailHelp" placeholder="Sexo"/>
            </div>
            <div className="col-12 col-xl-3 col-md-4 mt-2">
                <label>Escolaridad</label>
                <input type="text" className="form-control requerid InputGeneral" value={estado.Escolaridad} onChange={(e)=>onChange(e,'Escolaridad')} id="Escolaridad" aria-describedby="emailHelp" placeholder="Escolaridad"/>
            </div>
            <div className="col-12 col-xl-3 col-md-4 mt-2">
                <label >Experiencia</label>
                <input type="text" className="form-control requerid InputGeneral" value={estado.Experiencia} onChange={(e)=>onChange(e,'Experiencia')} id="Experiencia" aria-describedby="emailHelp" placeholder="Experiencia"/>
            </div>
            <div className="col-12 col-xl-3 col-md-4 mt-2">
                <label>Manejo de Software</label>
                <input type="text" className="form-control requerid InputGeneral" value={estado.Manejo} onChange={(e)=>onChange(e,'Manejo')} id="Manejo" aria-describedby="emailHelp" placeholder="Manejo"/>
            </div>
            <div className="col-12 col-xl-3 col-md-4 mt-2">
                <label>Manejo de equipo oficina</label>
                <input type="text" className="form-control requerid InputGeneral" value={estado.Oficina} onChange={(e)=>onChange(e,'Oficina')} id="Oficina" aria-describedby="emailHelp" placeholder="oficina"/>
            </div>

            <div className="col-12 col-xl-6 col-md-4 mt-2">
                <label>Otros</label>
                <input type="text" className="form-control InputGeneral" value={estado.Otros} onChange={(e)=>onChange(e,'Otros')} id="Otros" aria-describedby="emailHelp" placeholder="Otros"/>
            </div>
            <div className="col-12 text-center mt-4 border-bottom">
                <label>Habilidades y actitudes</label>
            </div>
            {props.habilidades.map(habilidad=>
                <div className="col-12 col-xl-6 col-md-4 mt-2" key={habilidad.titulo}>
                    <div className="form-check">
                        <input onChange={(e)=>check(habilidad)} id={habilidad.key} className="form-check-input" type="checkbox" name={habilidad.key} />
                        <label className="form-check-label">
                            {habilidad.titulo}
                        </label>
                    </div>
                </div>
            )}
             <div className="col-12 text-center mt-4 border-bottom">
                <label className="title-dashboard">Responsables de documentar la descripción de puesto</label>
            </div>
            <div className="col-12 col-xl-3 col-md-4 mt-2">
                <label>Elaboró</label>
                <input type="text" className="form-control requerid InputGeneral" value={estado.Elaboro} onChange={(e)=>onChange(e,'Elaboro')} id="Elaboro" aria-describedby="emailHelp" placeholder="Elaboró"/>
            </div>
            <div className="col-12 col-xl-3 col-md-4 mt-2">
                <label>Revisó</label>
                <input type="text" className="form-control requerid InputGeneral" value={estado.Reviso} onChange={(e)=>onChange(e,'Reviso')} id="Reviso" aria-describedby="emailHelp" placeholder="Revisó"/>
            </div>
            <div className="col-12 col-xl-3 col-md-4 mt-2">
                <label>Autorizó</label>
                <input type="text" className="form-control requerid InputGeneral" value={estado.Autorizo} onChange={(e)=>onChange(e,'Autorizo')} id="Autorizo" aria-describedby="emailHelp" placeholder="Autorizó"/>
            </div>
            <div className="col-12 col-xl-3 col-md-4 mt-2">
                <label>Fecha</label>
                <input type="text" className="form-control requerid InputGeneral" value={estado.Fecha} onChange={(e)=>onChange(e,'Fecha')} id="Fecha" aria-describedby="emailHelp" placeholder="Fecha"/>
            </div>
            <div className="col-12 mt-4">
                <button className="btn bg-primary text-white btn-block" onClick={()=>CrearPuesto()}>Crear Puesto</button>
            </div>
        </div>
    )
}

const PropsStore = state =>{
    return{
        habilidades:state.permisos.habilidades,
        usuario:state.usuario.usuario
    }
}
export default connect(PropsStore)(NuevoPerfil)