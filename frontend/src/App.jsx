import React from "react";

import { useState } from 'react';

export default function App(){
 const [name,setName]=useState('');
 const [email,setEmail]=useState('');
 const [password,setPassword]=useState('');
 const [mode,setMode]=useState('login');
 const [msg,setMsg]=useState('');

 const submit=async(e)=>{
  e.preventDefault();
  const url= mode==='login' ? '/api/login' : '/api/register';
  const res=await fetch('http://13.236.201.162:5000'+url,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({name,email,password})
  });
  const data=await res.json();
  setMsg(JSON.stringify(data));
 };

 return <div>
  <h1>MERN Auth Demo</h1>
  <button onClick={()=>setMode('login')}>Login</button>
  <button onClick={()=>setMode('register')}>Register</button>

  <form onSubmit={submit}>
    {mode==='register' && <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />}
    <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
    <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
    <button type="submit">{mode}</button>
  </form>

  <pre>{msg}</pre>
 </div>;
}
