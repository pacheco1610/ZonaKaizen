import React from 'react'

export default function spinnerNuevaTarea(props) {
    if (props.spinner!==false) {
        return (
            <div className="spinerNuevaTarea">
                <div className="contenedorTarea">
                <div className="container">
                <div className="spinner-border bg-text-blue" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <span className="d-block mt-2">
                    Estamos creando tu tarea...
                    </span>
                </div>
                </div>
                
            </div>
        )
    }else{
        return(null)
    }
}
