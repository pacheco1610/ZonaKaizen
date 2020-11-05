import React,{useState} from 'react'
import {connect} from 'react-redux'
import {updatetarea_action} from '../../store/actions/tareasActions'
function Filtro(props) {
    const [filtro,setFiltro]=useState([])
    const selectResponsable = (e,responsable)=>{
        if (!document.getElementById(e.target.id).classList.contains('imgFiltroCheck')) {
            document.getElementById(e.target.id).classList.add('imgFiltroCheck')
            props.tareas.map(tarea=>{
                if (tarea.responsable===responsable.uid||tarea.responsables.find(item=>item.uid===responsable.uid)) {
                    setFiltro(filtro.concat(tarea))
                }
            })
        }else{
            document.getElementById(e.target.id).classList.remove('imgFiltroCheck')
        }
    }
    return (
        <div>
            {props.responsables.map(responsable=>
                <img 
                src={props.colaboradores.find(item=>item.uid===responsable.uid).photo} 
                className="rounded-circle imgFiltro" key={responsable.uid} id={responsable.uid} onClick={(e)=>selectResponsable(e,responsable)}/>
            )}
        </div>
    )
}
const PropsStore = state => {
    return {
        responsables:state.tareas.responsables,
        colaboradores:state.colaboradores.colaboradores,
        tareas:state.tareas.tareas
    }
}
const functionStore ={
    updatetarea_action
}
export default connect (PropsStore,functionStore)(Filtro)