import React from 'react'

export default function InputColaboradores(props) {
    const toggle = () => {
        document.getElementById('clientes').classList.toggle('toggle')
        document.getElementById('clientescover').classList.toggle('toggle')
    }
    return (
        <React.Fragment>
            <input type="text" className="form-control InputGeneral" onFocus={() => toggle()} value={`${props.cliente.nombre} ${props.cliente.apellido}`} />
            <div id="clientes" className="dropdownCol shadow mt-2 rounded toggle">
                {props.clientes.map(cliente =>
                    <div className="col-12 btn text-left dropdownColLista" key={cliente.key} onClick={()=>props.AgregarCliente(cliente)}>
                            <span className="text-white">{cliente.nombre} {cliente.apellido} </span><span className="span-small">{cliente.empresa}</span>
                    </div>)}
            </div>
            <div id="clientescover" className="dropdownCol-Cover toggle" onClick={() => toggle()}></div>
        </React.Fragment>
    )
}

