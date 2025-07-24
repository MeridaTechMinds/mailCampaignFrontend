'use client'
import HidePassword from '@/Icons/HidePassword'
import ShowPassword from '@/Icons/ShowPassword'
import React, { useState } from 'react'

const InputComponent = ({ label, disabled, value, name, type, options, accept,
    inputCss, onSubmit, handleChange, required }) => {
    let [showPassword, setShowPassword] = useState()
    let inputAttribute = {
        value: type == 'file' ? null : value,
        name,
        disabled,
        accept,
        onChange: (e) => handleChange(e),
        className: `outline-none bg-white block w-full border-[1.5px] rounded my-2 p-2 ${inputCss}`,
        type: type || 'text',
        onKeyDown: (e) => {
            if (e.key == 'Enter' && onSubmit) {
                onSubmit?.()
            }
        }
    }
    return (
        <div>
            <label htmlFor="" className=' fw-semibold ' >{label} {required && <span className=' text-red-600 ' > * </span>} </label>
            {options ?
                <select {...inputAttribute}>
                    {
                        options?.map((opt, index) => (
                            <option value={opt.value} key={index} > {opt.label} </option>
                        ))
                    }
                </select> :
                type == 'password' ?
                    <div className=' w-full border-[1.5px] rounded my-2 p-2 flex justify-between '>
                        <input  {...inputAttribute} type={showPassword ? 'text' : 'password'}
                            className={`outline-none w-full ${inputCss} `} />
                        <button className=' ' onClick={() => setShowPassword((prev) => !prev)} >
                            {showPassword ? <ShowPassword /> : <HidePassword />}
                        </button>
                    </div> :
                    <input  {...inputAttribute} />
            }
        </div>
    )
}

export default InputComponent