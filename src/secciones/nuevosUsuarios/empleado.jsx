import React from 'react'

export default function empleado(props) {
    return (
        <div className="row">
            <div className="col-12 text-center">
                <span className="bg-text-secundario">Ingresa la referencia de tu empresa</span>
            </div>
            <div className="col-12 mt-3">
                <input type="email" className="form-control InputGeneral"placeholder="Ingresa tu referencia" />
            </div>
            <div className="col-12 mt-3">
                <button className="btn btn-block bg-blue">Continuar</button>
            </div>
        </div>
    )
}
