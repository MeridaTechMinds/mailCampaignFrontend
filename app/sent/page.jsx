import DashWrapper from '@/Components/Wrappers/DashWrapper'
import MailListingPage from '@/Components/Pages/MailListingPage'
import React from 'react'

const SentPageRouter = () => {
    return (
        <div>
            <DashWrapper>
                <MailListingPage type='Sent' />
            </DashWrapper>
        </div>
    )
}

export default SentPageRouter