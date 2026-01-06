'use client'
import DomainTable from '@/Components/Tables/DomainTable'
import { getAllDomainForAdmin } from '@/Redux/dataSlice'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const DomainPage = () => {
    let { domains, loading } = useSelector((state) => state.data)
    let dispatch = useDispatch()
    let navigate = useRouter()
    useEffect(() => {
        console.log(domains, 'domains page');
        dispatch(getAllDomainForAdmin())
    }, [])
    return (
        <div>
            <section className=' flex items-center justify-between '>
                <p className=' mb-0 text-xl fw-semibold  ' > Domain List </p>
                <button onClick={() => navigate.push('/addDomain')}
                    className=' bg-blue-600 text-white p-2 px-3 rounded text-sm my-2 ' >
                    + Add Domain
                </button>
            </section>
            <DomainTable data={domains} loading={loading == 'domain'} />

        </div>
    )
}

export default DomainPage