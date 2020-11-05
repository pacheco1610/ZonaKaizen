import React from 'react'

export default function tooltip(props) {
    if (props.toggle!==false) {
        return (
            <div className="ToolTipe p-2 rounded">
                <span>{props.data}</span>
            </div>
        )
    }else{
        return(null)
    }
}
