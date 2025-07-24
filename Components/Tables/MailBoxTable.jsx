'use client'
import React, { Suspense, useEffect, useState } from 'react'
import LoadingPage from '../UtilsCom/LoadingPage'
import { useRouter } from 'next/navigation'
import CheckDnsButton from '../UtilsCom/CheckDnsButton'
import DeleteIcon from '@/Icons/DeleteIcon'
import DeleteButton from '../Buttons/DeleteButton'
import EditPenIcon from '@/Icons/EditPenIcon'
import EditMailButton from '../Buttons/EditMailButton'
import { deletemultipleMail } from '@/axiosAPIs/apiCalls'
import useQueryParams from '@/hooks/useQueryParams'

const MailBoxTable = ({ count,total, data, getData, loading, mailCowData }) => {
    let navigate = useRouter()
    let [selectedMails, setSelectedMails] = useState([])
    let [filteredMail, setFilteredMail] = useState([])
    let [loading2, setLoading] = useState()
    let [word, setWord] = useQueryParams('word')
    let addMailToSelectedMails = (mail) => {
        if (mail !== 'all') {
            setSelectedMails((prev) =>
                prev.includes(mail)
                    ? prev.filter((pmail) => pmail !== mail) // remove if already selected
                    : [...prev, mail]                        // add if not selected
            );
        } else {
            setSelectedMails((prev) => {
                let empMails = data?.filter((obj) => obj.mailBoxType == 'emp')
                if (empMails.length == prev.length)
                    return []
                else
                    return empMails.map((obj) => obj.userMail)
            })
        }
    };
    useEffect(() => {
        setFilteredMail(data)
    }, [data])
    return (
        <div>
            <main className='my-2 flex justify-between items-center ' >
                <div className=' flex flex-wrap gap-3 items-center' >
                    <p className=' mb-0 fw-semibold poppins text-slate-500 ' >   Total :
                        <span className=' fw-medium  ' > {mailCowData?.length}/{total} </span> </p>
                    <input type="text" className=' outline-none border-2 border-slate-500  rounded p-1 '
                        placeholder='Search' value={word}
                        onChange={(e) => setWord(e.target.value)}
                    />
                </div>
                <div>
                    {Number(mailCowData?.length) - total > 0 ?
                        <button onClick={() => deletemultipleMail(mailCowData?.map((obj) => obj.username), setLoading)}
                            className=' disabled:bg-red-300 bg-red-400 text-white p-2 rounded !text-sm '>
                            {loading2 ? 'Loading....' : "Delete Extra MailBox"}
                        </button> :
                        < button onClick={() => deletemultipleMail(selectedMails, setLoading)} disabled={loading2 || selectedMails.length == 0}
                            className=' disabled:bg-red-300 bg-red-400 text-white p-2 rounded !text-sm ' >
                            {loading2 ? 'Loading....' : "Delete Selected"}
                        </button>
                    }
                </div>
            </main >
            <main className='h-[70vh] table-responsive  ' >
                <table className='w-full tablebg ' >
                    <thead>
                        <tr>
                            <th className='' >
                                <input type="checkbox" onChange={() => addMailToSelectedMails('all')}
                                    checked={selectedMails?.length != 0 && selectedMails?.length == data?.filter((obj) => obj.mailBoxType == 'emp')?.length} />
                            </th>
                            {/* <th> SI No </th> */}
                            <th> Domain Name </th>
                            <th> Mail Id </th>
                            <th>Name </th>
                            <th> Storage </th>
                            <th> Used percent </th>
                            <th> Message </th>
                            <th> Log Password </th>
                            <th> Mail Type </th>

                            <th>Active Status</th>
                            <th> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        <Suspense fallback={<LoadingPage height=' h-[50vh] ' />} >

                            {!loading && filteredMail?.length > 0 &&
                                filteredMail?.map((item, index) => {
                                    let mcData = mailCowData?.find((mailbox) => mailbox?.local_part == item?.local_part)
                                    let percentage = Number(((mcData?.quota_used / mcData?.quota) * 100).toFixed(2))
                                    let width = percentage > 0 ? percentage : 10
                                    // width = '!w-[' + width + '%]'
                                    let email = item?.userMail || item?.local_part + '@' + item?.domain
                                    return (
                                        <tr key={index} className={` ${index % 2 == 0 ? 'bg-slate-100' : ''} `} >
                                            <td>
                                                <input type="checkbox" disabled={item.mailBoxType != 'emp'}
                                                    onChange={() => addMailToSelectedMails(item.userMail)}
                                                    checked={selectedMails.some((mail) => mail == item.userMail)} />
                                            </td>
                                            {/* <td> {index + 1} </td> */}
                                            <td className=' cursor-pointer !text-blue-600 '
                                                onClick={() => navigate.push(`/domains/${item?.domain}`)} > {item?.domain} </td>
                                            <td>{email} </td>
                                            <td>{item?.name} </td>
                                            <td> {item?.quota} MiB </td>
                                            <td>
                                                <div className={`mx-auto relative !w-[4rem] rounded border-2 min-h-[15px] `} >
                                                    <div style={{ width: `${width}%` }} className={` absolute  !text-xs left-0 top-1/2 bg-green-600 rounded h-[90%] -translate-y-1/2 `} >

                                                    </div>
                                                </div>{percentage} %
                                            </td>
                                            <td> {mcData?.messages} </td>
                                            <td> {item?.logPassword} </td>
                                            <td> {item?.mailBoxType} </td>
                                            <td>{!mcData ? ' Not Connected to server ' : item?.active == '1' ? 'Active' : 'InActive'} </td>
                                            <td>
                                                <div className=' flex items-center justify-center gap-2 ' >
                                                    <EditMailButton data={item} mail={email} getData={getData} />
                                                    <DeleteButton email={email} />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </Suspense>
                    </tbody>
                </table>
                {
                    loading && <LoadingPage height=' h-[50vh] w-full ' />
                }
                {
                    !loading && data?.length == 0 &&
                    <div className=' min-h-[60vh] w-full flex ' >
                        <p className=' m-auto '>
                            No Mailboxes are added so for!!
                        </p>
                    </div>
                }
            </main>
        </div >
    )
}

export default MailBoxTable