import React, {useState} from 'react';
import axios from 'axios';
export default function Login(){
  const [u,setU]=useState(''),[p,setP]=useState('');
  const login=async()=>{
    const res=await axios.post('http://localhost:3001/api/auth/login',{username:u,password:p});
    localStorage.setItem('token',res.data.token);
    window.location.href='/dashboard';
  };
  return <div><h2>Login</h2>
    <input onChange={e=>setU(e.target.value)} placeholder="Usuario"/>
    <input type="password" onChange={e=>setP(e.target.value)} placeholder="Password"/>
    <button onClick={login}>Entrar</button>
  </div>;
}