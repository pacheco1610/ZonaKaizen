import React from 'react'
import ReactDOM from 'react-dom'
import './estilos.css'
export default function index(props) {
    if (props.toggle===true) {
        return (
            ReactDOM.createPortal(
            <div className='modal'>
                <div className="modalContainer shadow">
                    <div className="d-flex">
                        <button onClick={()=>props.isClose(false)} className="btn text-white ml-auto"><i className="fas fa-times"></i></button>
                    </div>
                    {props.children}
                </div>
                <div className="coverModal" onClick={()=>props.isClose(false)} ></div>
            </div>,
                document.getElementById('modal'))
            
        )
    }else{
        return null;
    }
}
