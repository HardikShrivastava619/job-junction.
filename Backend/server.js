import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors'
import { initDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import educationRoutes from './routes/EducationDetRoutes.js'
import skillRoutes from './routes/skillRoutes.js'
import langRoutes from './routes/languageRoutes.js'
import postRoutes from './routes/postRoutes.js'
import projectRoutes from './routes/ProjectRoutes.js'
import followRoutes from './routes/FollowersRoutes.js'
import messageRoutes from './routes/MessageRoutes.js'
import jobRoutes from './routes/JobRoutes.js'
import notfRoutes from './routes/NotificationRoutes.js'
import CommentRoutes from './routes/CommentRoutes.js'

import { Server } from 'socket.io';
import http from 'http';
import  './model/cleanupRejectedApplications.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server , {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
})


app.set('io', io); 

app.use(express.json());
app.use(morgan('dev'));


const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,PUT,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions)); 


app.use("/api/user",  userRoutes)
app.use("/api/skills",  skillRoutes)
app.use("/api/lang",  langRoutes)
app.use("/api/education",educationRoutes ) 
app.use("/api/post",postRoutes )
app.use("/api/project",projectRoutes )
app.use("/api/follow",followRoutes )
app.use("/api/message",messageRoutes )
app.use("/api/job",jobRoutes )
app.use("/api/comment",CommentRoutes )
app.use("/api/notf",notfRoutes )




const users = {}; 

io.on('connection', (socket) => {
  console.log(`📲 User connected: ${socket.id}`);

  socket.on('register-user', (userId) => {
    users[userId] = socket.id;



    console.log(`✅ Registered user ${userId} with socket ${socket.id}`);
  });



socket.on('sendNotf',(data)=>socket.to(users[data[0].receiver_id]).emit('recievenotf', data )
)




  socket.on('sendMessage', async({ role,sender_id, receiverId, text, id, created_at }) => {
    const receiverSocketId = users[receiverId];
    const senderSocketId   = users[sender_id];



    if (receiverSocketId) {
      
      
      socket.to(receiverSocketId).emit('receiveMessage', {
        sender_id,
        receiverId,
        text,
        id,
        created_at,
      role
      });
    }

    if (senderSocketId && senderSocketId !== receiverSocketId){

      io.to(senderSocketId).emit('receiveMessage', {
        sender_id,
        receiverId,
        text,
        id,
        created_at,
      });
    }
  });





  socket.on('msg-seen', data=>{
    io.to(users[data?.sender_id]).emit('yes-msg-seen',data )
    
  }  )


  socket.on('seen-later' ,  data =>{
    
    io.to(users[data?.senderId]).emit('yes-seen-later', data )
}  )

 
socket.on('typing', ({otherUser,self})=>{
  
  io.to(users[otherUser]).emit('typing-yes', {otherUser,self} )

} )

socket.on('not-Typing', ({otherUser,self})=>{
  
  io.to(users[otherUser]).emit('not-Typing-now', {otherUser,self} )

} )





  socket.on('disconnect', () => {
    for (let uid in users) {
      if (users[uid] === socket.id) {
        delete users[uid];
        break;
      }
    }
    console.log(`❌ Disconnected: ${socket.id}`);
  });
});


app.get('/', (req, res) => {
  res.send('Welcome to My site');
});

const startServer = async () => {
  try {
    await initDB(); 
    server.listen(process.env.PORT, () => {
      console.log(`🚀 Server running at port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
  }
};

startServer();

 