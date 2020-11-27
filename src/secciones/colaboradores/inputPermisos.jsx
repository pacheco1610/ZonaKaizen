import React from 'react'
import { connect } from 'react-redux'

function InputPermisos(props) {
    const toggle = () => {
        document.querySelector('.Permisos').classList.toggle('toggle')
        document.querySelector('.PermisosCover').classList.toggle('toggle')
    }

    return (
        <React.Fragment>
            <input type="text" value="Selecciona los permisos" className="form-control InputGeneral " onFocus={() => toggle()} />
            <div className="dropdownCol shadow mt-2 rounded toggle Permisos">
                {props.menu.map(permiso => {
                    return (
                        <div key={permiso.key} className="col-12 btn text-center dropdownColLista" onClick={() => props.agregarPermiso(permiso)} >
                            <span className="text-white">{permiso.titulo}</span>
                        </div>
                    )
                })}
            </div>
            <div className="dropdownCol-Cover toggle PermisosCover" onClick={() => toggle()}></div>

        </React.Fragment>
    )
}
const PropsStore = state => {
    return {
        permisos: state.permisos.permisos
    }
}
export default connect(PropsStore)(InputPermisos)