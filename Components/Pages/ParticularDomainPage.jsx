'use client'
import { axiosInstance, getParticularDomainDetailsAPI } from '@/axiosAPIs/apiCalls'
import MailBoxTable from '@/Components/Tables/MailBoxTable'
import TablePagination from '@/Components/Tables/TablePagination'
import BackButton from '@/Components/UtilsCom/BackButton'
import useQueryParams from '@/Hooks/useQueryParams'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import LoadingPage from '../UtilsCom/LoadingPage'

const ParticularDomainPage = ({ domain }) => {
    let [domainDetails, setDomainDetails] = useState()
    let [loading, setLoading] = useState()
    let [mailListData, setMailListData] = useState()
    let [page, setPage] = useQueryParams('page')
    let [word] = useQueryParams('word')
    let getMailBoxData = async (num) => {
        try {
            setLoading('data')
            let mailBoxData = await axiosInstance.get(`/mail/domain/${domain}?page=${num || page}&word=${word || ''}`, { withCredentials: true })
            setMailListData(mailBoxData.data)
            console.log(mailBoxData.data);
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)

        }
    }
    let getParticularDomainDetails = async () => {
        try {
            setLoading(true)
            let responsedata = await getParticularDomainDetailsAPI(domain)
            setDomainDetails(responsedata)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error, 'Particular domain details');
        }
    }
    let navigate = useRouter()
    useEffect(() => {
        if (domain)
            getParticularDomainDetails()
    }, [domain])
    useEffect(() => {
        getMailBoxData()
        // getParticularDomainDetails()
    }, [domain, page,])
    useEffect(() => {
        if (word) {
            setTimeout(() => {
                getMailBoxData(1)
            }, 2000);
            setPage(1)
        }

    }, [word])
    return (
        <div>
            <div className=' flex items-center justify-between ' >
                <h5 className=' capitalize m-3 poppins ' >   {domain} </h5>
                <div className=' flex items-center gap-3 ' >
                    <button onClick={() => navigate.push(`/addDomain/${domain}`)}
                        className=' bg-blue-600 text-white rounded p-2 px-3 !text-sm ' >
                        Edit Domain
                    </button>
                    <BackButton />
                </div>
            </div>
            {/* Mail DEtails */}
            {loading ? <LoadingPage /> : <main className=' ' >
                <MailBoxTable data={mailListData?.data} loading={loading == 'data'} total={mailListData?.overall} count={mailListData?.count}
                    mailCowData={domainDetails?.mailCowMailBox} getData={getParticularDomainDetails} />
                <TablePagination data={mailListData} loading={loading == 'data'} />
            </main>}

        </div>
    )
}

export default ParticularDomainPage