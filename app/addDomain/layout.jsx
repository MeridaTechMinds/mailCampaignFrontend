import DashWrapper from '@/Components/Wrappers/DashWrapper'
import React from 'react'

const AddDomainLayoutRouter = ({ children }) => {
    return (
        <div>
            <DashWrapper active='domain' >
                {children}
            </DashWrapper>
        </div>
    )
}

export default AddDomainLayoutRouter