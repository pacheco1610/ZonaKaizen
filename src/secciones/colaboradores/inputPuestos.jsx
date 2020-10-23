import React from 'react'
import {connect} from 'react-redux'

function InputPuestos(props) {
    const toggle = () =>{
        document.querySelector('.Puestos').classList.toggle('toggle')
        document.querySelector('.PuestosCover').classList.toggle('toggle')
        document.getElementById('puesto').classList.remove('inputRquerid')
    }

    return (
        <React.Fragment>
            <input type="text" id="puesto" value={props.puesto.Puesto} className="form-control InputGeneral" onFocus={()=>toggle()}/>
                <div className="dropdownCol shadow mt-2 Puestos rounded toggle" >
                    {props.puestos.map(puesto=>{
                        return(
                            <div className="col-12 btn text-center dropdownColLista" key={puesto.key} onClick={()=>props.SelectPuesto(puesto)}>
                                <span className="text-white">{puesto.Puesto}</span>
                             </div>
                        )
                    })}
                </div>
            <div  className="dropdownCol-Cover PuestosCover toggle" onClick={()=>toggle()}></div>

        </React.Fragment>
    )
}
const PropsStore = state =>{
    return{
        puestos:state.puestos.puestos,
    }
}
export default connect(PropsStore)(InputPuestos)