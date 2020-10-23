import React from 'react'
import {connect} from 'react-redux'

function InputColaboradores(props) {
    const toggle = () => {
        document.querySelector('.dropdownCol').classList.toggle('toggle')
        document.querySelector('.dropdownCol-Cover').classList.toggle('toggle')
        document.getElementById('colaboradoresInput').classList.remove('inputRquerid')
    }
    const puesto = (key)=>{
        if (props.puestos !== undefined) {
            const puesto = (props.puestos.filter(item=>item.key===key))[0]
            return puesto.Puesto
        }
    }
    return (
        <React.Fragment>
            <input type="text" className="form-control InputGeneral" id="colaboradoresInput" onFocus={() => toggle()} />
            <div className="dropdownCol shadow mt-2 rounded toggle">
                {props.colaboradores.map(colaborador =>
                    <div className="col-12 btn text-left dropdownColLista" key={colaborador.uid} onClick={()=>props.AgregarResponsable(colaborador)}>
                        <img src={colaborador.photo}
                            alt=""
                            className="img-fluid rounded-circle img-drop mr-2"
                        /> <span className="text-white">{colaborador.nombre}</span> <span className="span-small">{puesto(colaborador.puesto)}</span>
                    </div>)}
            </div>
            <div className="dropdownCol-Cover toggle" onClick={() => toggle()}></div>

        </React.Fragment>
    )
}
const PropsStore = state => {
    return {
        puestos:state.puestos.puestos
    }
}
export default connect(PropsStore)(InputColaboradores)