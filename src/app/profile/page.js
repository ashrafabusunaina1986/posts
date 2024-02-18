'use client'
import Link from 'next/link'
import React from 'react'

function Profile() {
  const handlerlogout = async () => {
    const res = await fetch('/api/users/logout')
  }
  return (
    <div className='p-4'>
      <Link href={'/'} className='p-3 rounded-3xl text-white hover:bg-slate-200 font-bold bg-slate-400 hover:text-black' onClick={handlerlogout}>Logout</Link>
      Profile
    </div>
  )
}

export default Profile