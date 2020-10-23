import React from 'react'

export default function responsables(props) {
   if(props.responsable.estatusTarea === false){
        return (
            <div className="rounded p-2 bg-principal text-white mb-1" key={props.colaborador.uid}>
                <img src={props.colaborador.photo} alt="" className="img-fluid rounded-circle img-drop mr-2" />
                {props.colaborador.nombre}
            </div>
        )
    }
    else if(props.responsable.estatusTarea === "avance"){
        return (
            <div className="rounded p-2 bg-warning text-white mb-1" key={props.colaborador.uid}>
                <img src={props.colaborador.photo} alt="" className="img-fluid rounded-circle img-drop mr-2" />
                {props.colaborador.nombre}
            <div className="float-right mr-4"><strong>avance del {props.responsable.avance}%</strong></div>
            </div>
        )
    }
    else if(props.responsable.estatusTarea === "realizada"){
        return (
            <div className="rounded p-2 bg-success text-white mb-1" key={props.colaborador.uid}>
                <img src={props.colaborador.photo} alt="" className="img-fluid rounded-circle img-drop mr-2" />
                {props.colaborador.nombre}
                <div className="float-right mr-4"><strong>Realizada</strong></div>
            </div>
        )
    }
}
