'use client'
import React, { useState } from 'react'
import LoginForm from './Forms/LoginForm'
import Image from 'next/image'
import logo from '../public/SiFiNLogo.png'



const LoginCom = () => {

    return (
        <div className='bg-[#1c1c1e] min-h-[100vh] flex ' >
            <main className=' bg-white m-auto col-11 col-sm-6 col-lg-5 p-3 border-2 rounded ' >
                <Image src={logo} alt='Logo' className=' mx-auto ' width={100} height={100} />
                <LoginForm />
            </main>
        </div>
    )
}

export default LoginCom