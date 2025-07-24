'use client'
import { dnsRecordDomain } from '@/axiosAPIs/apiCalls'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import LoadingPage from '../UtilsCom/LoadingPage'
import CheckIcon from '@/Icons/CheckIcon'
import CrossIcon from '@/Icons/CrossIcon'

const DnsRecordsModel = ({ show, setShow }) => {
    let [loading, setLoading] = useState()
    let [dnsRecord, setDnsRecord] = useState()
    let getDNSrecordDomain = async () => {
        try {
            setLoading(true)
            let responseData = await dnsRecordDomain(show)
            setDnsRecord(responseData)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    useEffect(() => {
        if (show)
            getDNSrecordDomain()
    }, [show])
    return (
        <div>
            <Modal show={show} onHide={() => setShow(false)} centered size='xl'>
                <Modal.Header className=' ' closeButton >
                    <h5 className=' text-3xl poppins mb-0 ' >  DNS Record </h5>
                </Modal.Header>
                <Modal.Body>
                    <p className=' poppins ' >
                        Please note that changes made to DNS may take up to 24 hours to correctly have their current state reflected on this page.
                        It is intended as a way for you to easily see
                        how to configure your DNS records and to check whether all your records are correctly stored in DNS.
                    </p>
                    {loading ? <LoadingPage height=' min-h-[50vh] ' /> :
                        <main className=' min-h-[50vh] max-h-[70vh] overflow-y-auto ' >
                            <table className=' tablebg w-full  ' >
                                <thead>
                                    <tr>
                                        <th> Name </th>
                                        <th>Type </th>
                                        <th>Correct Data </th>
                                        <th> Current Status </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dnsRecord?.map((dns, index) => {
                                            let mailCowData=dns
                                            return (
                                                <tr key={index} className={` `} >
                                                    <td> {dns.name} </td>
                                                    <td> {dns.type} </td>
                                                    <td> {dns.value} </td>
                                                    <td className=' ' >
                                                        <div className=' flex text-center !h-full !border-0 ' >
                                                            {dns?.valid ?
                                                                <span className=' text-green-600 mx-auto ' >
                                                                    <CheckIcon />
                                                                </span> :
                                                                <span className=' mx-auto flex flex-col gap-2 ' >
                                                                    <span className=' text-red-600 mx-auto ' > <CrossIcon /> </span>
                                                                    {dns.found}
                                                                </span>
                                                            }
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                </tbody>
                            </table>
                        </main>

                    }

                </Modal.Body>

            </Modal>

        </div>
    )
}

export default DnsRecordsModel