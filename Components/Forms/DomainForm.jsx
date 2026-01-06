'use client'
import React, { useEffect, useState } from 'react'
import InputComponent from '../InputComponents/InputComponent'
import { toast } from 'react-toastify'
import { makeFormObj } from '@/axiosAPIs/utils'
import { addDomainandMailApi, axiosInstance, getParticularDomainDetailsAPI, updateDomainandMailApi } from '@/axiosAPIs/apiCalls'
import BackButton from '../UtilsCom/BackButton'

const DomainForm = ({ domain }) => {
    let domainobj = {
        domain: '',
        description: '',
        active: '1',

        maxquota: '10240',
        mailboxes: '10',
        quota: '10240',
        aliases: "400",
        backupmx: "0",
        defquota: "500",
        relay_all_recipients: "0",
        rl_frame: "s",
        rl_value: "0",
        restart_sogo: "10",
        excelFile: null
    }
    let [loading, setLoading] = useState()
    let [formData, setFormData] = useState(domainobj)
    let handleChange = (e) => {
        let { name, value, files } = e.target
        if (name == 'excelFile')
            value = files[0]
        if (name == 'defquota' || name == 'mailboxes'
            || name == 'maxquota' || name == 'quota')
            value = value.replace(/\D/g, '')
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    useEffect(() => {
        if (formData.defquota || formData.mailboxes)
            setFormData((prev) => ({
                ...prev,
                maxquota: Number(prev.defquota) + 10,
                quota: Number(prev.defquota) * Number(formData.mailboxes) + 200
            }))
    }, [formData.defquota, formData.mailboxes])

    let inputFields = [
        { label: 'Domain Name', name: 'domain', inputCss: '', show: true, required: true, disabled: domain },
        { label: 'Description', name: 'description', type: 'textarea', inputCss: '', show: true },
        {
            label: 'Active', name: 'active', inputCss: '', show: true,
            options: [{ label: 'Active', value: '1' }, { label: 'Not Active', value: '0' }]
        },
        { label: 'Default per mailbox quota (MiB)', name: 'defquota', inputCss: '', show: true, required: true },
        { label: 'Max. possible mailboxes', name: 'mailboxes', inputCss: '', show: true, required: true },
        { label: 'Max. quota per mailbox (MiB)', name: 'maxquota', inputCss: '', show: true, required: true },
        { label: 'Total domain quota (MiB)', name: 'quota', inputCss: '', show: true, required: true, disabled: true },
        {
            label: 'File for the mails', name: 'excelFile', inputCss: '',
            accept: '.xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            show: true, type: 'file'
        }
    ]
    let validate = () => {
        let isValid = true
        inputFields.filter((input) => input.required).forEach((input, index) => {
            if (!formData[input.name]) {
                toast.warning(`Enter the proper ${input.label}`)
                isValid = false
            }
        })
        return isValid
    }

    let submitForm = async () => {
        if (validate()) {
            let formvalue = makeFormObj(formData)
            setLoading(true)
            try {
                if (domain)
                    await updateDomainandMailApi(formvalue)
                else {
                    await addDomainandMailApi(formvalue)
                    setFormData(domainobj)
                }
                toast.success(`Domain Saved successfully`)
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
                toast.error("Error occured")
            }
        }
    }
    let getParticularDomainDetails = async () => {
        try {
            setLoading(true)
            let responsedata = await getParticularDomainDetailsAPI(domain)
            setFormData({ ...responsedata, active: responsedata?.active + '' })
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error, 'Particular domain details');
        }
    }
    useEffect(() => {
        if (domain)
            getParticularDomainDetails()
    }, [domain])
    return (
        <div  >
            {domain && <BackButton />}
            <main className=' row container mx-auto ' >
                {
                    inputFields.map((input, index) => (
                        <div key={index} className={`col-sm-6 col-md-4 my-2 `} >
                            <InputComponent label={input.label} value={formData[input.name]} options={input.options} required={input.required}
                                name={input.name} disabled={input.disabled} handleChange={handleChange} type={input.type} inputCss={input.inputCss} />
                        </div>
                    ))
                }
            </main>
            <button disabled={loading} onClick={() => submitForm()}
                className={`bg-blue-600 text-white p-2 px-3 rounded ms-auto flex  `} >
                {loading ? 'Loading..' : "Submit"}
            </button>

        </div>
    )
}

export default DomainForm