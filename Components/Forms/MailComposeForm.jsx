'use client'
import { axiosInstance } from '@/axiosAPIs/apiCalls'
import { fromAddressformat } from '@/axiosAPIs/utils'
import CrossIcon from '@/Icons/CrossIcon'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill-new'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import SelectMyTeamButton from '../Buttons/SelectMyTeamButton'
import SelectAdmins from '../Buttons/SelectAdmins'
import * as XLSX from 'xlsx';

const MailComposeForm = ({ reply, setShowModal }) => {
    let { userData } = useSelector((state) => state.util)
    let [receiptent, setReceiptent] = useState()
    let [userDetails, setUserDetails] = useState()
    let [loading, setLoading] = useState()
    let mailObj = {
        to: [],
        from: userData?.userMail,
        text: '',
        subject: '',
        html: ''
    }
    let [formData, setFormData] = useState(mailObj)
    let handleChange = (e) => {
        let { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    let addReceiptentToSendingAddress = () => {
        const isValidEmail = receiptent?.includes('@');
        const isDuplicate = formData.to?.some((mail) => mail === receiptent);
        if (isValidEmail && !isDuplicate) {
            setFormData((prev) => ({
                ...prev,
                to: [...(prev.to || []), receiptent]
            }));
            setReceiptent('')
        } else {
            toast.warning("Enter the valid mail")
        }
    }
    let validate = () => {
        if (formData.to.length == 0 && !reply) {
            toast.warning("Add the TO addresses")
            return false
        }
        if (formData.subject == '' && !reply) {
            toast.warning("Add the subject")
            return false
        }
        if (formData.html == '') {
            toast.warning("Add the Message")
            return false
        }
        return true
    }
    let sendMail = () => {
        if (validate()) {
            setLoading(true)
            let formValue = formData
            if (reply) {
                let fromMail = fromAddressformat(reply.from, 2)
                const originalSubject = reply?.subject || '';
                const normalized = originalSubject.trim().toLowerCase();

                formValue.subject = normalized.startsWith('re:') ? originalSubject : `Re: ${originalSubject}`;
                formValue.to = fromMail || reply.from
                formValue.inReplyTo = reply.inReplyTo || reply?.messageId
                formValue.references = reply.references || reply?.messageId
                formValue.html = formData.html + '\n' + reply?.htmlBody
            }
            console.log(formValue);
            // return
            axiosInstance.post(`/mail/sendMail`, formValue,
                { withCredentials: true }).then((response) => {
                    setFormData(mailObj)
                    toast.success("Mail sended successfully")
                    setLoading(false)
                    setShowModal?.()
                }).catch((error) => {
                    console.log(error);
                    setLoading(false)
                    toast.error("Error occured")
                })
        }
    }
    useEffect(() => {
        setUserDetails(sessionStorage.getItem('action'))
    }, [])

    let excelReader = (e) => {
        let file = e.target.files[0]
        if (file) {
            let reader = new FileReader()
            reader.onload = (evt) => {
                let data = evt.target.result
                const workbook = XLSX.read(data, { type: 'binary' })
                let sheetName = workbook.SheetNames[0]
                let workSheet = workbook.Sheets[sheetName]
                let jsonData = XLSX.utils.sheet_to_json(workSheet, { defval: '' })
                let email = jsonData?.map((obj) => obj.mail)?.filter((obj) => obj != undefined && obj != '')
                if (email.length == 0) {
                    toast.warning(`No email is added check the file , the column has to be "mail"`)
                } else {
                    setFormData((prev) => ({
                        ...prev,
                        to: email
                    }))
                }
                console.log(email, 'json Data');

            }
            reader.readAsBinaryString(file)
        }
    }
    return (
        <div className=' poppins' >

            {/* To section */}
            {!reply && <main className=' ' >
                <div className=' flex justify-end gap-3 ' >
                    {(userDetails == 'admin' || userDetails == 'super-admin') &&
                        <SelectMyTeamButton setFormData={setFormData} />}
                    {userDetails == 'super-admin' && <SelectAdmins setFormData={setFormData} />}
                </div>
                <main className=' flex justify-between items-center ' >
                    <div>
                        To: <span className=' bg-slate-900/10 p-1 rounded-full ' > {formData?.to?.length} </span>
                    </div>
                    <div className=' flex gap-3 items-center my-2 ' >

                        <input type="file" id='excelupload' className=' hidden ' accept='.xlsx, .xls' onChange={(e) => excelReader(e)} />
                        <label htmlFor="excelupload" className=' bg-slate-500 text-white rounded p-2 !text-sm ' > Excel Uplaod </label>

                        <button onClick={() => setFormData((prev) => ({
                            ...prev,
                            to: []
                        }))} className=' bg-blue-600 text-white p-2 rounded !text-sm ' >
                            Reset To Address
                        </button>
                    </div>
                </main>
                <div className=' !text-xl flex gap-2 max-h-[30vh] overflow-y-scroll ' >

                    <section className='flex flex-wrap !text-sm gap-3 items-center ' >
                        {formData.to?.map((mail, id) => (
                            <span key={id} className=' border-[1px] flex gap-2 hover:bg-slate-300 cursor-pointer rounded-full bg-slate-200 px-2 ' > {mail}
                                <button onClick={() => setFormData((prev) => ({
                                    ...prev,
                                    to: prev.to?.filter((mail2) => mail2 != mail)
                                }))} className='  ' >
                                    <CrossIcon size={10} />
                                </button> </span>
                        ))}
                    </section>
                </div>
                <section className=' w-full items-center pe-3 ' >
                    <div className=' relative ' >
                        <input type="text" value={receiptent} onChange={(e) => {
                            let value = e.target.value
                            if (value.indexOf(' ') != -1) {
                                let arry = value?.split(' ').concat(formData.to || [])
                                let uniqueArry = new Set(arry)
                                arry = [...uniqueArry]
                                setFormData((prev) => ({
                                    ...prev,
                                    to: arry?.map((mail) => mail.replace(/\s/g, ''))
                                }))
                            } else
                                setReceiptent(e.target.value)
                        }}
                            onKeyDown={(e) => {
                                if (e.key == 'Enter')
                                    addReceiptentToSendingAddress()
                            }}
                            placeholder='Add a recipient' className=' border-b-[1px] outline-none my-2 w-full ' />
                    </div>
                    {receiptent &&
                        <button onClick={() => addReceiptentToSendingAddress()
                        } className=' hover:bg-slate-50 text-blue-600 fw-medium bg-slate-100 !text-sm absolute border-2 border-slate-400 shadow-sm px-2 !rounded-xl text-nowrap '>
                            Add a Receiptent <br />
                            <span className=' !text-xs text-slate-600 ' >  {receiptent} </span>
                        </button>
                    }

                </section>
            </main>}
            {/* Subject */}
            {!reply && <main className='my-2 items-end !text-lg flex gap-2 ' >
                <label htmlFor="" className=' text-nowrap ' >  Subject : </label>
                <input type="text" name='subject' value={formData.subject} onChange={(e) => handleChange(e)}
                    className='h-fit !text-sm border-b-[1px] outline-none w-full ' />
            </main>}
            {/* Mail box */}

            <ReactQuill value={formData.html} className=' bg-white h-[50vh] mb-0 pb-0'
                onChange={(value) => setFormData((prev) => ({ ...prev, html: value }))} />


            <div className=' mt-14 ' >
                <button onClick={() => sendMail()} disabled={loading}
                    className=' mt-10 bg-blue-800 text-white p-2 rounded px-3 ' >
                    {loading ? 'Loading...' : "Send"}
                </button>
            </div>
        </div >
    )
}

export default MailComposeForm