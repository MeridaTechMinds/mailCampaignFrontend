'use client'
import DashWrapper from '@/Components/Wrappers/DashWrapper'
import { setActivePage } from '@/Redux/utilSlice'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const MailComposeForm = dynamic(() => import('@/Components/Forms/MailComposeForm'), {
    ssr: false,
})

const ComposePageRouter = () => {
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(setActivePage('compose'))
    }, [])
    return (
        <div>
            <DashWrapper>
                <MailComposeForm />
            </DashWrapper>
        </div>
    )
}

export default ComposePageRouter