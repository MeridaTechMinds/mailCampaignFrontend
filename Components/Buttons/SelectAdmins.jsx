'use client'
import { axiosInstance } from '@/axiosAPIs/apiCalls'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const SelectAdmins = ({ setFormData }) => {
    let [loading, setLoading] = useState()
    let getMyTeammates = () => {
        setLoading(true)
        axiosInstance.get(`/mail/admin`, { withCredentials: true }).then((response) => {
            setFormData((prev) => ({
                ...prev,
                to: response.data
            }))
            setLoading(false)
        }).catch((error) => {
            console.log(error);
            setLoading(false)
            toast.error("Error occured")
        })
    }
    return (
        <div>
            <button onClick={() => getMyTeammates()} disabled={loading}
                className=' ms-auto bg-blue-700 text-white p-2 px-3 rounded flex !text-sm ' >
                {loading ? 'Loading....' : "Select All admin"}
            </button>
        </div>
    )
}

export default SelectAdmins