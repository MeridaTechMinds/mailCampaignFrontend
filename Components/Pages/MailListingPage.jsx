'use client'
import { axiosInstance } from '@/axiosAPIs/apiCalls'
import LoadingPage from '@/Components/UtilsCom/LoadingPage'
import { setActivePage } from '@/Redux/utilSlice'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
const MailDetailSection = dynamic(() => import('@/Components/Cards/MailDetailSection'), {
    ssr: false,
})
const MailCard = dynamic(() => import('@/Components/Cards/MailCard'), {
    ssr: false,
})
const MailListingPage = ({ type }) => {
    let dispatch = useDispatch()
    let [mailList, setMailList] = useState()
    let [loading, setLoading] = useState()
    let getMail = () => {
        setLoading('page')
        axiosInstance.get(`/mail/mailList/${type}`, { withCredentials: true }).then((response) => {
            console.log(response.data, "mail list");
            setMailList(response.data)
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
            console.log(error, 'mail list');
        })
    }
    let [selectedMailId, setSelectedMailId] = useState()

    useEffect(() => {
        getMail()
        dispatch(setActivePage(type))
    }, [type])
    return (
        <div className=' ' >
            {loading == 'page' ? <LoadingPage /> : 
            <main className=' row container mx-auto p-0' >
                <section className=' col-lg-5 col-xl-4 px-1' >
                    <article className='overflow-y-auto h-[95vh] bg-white rounded  ' >
                        {
                            mailList?.map((mail, index) => {
                                return (<div key={index} className=' ' >
                                    <MailCard mail={mail} setId={setSelectedMailId}
                                        to={type == 'Sent'} selectedId={selectedMailId} />
                                </div>)
                            })
                        }

                    </article>
                </section>
                <section className=' col-lg-7 col-xl-8 px-1  ' >
                    <article className=' bg-white rounded h-[95vh] overflow-y-auto w-full pb-4' >
                        <MailDetailSection uid={selectedMailId} type={type} />
                    </article>
                </section>
            </main>
            }
        </div>
    )
}

export default MailListingPage
