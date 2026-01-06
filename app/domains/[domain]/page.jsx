import ParticularDomainPage from '@/Components/Pages/ParticularDomainPage'
import React from 'react'

const ParticularDomainPageRouter = ({ params }) => {
    let { domain } = params
    return (
        <div>
            <ParticularDomainPage domain={domain} />
        </div>
    )
}

export default ParticularDomainPageRouter