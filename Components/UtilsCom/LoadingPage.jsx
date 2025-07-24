import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoadingPage = ({ height }) => {
    return (
        <div className={` ${height ? height : "min-h-[100vh]"} flex `} >
            <Spinner className=' m-auto ' />
        </div>
    )
}

export default LoadingPage