'use client'
import EditPenIcon from '@/Icons/EditPenIcon'
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import InputComponent from '../InputComponents/InputComponent'
import { axiosInstance } from '@/axiosAPIs/apiCalls'
import { toast } from 'react-toastify'

const EditMailButton = ({ data, getData, mail }) => {
    let [showModal, setShowModal] = useState()
    let [formData, setFormData] = useState(data)
    let [loading, setLoading] = useState()
    let handleChange = (e) => {
        let { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    let inputField = [
        { label: 'Full Name', name: 'name', },
        { label: "Quota", name: 'quota' },
        {
            label: 'Mail Box Type', name: 'mailBoxType',
            options: [{ label: 'Admin', value: 'admin' },
            { label: 'Member', value: 'emp' },
            { label: 'Super Admin', value: 'super-admin' }]
        },
        { label: 'Active', name: 'active', options: [{ label: 'Active', value: '1' }, { label: 'Block', value: '0' }] }
    ]
    let updateMailBox = () => {
        if (formData.quota && formData.name) {
            setLoading(true)
            axiosInstance.put(`/mail/${mail}`, formData, { withCredentials: true }).then((response) => {
                console.log(response.data);
                toast.success("Updated successfully")
                setLoading(false)
                getData?.()
            }).catch((error) => {
                console.log(error);
                setLoading(false)
                toast.error("Error occured")
            })
        } else
            toast.warning("Fill the fields")
    }
    return (
        <div>
            <button onClick={() => setShowModal((prev) => !prev)} className='   ' >
                <EditPenIcon />
            </button>
            <Modal show={showModal} className=' poppins ' onHide={() => setShowModal(false)} centered >
                <Modal.Header closeButton className='' > Edit MailBox </Modal.Header>
                <Modal.Body className='' >
                    <div> Mail Id : {data?.userMail} </div>
                    {
                        inputField?.map((input, index) => (
                            <div key={index} className={`  `} >
                                <InputComponent handleChange={handleChange} name={input.name} label={input.label}
                                    value={formData[input.name]} options={input.options} />
                            </div>
                        ))
                    }
                    <button onClick={() => updateMailBox()} className=' ms-auto bg-blue-600 text-white rounded p-2 px-3 flex !text-sm ' >
                        {loading ? 'Loading..' : "Update"}
                    </button>
                </Modal.Body>
            </Modal>

        </div>
    )
}

export default EditMailButton