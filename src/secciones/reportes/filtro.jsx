import React from 'react'
import { connect } from 'react-redux'
function Filtro(props) {
    return (
        <div>
            <label>Colaboradores</label>
            <div className="border-left p-1 ml-2 d-inline"></div>
            {props.colaboradores.map(colaborador =>
                <img
                    src={colaborador.photo}
                    className="rounded-circle imgFiltro" key={colaborador.uid} id={colaborador.uid} />
            )}
        </div>
    )
}
const PropsStore = state => {
    return {
        colaboradores:state.colaboradores.colaboradores
    }
}
export default connect(PropsStore)(Filtro)