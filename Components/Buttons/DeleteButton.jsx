'use client'
import { axiosInstance } from '@/axiosAPIs/apiCalls'
import DeleteIcon from '@/Icons/DeleteIcon'
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'

const DeleteButton = ({ domain, email, }) => {
    let [showModal, setShowModal] = useState()
    let [loading, setLoading] = useState()
    let deleteMailBox = () => {
        setLoading(true)
        axiosInstance.post(`/mail/delete`, { mail: [email] }, { withCredentials: true }).then((response) => {
            toast.success("Deleted successfully")
            window.location.reload()
            setLoading(false)
        }).catch((error) => {
            console.log(error);
            setLoading(false)
            toast.error("Error occured")
        })
    }
    return (
        <div>
            <button onClick={() => setShowModal(true)} className={` text-red-600 `} >
                <DeleteIcon />
            </button>
            <Modal centered className=' ' show={showModal} onHide={() => setShowModal(false)} >
                <Modal.Body>
                    Are you sure , you want to delete this???
                    <div className='my-2 mb-0 flex justify-end items-center gap-2 ' >
                        <button onClick={() => {
                            if (email)
                                deleteMailBox()
                        }} className=' bg-red-500 text-white  p-1 px-2 rounded  ' >
                            {loading ? 'Loading...' : "Delete"}
                        </button>
                        <button onClick={() => setShowModal(false)}
                            className=' bg-slate-500 text-white p-1 px-2 rounded  ' >
                            Cancel
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DeleteButton