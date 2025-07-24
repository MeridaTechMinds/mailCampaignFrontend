'use client'
import React, { useState } from 'react'
import DnsRecordsModel from '../Models/DnsRecordsModel'

const CheckDnsButton = ({ domain }) => {
    let [showModel, setShowModel] = useState()
    return (
        <div>
            <button onClick={() => setShowModel(domain)} 
            className='text-nowrap bg-yellow-400 text-black fw-medium p-1 px-2 rounded shadow-sm shadow-amber-300 !text-sm ' >
                Check Dns
            </button>
            <DnsRecordsModel domain={domain} show={showModel} setShow={setShowModel} />
        </div>
    )
}

export default CheckDnsButton