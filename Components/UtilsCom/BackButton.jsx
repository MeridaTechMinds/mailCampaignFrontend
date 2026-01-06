'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const BackButton = ({ path }) => {
    let navigate = useRouter()
    return (
        <div>
            <button onClick={() => path ? navigate.push(path) : navigate.back()}
                className=' bg-black p-2 !text-sm px-3 rounded text-white   ' >
                Back
            </button>
        </div>
    )
}

export default BackButton