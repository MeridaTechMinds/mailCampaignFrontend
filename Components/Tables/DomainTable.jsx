import { useRouter } from 'next/navigation'
import React from 'react'
import LoadingPage from '../UtilsCom/LoadingPage'
import CheckDnsButton from '../UtilsCom/CheckDnsButton'
import { FixedSizeList } from 'react-window'
import { DomainRowData } from './DomainRowData'

const DomainTable = ({ data, loading, mailCowData }) => {
    let navigate = useRouter()
    let fixNumber = (num, divide) => {
        return divide ? (Number(num) / divide).toFixed(1) : Number(num).toFixed(1)
    }
    return (
        <div>
            <main className='h-[70vh] table-responsive  ' >
                <table className='w-full tablebg ' >
                    <thead>
                        <tr>
                            <th> SI No </th>
                            <th> Domain Name </th>
                            <th> Default Storage Capacity </th>
                            <th> Default Mailbox size </th>
                            <th> Max size of mailbox </th>
                            <th> Max Mailboxes </th>
                            <th>Active Status</th>
                            <th> Action </th>
                        </tr>
                    </thead>
                    <tbody>

                        {!loading && data?.length > 0 &&
                            data?.map((item, index) => {
                                let mailcowdata = item?.mailCow
                                let quataUsed = (mailcowdata?.quota_used_in_domain / 1000000000).toFixed(2)
                                let mailBox = mailcowdata?.mboxes_in_domain
                                let defMailBoxSize = fixNumber(mailcowdata?.def_quota_for_mbox, 1000000000)
                                return (
                                    <tr key={index} className={` ${index % 2 == 0 ? 'bg-slate-100' : ''} `} >
                                        <td> {index + 1} </td>
                                        <td className=' cursor-pointer !text-blue-600 '
                                            onClick={() => navigate.push(`/domains/${item?.domain}`)} > {item?.domain} </td>

                                        <td>
                                            {Number(quataUsed) > 0 ? `${quataUsed} GiB ` : '0 B'} / {item?.quota / 1000}  GiB
                                        </td>
                                        <td> {defMailBoxSize} GiB </td>
                                        <td> {fixNumber(item?.maxquota, 1000)} GiB </td>
                                        <td> {mailBox}/{item?.mailboxes} </td>
                                        <td>{item?.active == '1' ? 'Active' : 'InActive'} </td>
                                        <td>
                                            <CheckDnsButton domain={item?.domain} />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                {
                    loading && <LoadingPage height=' h-[50vh] w-full ' />
                }
                {
                    !loading && data?.length == 0 &&
                    <div className=' min-h-[60vh] w-full flex ' >
                        <p className=' m-auto '>
                            No Domains are added so for!!
                        </p>
                    </div>
                }
            </main>
        </div>
    )
}

export default DomainTable