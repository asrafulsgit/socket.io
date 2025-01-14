import React, { useEffect, useState } from 'react'
import './socket.css'
import {io} from 'socket.io-client'

const Socket = () => {
     const [messages,setMessages]= useState([])
     const [message, setMessage]= useState({})
     const [id,setId]= useState('')
     const socket = io('http://localhost:3000')
     useEffect(()=>{
          socket.on('connect', () => {
               console.log('Connected to the server');
               setId(socket.id); 
          });
          socket.on('msg',(msg)=>{
               setMessages(prev=> [...prev,msg])
          })
     },[])

     const hanldeChange =(e)=>{
          const {name,value} = e.target;
          setMessage({...message,[name]: value})
     }
     const hanldeSubmit =(e)=>{
          e.preventDefault();
          socket.emit('fromClient',message)
          setName('')
     }
     
  return (
    <div>
       <h1>Socket.io</h1>
       <form onSubmit={hanldeSubmit}>
          <p>{id}</p>
          <input type="text" onChange={hanldeChange} name="id" id="id" />
          <input type="text" onChange={hanldeChange}  value={message.name} id='name' name='name' />
          <button type='submit'>Send Message</button>
       </form>
       <ul>
          {messages?.map((item,index)=>{
               return(
                    <li key={index}>{item}</li>
               )
          })}
       </ul>
    </div>
  )
}

export default Socket
