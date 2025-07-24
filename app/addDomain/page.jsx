
import DomainForm from '@/Components/Forms/DomainForm'
import BackButton from '@/Components/UtilsCom/BackButton'
import React from 'react'

const AddDomainPageRouter = () => {
    return (
        <div>
            <div className=' flex justify-between items-center ' >
                <BackButton />
                <a className=' text-decoration-none bg-blue-600 text-white p-2 px-3 rounded text-sm '
                    download href='/DraftMailboxFormat.xlsx' >
                    Download File Format
                </a>
            </div>

            <DomainForm />
        </div>
    )
}

export default AddDomainPageRouter