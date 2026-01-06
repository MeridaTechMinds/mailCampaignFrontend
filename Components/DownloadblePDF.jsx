'use client'
import { formatToISTReadable } from '@/axiosAPIs/utils';
import React from 'react'

const DownloadblePDF = ({ data, pdfRef }) => {
    console.log(data, 'Mail showing data');

    return (
        <div className='  ' ref={pdfRef} >
            <main>
                <p className=' mb-1 ' > <span className=' text-xl fw-medium text-teal-500 ' > From : </span> {data?.from} </p>
                <p> <span className=' text-xl fw-medium text-teal-500 ' > Subject : </span>
                    {data?.subject} </p>
                <p> <span className=' text-xl fw-medium text-teal-500 ' >Date : </span> {data?.date ? formatToISTReadable(data?.date) : ''} </p>
                <span className=' text-xl fw-medium text-teal-500 ' >  Mail Body :</span>
                <div className='bg-slate-900/10 rounded p-2 my-2 ' dangerouslySetInnerHTML={{ __html: data?.htmlBody }} >

                </div>
                <p className=' mb-1 flex flex-wrap gap-2 items-end' > <span className=' text-xl fw-medium text-teal-500 ' >  To :</span>
                    {data?.to?.split(',')?.map((mail) =>
                        <span key={mail} className=' text-xs ' >
                            {mail}
                        </span>)}
                </p>
            </main>
        </div>
    )
}

export default DownloadblePDF