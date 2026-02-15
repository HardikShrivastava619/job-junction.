import { createSlice } from "@reduxjs/toolkit";


const msg = JSON.parse(localStorage.getItem("Job-juction-unSeenMsgs"))  ||  []

const unSeenMsgSlice = createSlice({
 name:'unSeenMsgData',
    initialState:msg,
    reducers:{

unSeenMsgNumb : (state,action)=>{
  const res = action.payload;



    localStorage.setItem('Job-juction-unSeenMsgs' , JSON.stringify(res)  );

return res;
}



    }
}) 


export const unSeenMsgsAction = unSeenMsgSlice.actions;
export default unSeenMsgSlice