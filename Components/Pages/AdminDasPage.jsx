'use client'
import { axiosInstance } from '@/axiosAPIs/apiCalls'
import React, { useEffect, useState } from 'react'
import DomainPage from './DomainPage'

const AdminDasPage = () => {
    let [dashData, setDashData] = useState()
    let getDashData = () => {
        axiosInstance.get(`/dash/data`, { withCredentials: true }).then((response) => {
            setDashData(response.data)
            console.log(response.data, 'Dashboard data');
        }).catch((error) => {
            console.log(error);
        })
    }
    useEffect(() => {
        getDashData()
    }, [])
    return (
        <div>
            <main className='row container mx-auto '>
                <section className='col-sm-6 col-lg-3 ' >
                    <div className=' text-center p-3 bg-purple-100 h-full flex flex-col justify-between poppins rounded ' >
                        <h6> Total Active Domain </h6>
                        <span>
                            {dashData?.totalActiveDomains}
                        </span>
                    </div>
                </section>
                 <section className='col-sm-6 col-lg-3 ' >
                    <div className=' text-center p-3 bg-blue-100 h-full flex flex-col justify-between poppins rounded ' >
                        <h6> Total InActive Domain </h6>
                        <span>
                            {dashData?.totalInactiveDomains}
                        </span>
                    </div>
                </section>
                 <section className='col-sm-6 col-lg-3 ' >
                    <div className=' text-center p-3 bg-yellow-100 h-full flex flex-col justify-between poppins rounded ' >
                        <h6> Total Active Mailboxes </h6>
                        <span>
                            {dashData?.totalActiveMailBox}
                        </span>
                    </div>
                </section>
                 <section className='col-sm-6 col-lg-3 ' >
                    <div className=' text-center p-3 bg-green-100 h-full flex flex-col justify-between poppins rounded ' >
                        <h6> Total InActive Mailboxes </h6>
                        <span>
                            {dashData?.totalInactiveMailBox}
                        </span>
                    </div>
                </section>
            </main>
            <DomainPage/>
        </div>
    )
}

export default AdminDasPage