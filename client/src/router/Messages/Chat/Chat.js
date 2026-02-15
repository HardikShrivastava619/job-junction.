import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../../socket.js";
import { unSeenMsgsAction } from "../../../store/unseenMsgsNumber.js";


export const chatLogic = ()=>{
    try {
        
        
        
const loginData = useSelector(s=>s.loginData)
const [finalChatterArr,setFinalArr] = useState([])
const [currChatingUser,setCurrChatingUser] = useState(null)
const [chat,setChat] = useState([])
const [message , setMessage ] = useState(null)
const [profilePhoto , setPrfilePhoto]  = useState()       
const [activeIndex, setActiveIndex] = useState(); 
const [otherUserTyping,setOtherUserTyping] = useState(false)
const [unSeenMsg , setUnSeenMsg ] = useState([])

const dispatch = useDispatch()



const handleGetUnseenMsg = async () => {
  try {
    const res = await fetch(`http://localhost:1800/api/message/getUnseenMsg/${loginData?.id}`);
    const data = await res.json();

let unseenMSg = data?.rows;


setUnSeenMsg(unseenMSg)
dispatch(unSeenMsgsAction.unSeenMsgNumb(data?.rows))


  } catch (error) {
    console.log(error);
    
  }
}






















const arrOfChat = finalChatterArr?.filter((c,i)=> (c?.sender_id === loginData?.id || c?.sender_id === currChatingUser?.id) &&
(c?.reciever_id === loginData?.id || c?.reciever_id === currChatingUser?.id)          )







const getALLMessengers = async () => {
    try {



const res = await fetch(`http://localhost:1800/api/message/chatusers/${loginData?.id}`) 
const data = await res.json()



setFinalArr(  data?.finalArr)

} catch (error) {
console.log(error);
}}



const uniqueById = finalChatterArr?.filter((obj, index, self) =>
  index === self.findIndex(o => o.id === obj.id)
);




const sendMsg = async () => {
  try {


if (message?.trim()?.length == 0 ) {
  return 
}

    const msgData = new FormData();
    msgData.append('text', message);

    const res = await fetch(`http://localhost:1800/api/message/sendMsg/${loginData?.id}/${currChatingUser?.id}`, {
      method: 'POST',
      body: msgData
    });

    const data = await res.json();


    if (data.success) {



        socket.emit('sendMessage', {
        sender_id: loginData?.id,
role :loginData?.role,
        receiverId: currChatingUser?.id,
        text: message,
        id: data.messageId,
        created_at: data.createdAt,
        imgURL: null ,      
      });

      setMessage("");  


    } else {
      console.error("Failed to send message");
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
};








const updateSeenUnseenMSg = async () => {
  try {


if (currChatingUser != null ) {
  
    const res = await fetch(`http://localhost:1800/api/message/updateSeenMsg/${loginData?.id}/${currChatingUser?.id}`, {
method:'PUT',
headers:{
        'Content-Type':'application/json',
}
})

const data = await res.json()



if (data?.success) {
  socket.emit('seen-later' , {senderId:currChatingUser?.id , receiverId:loginData?.id} )
}




}


} catch (error) {
    console.log(error);
    
  }
}






const convertName = (name) => {
  try {
    return name
      ?.split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  } catch (error) {
    console.log(error);
    return name; }
}


const [rTseenArr,setRTseenArr] = useState([])
const [deleteMSgId , setdeleteMsgId ] = useState([])






const handleDeleteMsg = async () => {
try {
  
if (deleteMSgId?.length) {
        
await Promise.all(
deleteMSgId?.map(async m => {
    const res = await fetch(`http://localhost:1800/api/message/deleteMsg/${m}` ,{
    method:'DELETE',
    }
  )
  
const data = await res.json()




if (data?.success) {
  getALLMessengers()
}

})


)




}


} catch (error) {
  console.log(error);
  
}


}



const handleRemoveUnseenMsgFormSideBar = async () => {
  try {
    
const filterUnssen = await  unSeenMsg?.filter(o=> o?.sender_id  != currChatingUser?.id)


await setUnSeenMsg(filterUnssen)
dispatch(unSeenMsgsAction.unSeenMsgNumb(unSeenMsg))
} catch (error) {
    console.log(error);
    
  }
}




return {arrOfChat,uniqueById,unSeenMsg ,handleGetUnseenMsg, handleRemoveUnseenMsgFormSideBar,setUnSeenMsg ,deleteMSgId,otherUserTyping,setOtherUserTyping ,handleDeleteMsg, setdeleteMsgId, profilePhoto,activeIndex, setActiveIndex ,updateSeenUnseenMSg,rTseenArr,setRTseenArr , setPrfilePhoto,  sendMsg,currChatingUser,setCurrChatingUser,convertName,finalChatterArr ,getALLMessengers,setChat,chat , message ,  loginData ,setMessage   }

    } catch (error) {
        console.log(error);
        
    }
} 