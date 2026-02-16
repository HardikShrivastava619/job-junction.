import React, { useState } from 'react'
import './Chat.css'
import ChatSideBar from '../../../component/ChatSidebar/ChatSideBar.jsx'
import {Link, useLocation} from 'react-router-dom';
import {  FaEyeSlash, FaRegEye, FaRegSmileWink } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { VscSend } from "react-icons/vsc";
import { useEffect } from 'react';
import { chatLogic } from './Chat';
import { convertUTCToIST } from '../../../helper.js';
import { useDispatch, useSelector } from 'react-redux';
import socket from "../../../socket.js";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsFillChatTextFill } from "react-icons/bs";
import { unSeenMsgsAction } from '../../../store/unseenMsgsNumber.js';


const Chat = () => {

const  {otherUserTyping,unSeenMsg ,handleGetUnseenMsg,handleRemoveUnseenMsgFormSideBar, setUnSeenMsg ,setOtherUserTyping,arrOfChat,handleDeleteMsg,rTseenArr,deleteMSgId , setdeleteMsgId,uniqueById, activeIndex, setActiveIndex, setRTseenArr,updateSeenUnseenMSg,sendMsg,finalChatterArr,currChatingUser,setCurrChatingUser,convertName,setChat,chat ,getALLMessengers,profilePhoto , setPrfilePhoto, loginData , message , setMessage} = chatLogic()

const msgData = useSelector(s=>s.msgDmsgData)

const unSeenMsgData = useSelector(s=>s.unseenMsgData)

const [employeeUnseen,setEmployeeUnseen] = useState([])
const [compUnseen,setCompUnseen] = useState([])


const dispatch = useDispatch()




useEffect(()=>{
  handleGetUnseenMsg()
},[finalChatterArr])




useEffect(()=>{
  setCurrChatingUser(msgData)


},[])




useEffect(()=>{
const newArr = unSeenMsgData?.filter(o=> o?.role != 'Employee')
const newArrSec = unSeenMsgData?.filter(o=> o?.role == 'Employee')
setEmployeeUnseen(newArrSec)
setCompUnseen(newArr);


},[unSeenMsgData])

useEffect(()=>{
  socket.on('not-Typing-now', ({otherUser,self})=>{


if (otherUser == loginData?.id  && self == currChatingUser?.id) {

setOtherUserTyping(false)

}



} )


return ()=>{
 socket.off('not-Typing-now') 
}


},[currChatingUser])







useEffect(()=>{
  socket.on('typing-yes', ({otherUser,self})=>{



  if (otherUser == loginData?.id  && self == currChatingUser?.id) {

setOtherUserTyping(true)

}



} )


return ()=>{
 socket.off('typing-yes') 
}


},[currChatingUser])





useEffect(()=>{
  if (message?.length > 0) {
 socket.emit("typing" , {otherUser:currChatingUser?.id,self:loginData?.id})
}

else if (message?.length ==0 ){
  
   socket.emit('not-Typing' ,  {otherUser:currChatingUser?.id,self:loginData?.id}   )
}


},[message])










useEffect( () => {
  
  socket.on('receiveMessage'  , async(data) => {
    
    
if (
  (data?.receiverId === loginData?.id && data?.sender_id === currChatingUser?.id) ||
  (data?.sender_id === loginData?.id && data?.receiverId === currChatingUser?.id)
){



      
      setChat((prev) => [...prev, data]);


      if (data?.sender_id == loginData?.id) {
        
        const audio = new Audio("../../../public/audioFiles/msgSent.mp3");
        
        audio.play();

      }


      if (data?.receiverId == loginData?.id) {
        const audio = new Audio("../../../public/audioFiles/msgCamesound.mp3");
       
audio.play();

      }

if (currChatingUser?.id == data?.sender_id) {
  socket.emit('msg-seen', data  )
await updateSeenUnseenMSg()

}


    }

if (data?.receiverId === loginData?.id &&   data?.sender_id !== currChatingUser?.id ) {

   const updatedUnseen = [...unSeenMsg, data];
setUnSeenMsg(updatedUnseen);
dispatch(unSeenMsgsAction.unSeenMsgNumb(updatedUnseen));

}



});





return () => {
  socket.off('receiveMessage');
};
}, [sendMsg]); 


useEffect(() => {
  const seenHandler = (data) => {
    if (
      data?.receiverId === loginData?.id || 
      data?.sender_id === loginData?.id
    ) {
      setRTseenArr(prev=>[...prev ,data?.id ])
    }
  };

  socket.on('yes-msg-seen', seenHandler);



  return () => {
    socket.off('yes-msg-seen', seenHandler);
  };
}, []);




useEffect(() => {
  const seenHandler =async (data) => {
 
 
      if (
  data?.senderId === loginData?.id 
){
      setChat([]); 
await getALLMessengers()    

    }
  };

  socket.on('yes-seen-later', seenHandler);



return () => {
  socket.off('yes-seen-later', seenHandler); 
};
}, []);




const arc =  arrOfChat.concat(chat)

const finalArrOfChat = arc?.sort((a,b)=> new Date(b?.created_at) - new Date(a?.created_at) )





  useEffect(()=>{
    getALLMessengers()
    
  },[loginData,])
  
  









  useEffect(()=>{
      setActiveIndex(currChatingUser?.id)

    updateSeenUnseenMSg()
setChat([])
getALLMessengers()
setMessage('')
setdeleteMsgId([])

handleRemoveUnseenMsgFormSideBar()



















  },[currChatingUser])

  









const handleSelectToDelMsg = async (mid) => {
  try {
    

  return setdeleteMsgId(prev =>  [...prev, mid])


  } catch (error) {
    console.log(error);
    
  }
}






const handleUnSelectToDelMsg= (mid)=>{

const gh = deleteMSgId?.filter(id=> id != mid )
setdeleteMsgId(gh)
}






return (
    <main className='chat-main'   >
<ChatSideBar   unSeenMsg={unSeenMsg}  employeeUnseen={employeeUnseen} compUnseen={compUnseen}   uniqueById={uniqueById}  activeIndex={activeIndex}    convertName={convertName}   setCurrChatingUser={setCurrChatingUser}    ></ChatSideBar>
  

  {currChatingUser ?  <div   className='chat-maincont'  >
<nav class="navbar bg-body-tertiary chat-header"  >
  <div class="container-fluid"  >
    <Link  to={`/MoreDetails/${currChatingUser?.id}`} class="navbar-brand chat-userName"   >
      <img  src={currChatingUser?.profile_photo  }    alt="Logo" width="30" height="24" class="d-inline-block align-text-top  chat-img"/>
  <div className='d-flex flex-column ' >
     <small>  {convertName(currChatingUser?.name)} </small>
  <small style={{fontSize:'x-small'}} > {otherUserTyping  ?  ' 🖋️ typing ...' : '🟢 Online' } </small>
  </div>
    </Link>

{deleteMSgId?.length >  0  ?<div className='deleteMSg' >
  <RiDeleteBin6Line  onClick={handleDeleteMsg}  />
  </div> : <></> }  
  </div>
</nav>
<div className='chat-body'  >

{otherUserTyping ? <div    className='msg-div'    > 
  <img src={  currChatingUser?.profile_photo ?  currChatingUser?.profile_photo    :  <></>  }   className='msg-img'  alt="" />
    <BsFillChatTextFill  className='BsFillChatTextFill '  />
<small className='text-secondary' > </small>
   </div>
 :<></>  }


{ finalArrOfChat?.length == 0  ?  <div style={{ width:'100%', height:'100%',display:'flex',justifyContent:'center',alignItems:'center'  }}   > 
   <img   style={{width:'32vw', height:'40vh'}} src="../../../public/images/newChat.jpg" alt="" />  
     </div>: finalArrOfChat?.map((c,i)=>  (c?.sender_id == loginData?.id   ?  <div    className={ deleteMSgId?.includes(c?.msg_id)  ?  'selectMSg'   : 'ourMsg-div'  }    > 
  <img src={loginData?.profile_photo}   className='msg-img'  alt="" />
    <div className='ourMsg-txt'      onDoubleClick={()=>{handleSelectToDelMsg(c?.msg_id)}}     onClick={()=>{ handleUnSelectToDelMsg(c?.msg_id) }}   >
<p className='msg-para'    >    {c?.text}     </p>

{  c?.is_seen   ||    rTseenArr?.includes(c?.id)  ?       <FaRegEye className='chat_seen' />  :  <FaEyeSlash  className='chat_seen'  />    }


       </div>
<small className='text-secondary' > {convertUTCToIST(c?.created_at)}  </small>
   </div> : <div     key={i}  className='msg-div' > 
  <img src={  currChatingUser?.profile_photo ?  currChatingUser?.profile_photo:  c?.profile_photo} className='msg-img'  alt="" />
    <div className='msg-txt' >  {c?.text}



 </div>
<small className='text-secondary' > {convertUTCToIST(c?.created_at)} </small>
   </div>    
)  )}




</div>

<div className='chatinput-cont' >
<div className='smilecont' > 
<FaRegSmileWink  className='FaRegSmileWink' />
<LuPlus className='FaRegSmileWink' /> 
</div>

<div class="form-floating chatinput ">
<input type="text" class="form-control chat-typemsginput " id="floatingInput" placeholder="name@example.com" value={message} 
 onChange={(e)=>{setMessage(e?.target?.value)}} />
<label for="floatingInput">Type Your Message here ...   </label>
</div>

<button className='send-btns'   onClick={sendMsg}  > <VscSend  style={{marginLeft:'.5vw'}} />  </button>

</div>

  </div>  :    <div  className='nochatFound-imgcont' style={{ width:'73%',height:'100%', marginLeft:'28.8vw', display:'flex' , justifyContent:'center' , alignItems:'center'  } } > <img   style={{width:'15rem'}} src="../../../public/images/noChat.jpg" alt="" />  </div> }
  
  
    </main>
  )
}

export default Chat 

