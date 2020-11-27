import React, { useState, useEffect } from 'react'
import Modal from '../../layout/modal/index'
export default function Lista() {
    const [modal, setModal] = useState(false)
    return (
        <>
        <div className="container">
            asdosaijdsa
        </div>
        <Modal toggle={modal} isClose={setModal}>
            asdasd
        </Modal>
    </>
    )
}
