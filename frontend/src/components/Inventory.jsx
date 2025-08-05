import React,{useEffect,useState} from 'react';
import axios from 'axios';
export default function Inventory(){
  const [items,setItems]=useState([]);
  useEffect(()=>{
    axios.get('http://localhost:3001/api/inventory',{headers:{Authorization:'Bearer '+localStorage.getItem('token')}})
      .then(res=>setItems(res.data));
  },[]);
  return <div><h2>Inventario</h2>
    <ul>{items.map(i=><li key={i.id}>{i.name} ({i.category}): {i.quantity}</li>)}</ul>
  </div>;
}