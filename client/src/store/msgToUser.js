import { createSlice } from "@reduxjs/toolkit";





const msgTohim = null


const msgSlice = createSlice({
    name:'msgData',
    initialState:msgTohim,


    reducers:{

msgToUser:(state,action)=>{
    const msg = action.payload;



return msg;

}

    }
})


export const msgSliceAction = msgSlice.actions;

export default msgSlice;