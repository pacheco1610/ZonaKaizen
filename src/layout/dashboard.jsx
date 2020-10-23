import React from 'react'
import Sidebar from './sidebar'
import Navbar from './navbar'

export default function dashboard(props) {
    return (
        <div className="d-flex" id="content-wrapper">
            <Sidebar/>
            <div className="w-100">
                <Navbar/>
                <div className="container">
                    <div id="content" className="bg-secundario pt-5 w-100">
                        <div className="container">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
