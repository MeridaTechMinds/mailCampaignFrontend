'use client'
import React, { useEffect } from 'react'
import SidebarCom from '../DashboardCom/SidebarCom'
import LogIncheckWrapper from './LogIncheckWrapper'
import { useDispatch } from 'react-redux'
import { setActivePage } from '@/Redux/utilSlice'

const DashWrapper = ({ children, active }) => {
    let dispatch = useDispatch()
    useEffect(() => {
        if (active)
            dispatch(setActivePage(active))
    }, [active])
    return (
        <div>
            <LogIncheckWrapper>
                <main className=' md:flex  ' >
                    <SidebarCom />
                    <section className='p-2 flex-1 overflow-hidden ' >
                        <div className='  bg-slate-100 rounded p-2  ' >
                            {children}
                        </div>
                    </section>
                </main>
            </LogIncheckWrapper>
        </div>
    )
}

export default DashWrapper