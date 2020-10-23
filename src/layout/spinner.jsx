import React from 'react'

export default function spinner() {
    return (
        <div className="spinner">
            <div className="spinner-border bg-text-blue" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}
