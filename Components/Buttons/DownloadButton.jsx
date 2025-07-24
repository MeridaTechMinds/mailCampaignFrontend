'use client'
import React, { useRef } from 'react'
import { Modal } from 'react-bootstrap'
import DownloadblePDF from '../DownloadblePDF'


const DownloadButton = ({ data }) => {
    let pdfRef = useRef()
    const handlePrint = () => {
        const printContents = pdfRef.current.innerHTML;
        const originalContents = document.body.innerHTML;

        // Replace body content with the selected div
        document.body.innerHTML = printContents;
        window.print();
        // Restore original content after print
        document.body.innerHTML = originalContents;
        // window.location.reload(); // Reload to rebind React events
    };
    return (
        <div>
            <button onClick={() => handlePrint()}
                className=' bg-red-700 text-white p-2 px-3 rounded  !text-xs  ' >
                Download
            </button>
            <div className=' d-none ' >
                <DownloadblePDF pdfRef={pdfRef} data={data} />
            </div>
        </div>
    )
}

export default DownloadButton