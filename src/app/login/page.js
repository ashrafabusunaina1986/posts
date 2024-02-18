'use client'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Login() {
    const router = useRouter()
    const [token, setToken] = useState('')
    const handlerlogin = async e => {
        e.preventDefault()
        const dataform = new FormData(e.currentTarget)
        const data = Object.fromEntries(dataform)
        if (data.email && data.password) {
            const res = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!res.ok) return console.log(await res.text())
            const datas=await res.json()
            console.log(datas)
            setToken(datas.token)
            if(datas.success) return router.push('/')
        } 
    }
    return (
        <div className='m-auto mt-3 p-3 w-6/12 rounded-2xl bg-slate-400'>
            <form onSubmit={handlerlogin} className='m-auto flex flex-col p-4 rounded-lg bg-slate-600' >
                <input type="email" name='email' placeholder='email' className=' p-3 mb-2 rounded-lg font-bold' />
                <input type="password" name="password" placeholder='password' className=' p-3 mb-2 rounded-lg font-bold' />
                <button className=' p-3 mb-2 rounded-lg font-bold hover:bg-yellow-700 bg-yellow-500 border border-slate-50 hover:text-white'>login</button>
            </form>
            <p className=' w-max m-3 text-slate-100'>for register go to <Link className='text-red-900' href={'/signup'}>signup</Link></p>
        </div>
    )
}

export default Login