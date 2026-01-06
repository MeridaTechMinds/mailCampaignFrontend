'use client'
import { getUserDataToken } from '@/Redux/utilSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingPage from '../UtilsCom/LoadingPage'
import LoginCom from '../LoginCom'

const LogIncheckWrapper = ({ children }) => {
    let { loading, userData, errorData } = useSelector((state) => state.util)
    let [showPage, setShowPage] = useState()
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserDataToken())
        setShowPage(true)
    }, [])
    return (
        <div>
            {
                !showPage || loading == 'user' ?
                    <LoadingPage /> : userData ? children :
                        <LoginCom />
            }
        </div>
    )
}

export default LogIncheckWrapper