import React, { useState } from 'react'
import { connect } from 'react-redux'

function ArchivosAdjuntos(props) {
    
    const handleOnChange = (event) => {
        const file = event.target.files[0]
        props.setArchivos(props.archivos.concat(file))
        props.setNombreArchivos(props.nombreArchivos.concat({nombre:file.name,uid:props.usuario.uid}))
    }
    return (
        <div className="bg-secundario p-2 rounded">
            <div className="row">
                <div className="p-2 rounded col-3 m-2 AgregarAdjunto">
                    <label className="label text-center">
                        <i className="fas fa-paperclip"></i>
                        <snap className="d-block">Agregar Archivo</snap>
                        <input type="file" onChange={(e) => handleOnChange(e)} />
                    </label>
                </div>
                {props.archivos.map(item=>
                    <div className="p-2 rounded col-3 m-2 AgregarAdjunto text-center">
                        <i className="fas fa-paperclip"></i>
                        <snap className="d-block">{item.name}</snap>
                    </div> 
                )}
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
export default connect(PropsStore)(ArchivosAdjuntos)