'use client'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation' 

function Signup() {
    const [found,setFound]=useState({})
    const router=useRouter()
    const nameRef = useRef(), emailRef = useRef(), passwordRef = useRef()
    const handlerSubmit = async e => {

        e.preventDefault()
        const formdata = new FormData(e.currentTarget)
        const data = Object.fromEntries(formdata)
        if (nameRef.current.value !== '' && emailRef.current.value !== '' &&
            passwordRef.current.value !== '') {
            const res = await fetch('/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (!res.ok) return console.log(await res.text())
            const datas=await res.json()
            console.log(datas)
            setFound(datas)
            if(datas.success){
                router.push('/')
            }
        } else {
            alert('Please fill all the fields')
        }

    }
    return (
        <div className=' bg-slate-600 rounded-2xl w-4/5 p-4 m-auto mt-4' >
            <form className='flex flex-col p-4 m-auto rounded-2xl' onSubmit={handlerSubmit}>
                {
                    found.success===false ? <div className=' p-3 m-auto mt-1 mb-2 font-bold bg-red-300 border border-red-500 rounded-xl'>{found.message}</div>:''
                }
                <input ref={nameRef} type="text" placeholder='name' name='name' className='p-4 rounded-xl m-2' />
                <input ref={emailRef} type="email" placeholder='email' name='email' className='p-4 rounded-xl m-2' />
                <input ref={passwordRef} type="password" placeholder='password' name='password' className='p-4 rounded-xl m-2' />
                <button className='p-4 rounded-xl font-bold m-2 bg-yellow-500 w-max text-white hover:bg-yellow-200 hover:text-black'>signup</button>
            </form>
        </div>
    )
}

export default Signup