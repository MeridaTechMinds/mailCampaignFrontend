import DashWrapper from '@/Components/Wrappers/DashWrapper'
import React from 'react'

const DomainLayoutRouter = ({ children }) => {
    return (
        <div>
            <DashWrapper active='domain' >
                {children}
            </DashWrapper>
        </div>
    )
}

export default DomainLayoutRouter