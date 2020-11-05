import React, { useState } from 'react'
import moment from 'moment'
import firebase from '../../context/firebaseConfig'
import { connect } from 'react-redux'
function Progreso(props) {
    const [rangeValue, setrangeValue] = useState(0)
    const [evidencia,setEvidencia]=useState('')
    const range = (e) => {
        setrangeValue(e.target.value)
        document.getElementById('sliderValue').style.left = (e.target.value) + "%"
        document.getElementById('sliderValue').style.opacity = 100
        if (e.target.value < 30) {
            document.getElementById('sliderValue').style.backgroundColor = "red"
        } else if (e.target.value >= 30 && e.target.value <= 70) {
            document.getElementById('sliderValue').style.backgroundColor = "orange"
        } else {
            document.getElementById('sliderValue').style.backgroundColor = "green"
        }

    }
    const handleTarea = (e) => {
        e.preventDefault()
        const responsable = props.tarea.responsables.find(item => item.uid === props.usuario.uid)
        const filter = props.tarea.responsables.filter(item => item.uid !== props.usuario.uid)
        filter.push({ ...responsable, estatusTarea: "avance", avance: rangeValue,evidencia:evidencia })
        firebase.database().ref(`tareas/${props.tarea.uidTarea}/`).update({ ...props.tarea, responsables: filter,minfo:""})
        props.setModal(false)
        document.getElementById("myForm").reset();
    }
    return (
        <div className="row">
            <div className="col-12 bg-text-secundario">
                <i className="far fa-address-card mr-2 d-inline"></i>
                <p className="h6 d-inline"><strong>Titulo de tarea</strong></p>
            </div>
            <div className="col-12">
                <p className="h4">{props.tarea.titulo}</p>
            </div>
            <div className="col-12">
                <div className="container bg-principal p-2 rounded">
                    <div className="row">
                        <div className="col-7">
                            <p className="h6 bg-text-secundario d-block"><strong>Asignada por:</strong></p>
                            <img src={(props.colaboradores.find(item=>item.uid===props.tarea.asignador)).photo} alt="" className="img-fluid rounded-circle img-drop mr-2" />
                            <p className="h6 bg-text-secundario d-inline"><strong>{(props.colaboradores.find(item=>item.uid===props.tarea.asignador)).nombre}</strong></p>
                        </div>
                        <div className="col-5">
                            <p className="h6 bg-text-secundario d-block"><strong>Fecha Limite:</strong></p>
                            <p className="h6 bg-text-secundario"><i className="far fa-clock mr-2"></i>{moment(props.tarea.fechaEvento).format('DD/MM/YYYY')}<br />{props.tarea.hora}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 mt-2">
                <div className="d-inline bg-text-secundario">
                    <i className="fas fa-align-left mr-2"></i>
                    <p className="h6 d-inline"><strong>Descripción</strong></p>
                </div>
                <div className="bg-principal p-2 rounded">
                    {props.tarea.descripcion}
                </div>
            </div>
            <div className="col-12 mt-2">
                <div className="container p-2 bg-principal rounded range">
                    <div className="sliderValue" >
                        <span id="sliderValue">{rangeValue}</span>
                    </div>
                    <form onSubmit={(e) => handleTarea(e)} id="myForm">
                        <input type="range" value={rangeValue} onInput={(e) => range(e)} onMouseUp={() => document.getElementById('sliderValue').style.opacity = 0} />
                        <textarea required onChange={(e)=>setEvidencia(e.target.value)} className="form-control InputGeneral mt-2" rows="1" placeholder="Agrega un cometario a tu avance" />
                        <button className="bg-correcto btn float-right mt-4" type="submit">Guardar Avance</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
const PropsStore = state => {
    return {
        usuario: state.usuario.usuario,
        colaboradores: state.colaboradores.colaboradores
    }
}
export default connect(PropsStore)(Progreso)