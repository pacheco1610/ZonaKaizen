import React from 'react'

export default function buttonSidebar(props) {
    const toggleRight = () =>{
        document.getElementById('wrapper-Container').classList.toggle('toggled')
    }
    return (
        <React.Fragment>
            <button className="btn bg-primary text-white" onClick={()=>toggleRight()}>{props.title}</button>
        </React.Fragment>
    )
}
