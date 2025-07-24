'use client'
import useQueryParams from '@/Hooks/useQueryParams'
import NextIcon from '@/Icons/NextIcon'
import React, { useEffect, useState } from 'react'

const TablePagination = ({ setData, data, loading }) => {
    const [page, setPage] = useQueryParams('page')
    let [duplicatePage, setDuplicatePage] = useState()
    useEffect(() => {
        if (page && page != duplicatePage)
            setDuplicatePage(page)
    }, [page])
    useEffect(() => {
        if (duplicatePage != page && Number(duplicatePage) > 0)
            setTimeout(() => {
                setPage(duplicatePage)
            }, 100);
    }, [duplicatePage])
    useEffect(() => {
        if (!page)
            setPage(1)
    }, [])
    let totalPages = data?.count ? Math.ceil(Number(data?.count) / 25) : 0
    return (
        <div className={` ${loading ? 'd-none' : ''} flex justify-between items-center my-3 `} >
            <div className=' ' >
                Total : {data?.count || 0}
            </div>
            {totalPages > 0 && <section className=' min-w-[10vw] gap-3 flex justify-between items-center ' >
                {data?.hasPrevious &&
                    <button className=' rotate-180 ' onClick={() => setDuplicatePage((prev) => prev > 1 ? Number(prev) - 1 : prev)} >
                        <NextIcon size={25} />
                    </button>}
                <span className=' bg-slate-300 px-2 mx-2 rounded ' > {page || 1} out of {totalPages} </span>

                {data?.hasNext &&
                    < button onClick={() => setDuplicatePage((prev) => prev <= totalPages ? Number(prev) + 1 : prev)} >
                        <NextIcon size={25} />
                    </button>}
            </section>}
            {/* Which page */}
            <div className=' flex gap-3 items-center ' >
                Page :
                <input type="text" value={duplicatePage || ''} onChange={(e) => {
                    if (e.target.value <= totalPages)
                        setDuplicatePage(e.target.value)
                }} className='w-12 bg-white  border-2 rounded px-2 outline-none text-center ' />
            </div>
        </div >
    )
}

export default TablePagination