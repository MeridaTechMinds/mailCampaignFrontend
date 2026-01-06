import DomainForm from '@/Components/Forms/DomainForm'
import React from 'react'

const EditingDomainDetails = ({ params }) => {
    let { domain } = params
    return (
        <div>
            <DomainForm domain={domain} />
        </div>
    )
}

export default EditingDomainDetails