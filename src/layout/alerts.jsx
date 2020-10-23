import React from 'react'

export const toggleAlert = (tipo,contenido) =>{
    document.getElementById('contenido').innerHTML=contenido
    if (tipo==="sucefull") {
        document.getElementById('alert').classList.add('bg-correcto')
        document.getElementById('alert').classList.toggle('toggled')
    }
    if (tipo==="warning") {
        document.getElementById('alert').classList.add('bg-peligro')
        document.getElementById('alert').classList.toggle('toggled')
    }
    setTimeout(()=>{
        document.getElementById('alert').classList.toggle('toggled')
    }, 3000);
}

export default function alerts() {
    return (
        <div className="shadow" id="alert">
            <div id="contenido"></div>
        </div>
    )
}

