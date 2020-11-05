import React from 'react'
import {connect} from 'react-redux'
import {usuario_action} from '../../store/actions/usuarioActions'
function bienvenida(props) {
    return (
        <div className="row">
            <div className="col-12 text-center">
                <span className="bg-text-secundario">Veo que eres nuevo, ¿como deseas continuar?</span>
            </div>
            <div className="col-12 mt-3">
                <button className="btn btn-block btn-primary"  onClick={()=> props.UpdateView(3)}>Continuar como Empresa</button>
            </div>
        </div>
    )
}
const functionProps = {
    usuario_action
}
export default connect(null,functionProps)(bienvenida)
