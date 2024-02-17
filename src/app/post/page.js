'use client'
import React, { useEffect, useState } from 'react'

export default function Post() {
  const [info,setInfo]=useState([])
  const [isPost,setIsPost]=useState(false)
  const postHandler =async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data=Object.fromEntries(formData.entries());
    console.log(data);
    const res=await fetch('/api/post',{
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        'Content-Type':'application/json'
      }
    })
    if(!res.ok) return console.log(await res.text())
    const info=await res.json()
    setIsPost(info.success)
    // console.log(info)
  }
  const getInfo=async ()=>{
    const res=await fetch('/api/post')
    if(!res.ok) return console.log(await res.text())
    const data=await res.json()
    // console.log(data)
    setInfo(data.info)
  }
  useEffect(()=>{
      getInfo()
  },[isPost])
  return (
    <div className='bg-slate-500  p-4'>
      <form onSubmit={postHandler} className='flex flex-col bg-slate-400 m-auto p-4 w-2/4 gap-5'>
        <input type="text" className='p-3 rounded-2xl' name='subject' placeholder='Subject' />
        <textarea name="text" className='p-3 w-full h-32 rounded-2xl resize-none'></textarea>
        <button className='bg-yellow-900 rounded-2xl text-white p-3 hover: shadow hover:shadow-slate-800 font-bold hover:text-slate-700 hover:bg-yellow-700 '>post</button>
      </form>
      <section>
        {
          info && info.map(item=>{
            return <div key= {item._id} className='flex flex-col gap10 w-2/3 m-auto rounded-sm bg-slate-300 p-3 mt-5 mb-5'>
              <h1 className='font-bold'>{item.subject}</h1>
              <p className='p-2'>{item.text}</p>
            </div>
          })
        }
      </section>
    </div>
  )
}
