'use client'
import React, { useState } from 'react'
import InputComponent from '../InputComponents/InputComponent'
import { toast } from 'react-toastify'
import { axiosInstance } from '@/axiosAPIs/apiCalls'
import { useDispatch } from 'react-redux'
import { setUserData } from '@/Redux/utilSlice'
import ForgetPasswordModel from '../Models/ForgetPasswordModel'

const LoginForm = () => {
    let [formData, setFormData] = useState({
        userName: '',
        password: '',
        type: 'user'
    })
    let [loading, setLoading] = useState()
    let handleChange = (e) => {
        let { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    let dispatch = useDispatch()
    let loginSubmission = () => {
        if (!formData.userName || !formData.password) {
            toast.warning("Add the fields")
            return
        } else {
            setLoading(true)
            axiosInstance.post(`/auth/signin`, formData, { withCredentials: true }).then((response) => {
                dispatch(setUserData(response.data))
                if (formData.type == 'user')
                    sessionStorage.setItem('mailBoxType', 'user')
                if (response.data?.mailBoxType)
                    sessionStorage.setItem('action', response.data.mailBoxType)
                setFormData({
                    userName: '',
                    password: ''
                })
                setLoading(false)
            }).catch((error) => {
                console.log(error);
                if (error?.response?.data)
                    toast.error(error?.response?.data)
                else
                    toast.error("Error occured")
                setLoading(false)
            })
        }
    }

    return (
        <div className=' w-full ' >
            <InputComponent name='userName' onSubmit={loginSubmission}
                value={formData.userName} handleChange={handleChange} label='User Name :' />
            <InputComponent name='password' value={formData.password} handleChange={handleChange}
                label='Password :' type='password' onSubmit={loginSubmission} />
            <div className=' flex justify-between items-center '>
                <div className=' flex items-center gap-2 ' >
                    <input checked={formData.type == 'user'}
                        onChange={() => setFormData((prev) => ({ ...prev, type: prev.type == 'user' ? '' : 'user' }))}
                        type="checkbox" id='loguser' />
                    <label htmlFor="loguser"> LogIn as User  </label>
                </div>
                <ForgetPasswordModel />
            </div>

            <button disabled={loading} onClick={() => loginSubmission()} className=' my-3 w-[80%] mx-auto bg-green-600 flex items-center 
            p-2 justify-center rounded text-white fw-semibold ' >
                {loading ? "Loading..." : "Sign In"}
            </button>

        </div>
    )
}

export default LoginForm