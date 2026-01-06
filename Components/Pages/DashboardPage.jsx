'use client'
import { setActivePage } from '@/Redux/utilSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminDasPage from './AdminDasPage'
import MailListingPage from './MailListingPage'

const DashboardPage = () => {
    let [userType, setUserType] = useState()

    let dispatch = useDispatch()
    useEffect(() => {
        setUserType(sessionStorage.getItem('mailBoxType'))
        dispatch(setActivePage(userType == 'user' ? 'INBOX' : 'dashboard'))
    }, [])
    return (
        <div>
            {
                userType == 'user' ? 
                    <MailListingPage type='INBOX' />
                    : <AdminDasPage />
            }


        </div>
    )
}

export default DashboardPage