'use client'
import { logOutUserAPI } from '@/axiosAPIs/apiCalls'
import { getUserDataToken, setUserData } from '@/Redux/utilSlice'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SidebarCom = () => {
    let { activePage, userData } = useSelector((state) => state.util)
    let [userType, setUserType] = useState()
    console.log(userData, 'particular log data in sidebar');
    let [mcData, setMcData] = useState()

    let dispatch = useDispatch()
    let logoutData = async () => {
        try {
            let responseData = await logOutUserAPI()
            sessionStorage.removeItem('mailBoxType')
            sessionStorage.removeItem('action')
            dispatch(setUserData(null))
        } catch (error) {
            console.log(error);
        }
    }
    let navigate = useRouter()
    let tabs = [
        {
            label: 'Dasboard',
            active: 'dashboard',
            path: '/',
            show: userType != 'user'
        },
        {
            label: 'Domains',
            active: 'domain',
            path: '/domains',
            show: userType != 'user'
        },
        {
            label: 'Inbox',
            active: 'INBOX',
            path: '/',
            show: userType == 'user'
        },
        {
            label: 'Sent',
            active: 'Sent',
            path: '/sent',
            show: userType == 'user'
        },
        {
            label: 'Compose',
            active: 'compose',
            path: '/compose',
            show: userType == 'user'
        },
        {
            label: 'Log Out',
            fun: logoutData,
            show: true
        }
    ]
    useEffect(() => {
        setUserType(sessionStorage.getItem('mailBoxType'))
        if (userData)
            setMcData(userData?.mailCow)
    }, [userData?._id])

    return (
        <div className='sticky top-0 p-2 h-[100vh] ' >
            <main className='p-3 flex flex-col gap-3 bg-slate-600 rounded h-full overflow-y-auto scroll1 ' >
                {userType == 'user' &&
                    <section className='poppins  w-[14rem] bg-slate-100 rounded p-2 ' >
                        <h6 className=' !text-xl ' > {userData?.name} </h6>
                        <p className=' !text-sm text-wrap mb-0 ' > {userData?.userMail} </p>
                        {/* Useage */}
                        <div className=' ' >

                        </div>
                    </section>
                }
                {userType == 'user' && mcData &&
                    <main>
                        <div className='relative w-full h-[5px] border-[1.5px]  border-slate-100 rounded  ' >
                            <div style={{
                                width: `${Number(((mcData?.quota_used / mcData?.quota) * 100).toFixed(2)) > 5
                                    ? Number(((mcData?.quota_used / mcData?.quota) * 100).toFixed(2)) : 5}%`
                            }}
                                className=' absolute top-1/2 h-[90%] -translate-y-1/2 bg-white left-0 ' >                        </div>

                        </div>
                        <div className=' !text-sm text-center my-2 text-white ' >
                            {Number(((mcData?.quota_used / mcData?.quota) * 100).toFixed(2))} % used on {Number(mcData?.quota / 1000000).toFixed(1)} MB
                        </div>
                    </main>
                }
                {
                    tabs?.filter((tab) => tab.show)?.map((tab, index) => (
                        <button key={index} onClick={() => {
                            if (tab.fun) {
                                tab.fun?.()
                            }
                            else
                                navigate.push(tab.path)
                        }}
                            className={`duration-500 ${userType == 'user' ? 'text-left' : ''} ${activePage == tab.active
                                ? ' bg-white text-slate-800 p-1 px-3 rounded ' : 'text-white'} `} >
                            {tab.label}
                        </button>
                    ))
                }
            </main>
        </div>
    )
}

export default SidebarCom