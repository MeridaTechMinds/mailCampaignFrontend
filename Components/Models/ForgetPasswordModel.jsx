'use client'
import { axiosInstance } from '@/axiosAPIs/apiCalls'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import LoadingPage from '../UtilsCom/LoadingPage'
import InputComponent from '../InputComponents/InputComponent'

const ForgetPasswordModel = () => {
    let [showModel, setShowModel] = useState()
    let [loading, setLoading] = useState()
    let [formData, setFormData] = useState({
        otp: '',
        receivedOtp: '',
        password: ''
    })
    let handleChange = (e) => {
        let { name, value } = e.target
        if (name == 'otp')
            value = value?.replace(/\D/g, '')
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    let getOtp = () => {
        setLoading('page')
        axiosInstance.post(`/auth/adminOtp`).then((response) => {
            setFormData((prev) => ({
                ...prev,
                receivedOtp: response.data.otp
            }))
            toast.success("Mail has been send check for the OTP")
            setLoading(false)
        }).catch((error) => {
            console.log(error);
            setLoading(false)
            toast.error("Error occured")
        })
    }
    let changePassword = () => {
        if (formData.receivedOtp == formData.otp) {
            if (formData.password)
                axiosInstance.put(`/auth/changePassword`, { password: formData.password }).then((response) => {
                    toast.success("Password changed successfully")
                    setFormData({
                        otp: '',
                        receivedOtp: '',
                        password: ''
                    })
                    setShowModel(false)
                }).catch((error) => {
                    console.log(error);
                    toast.error("Error occured")
                })
            else
                toast.warning("Enter the password")
        }
        else
            toast.warning("Enter the Proper OTP")
    }
    useEffect(() => {
        if (showModel)
            getOtp()
    }, [showModel])
    return (
        <div>
            <button onClick={() => setShowModel((prev) => !prev)}
                className=' text-blue-600 text-left ms-auto !text-sm underline '>
                Forget Password??
            </button>
            <Modal centered className=' ' show={showModel}
                onHide={() => setShowModel(false)} >
                <Modal.Header closeButton>
                    Forget Password
                </Modal.Header>
                <Modal.Body className='  '>
                    {loading == 'page' ? <LoadingPage height=' min-h-[30vh] flex ' /> :
                        <main className=' min-h-[30vh] ' >
                            <InputComponent name='otp' handleChange={handleChange} label={'Enter the OTP'} value={formData.otp} />
                            <InputComponent name='password' handleChange={handleChange} label='Enter the new password' value={formData.password} />
                            <button onClick={() => changePassword()} className=' p-2 bg-blue-700 mx-auto flex mt-3 text-white rounded ' >
                                {"Submit"}
                            </button>
                        </main>
                    }
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ForgetPasswordModel