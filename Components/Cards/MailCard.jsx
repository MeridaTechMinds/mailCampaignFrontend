'use client'
import { makeReadableTime } from '@/axiosAPIs/utils';
import React, { useState } from 'react'

const MailCard = ({ mail, setId, selectedId, to }) => {
    let [seenMail, setSeenMail] = useState(mail?.seen)
    const match = mail?.from?.match(/"?([^"]*)"?\s*<([^>]+)>/);
    let name = match?.[1]
    let email = match?.[2]

    return (
        <div onClick={() => { setId(mail.uid); setSeenMail(true) }}
            className={` ${selectedId == mail.uid ? ' bg-slate-200 ' : ''} 
            p-2 flex cursor-pointer hover:bg-slate-200 my-1   `}>
            <div className=' w-[70%] ' >
                <p className={` ${seenMail ? '' : ' fw-medium'} mb-1 line-clamp-1 `} > {!to ? name : ''}
                    <span className={` fw-normal !text-sm `} > {to ? mail.to : `(${email || mail?.from})`} </span>
                </p>
                <p className={` ${seenMail ? '' : ' fw-medium'} mb-1 line-clamp-1 !text-xs `} > {mail?.subject} </p>
            </div>
            <div className=' w-[30%] ' >
                <p className={` ${seenMail ? '' : 'fw-medium '}  !text-end  !text-xs mb-1`}>
                    {mail?.date ? makeReadableTime(mail?.date) : ''}
                </p>
            </div>
        </div>
    )
}

export default MailCard