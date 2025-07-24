'use client'
import ReplyIcon from '@/Icons/ReplyIcon'
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import MailComposeForm from '../Forms/MailComposeForm'

const ReplyToMail = ({ data }) => {
    let [showModal, setShowModal] = useState()
    return (
        <div className='  ' >
            <button onClick={() => setShowModal((prev) => !prev)}
                className=' flex items-center px-3 fw-medium !rounded-full 
                     p-2 gap-3 border-[1.8px] !text-slate-700 !border-slate-700 hover:bg-slate-100 !text-sm ' >
                <ReplyIcon size={15} />
                Reply
            </button>
            <Modal show={showModal} onHide={() => setShowModal(false)}
                centered size='lg' >
                <Modal.Body>
                    <MailComposeForm reply={data} setShowModal={setShowModal} />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ReplyToMail