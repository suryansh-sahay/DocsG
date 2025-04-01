const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/authRoutes');
const documentRoutes = require('./routes/documentRoutes');
const cookieParser = require('cookie-parser');
const Document = require('./models/Documents');
const cors = require('cors');

//socket connection
const io = require("socket.io")(3000,{
  cors: {
      origin: 'http://localhost:3001', // Replace with your allowed origin
      methods: ['GET', 'POST'], // Specify the allowed HTTP methods
    }
});


//socket routes
io.on("connection", socket =>{
  console.log('new socket connection',socket.id)
  socket.on('get-document', async (data)=>{
    const document = await Document.findById(data);
    console.log(document)
    socket.join(data);
    socket.emit('load-document', document.content );

    socket.on('send-changes', delta =>{
      console.log(delta)
      socket.broadcast.to(data).emit('recieve-changes',delta);
    });

    socket.on('save-document', async document=>{
       await Document.findByIdAndUpdate(data,{content:document});
    })
  })
})



// database connection
const connectDb = async ()=>{
  try{
    await mongoose.connect(process.env.DATABASE_URL,{
    })
  } catch(err){
    console.log("error while connecting to the db",err)
  }
}
connectDb();
mongoose.connection.once('open',()=>{
  app.listen(3002,()=>{
    console.log("http server running on port 3002 ")
  }
)
})

//http routes
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', req.headers.origin);
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(cors({origin: 'http://localhost:3001',credentials: true}))
app.use(express.json())
app.use(cookieParser())
app.use(authRoutes);
app.use(documentRoutes);
