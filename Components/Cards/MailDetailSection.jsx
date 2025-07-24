'use client'
import { axiosInstance } from '@/axiosAPIs/apiCalls'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import LoadingPage from '../UtilsCom/LoadingPage'
import { formatToISTReadable, fromAddressformat } from '@/axiosAPIs/utils'
import ReplyToMail from '../MailCom/ReplyToMail'
import DownloadButton from '../Buttons/DownloadButton'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDataToken } from '@/Redux/utilSlice'

const MailDetailSection = ({ type, uid }) => {
    let { userData } = useSelector((state) => state.data)
    let [mailDetail, setMailDetail] = useState()
    let [userDetails, setUserDetails] = useState()
    let [loading, setLoading] = useState()
    let getMailDetail = () => {
        setLoading(true)
        axiosInstance.get(`/mail/mailData?type=${type}&uid=${uid}`, { withCredentials: true }).then((response) => {
            console.log(response.data, 'particular mail data');
            setMailDetail(response.data)
            setLoading(false)
        }).catch((error) => {
            console.log(error);
            setLoading(false)
            toast.error("Error occured")
        })
    }
    console.log(userData, 'particular log data');
    let dispatch = useDispatch()
    useEffect(() => {
        if (uid)
            getMailDetail()
    }, [uid, type])
    useEffect(() => {
        setUserDetails(sessionStorage.getItem('action'))
        // dispatch(getUserDataToken())
    }, [])
    return (
        <div className=' w-full h-full flex  ' >
            {loading ? <LoadingPage height={' w-full '} /> : mailDetail ?
                <main className=' p-3 poppins w-full relative  ' >
                    <section className=' h-[93%] overflow-y-auto' >
                        {/* SUbject */}
                        <div className=' flex items-center justify-between ' >
                            <h6 className=' !text-xl ' > {mailDetail?.subject} </h6>
                            {(userDetails == 'admin' || userDetails == 'super-admin')
                                && <DownloadButton data={mailDetail} />}
                        </div>
                        <p className='  ' > {mailDetail?.date ? formatToISTReadable(mailDetail?.date) : ''} </p>
                        <div className=' flex items-start gap-3 flex-wrap '>
                            {/* From */}
                            <div>
                                <p className=' mb-0 text-slate-400 ' > From </p>
                                <p className=' '>
                                    {mailDetail?.from ? fromAddressformat(mailDetail?.from, 1) || mailDetail?.from : ''} <a className=' cursor-pointer !text-xs underline '>
                                        {mailDetail?.from ? fromAddressformat(mailDetail?.from, 2) : ''}
                                    </a>
                                </p>
                            </div>
                            {/* To */}
                            <div className='  ' >
                                <p className=' mb-0 text-slate-400 ' > To
                                    <span className=' bg-blue-400 text-white rounded p-1 text-sm mx-2' > {mailDetail?.to && mailDetail?.to?.split(',').length} </span> </p>
                                {mailDetail?.to?.indexOf(',') != -1 ?
                                    <div className=' flex max-h-[15vh] overflow-y-auto items-center gap-2 flex-wrap ' >
                                        {
                                            mailDetail?.to?.split(',').map((toMail, index) => {
                                                let mail = toMail?.indexOf('<') != -1 ? fromAddressformat(toMail, [2]) : toMail
                                                return (
                                                    <p key={index}
                                                        className=' bg-slate-600/20 rounded-full px-2 p-1 !text-xs '>
                                                        {mail}
                                                    </p>
                                                )
                                            })
                                        }
                                    </div> : typeof mailDetail?.to == 'string' ?
                                        <p className=' bg-slate-600/20 rounded-full px-2 p-1 !text-xs '>
                                            {mailDetail.to}  </p> : ''}
                            </div>
                        </div>

                        <article className='h-[10px] border-b-[1px] w-full ' ></article>
                        {/* Mail Body data html body */}
                        <section dangerouslySetInnerHTML={{ __html: mailDetail?.htmlBody }} className='pt-3 ' >
                        </section>
                        {/* Text body */}
                        {/* <section> {mailDetail?.textBody} </section> */}

                    </section>
                    {type != 'Sent' && <div className='  w-full sticky bottom-0 ' >
                        <ReplyToMail data={mailDetail} />
                    </div>}

                </main> : <div className=' m-auto fw-semibold text-slate-600 text-2xl ' >
                    No Message Selected
                </div>}
        </div>
    )
}

export default MailDetailSection