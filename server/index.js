const express = require('express')
const http = require('http')
const {Server}= require('socket.io')
const cors = require('cors')

const app = express();

//http server
const server = http.createServer(app);
// socket server
const io = new Server(server,{
     cors: {
          origin: 'http://localhost:5173', 
          methods: ['GET', 'POST'],
        },
});


// middlewares
app.use(cors());


// http apis
app.get('/',(req,res)=>{
     res.send('hello guess')
}); 

// socket apis
io.on('connection',(socket)=>{
     // console.log('socket is connected')

     socket.on('fromClient',({name,id})=>{
          io.to(id).emit('msg',name)
     })

    
     // custom event
     // io.emit('severMes', 'hello i am sever')
     
     socket.on('disconnect',()=>{
          console.log('A client is disconnected')
     })
})


server.listen(3000,()=>{
     console.log('sever is running...')
})


