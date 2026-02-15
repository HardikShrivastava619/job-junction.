import { createSlice } from "@reduxjs/toolkit";


const auth = JSON.parse(localStorage.getItem("Job-juction-user-email"))  ||  {email: null   }

const savedEmailSlice = createSlice({
 name:'savedEmailData',
    initialState:auth,
    reducers:{

saveEmail : (state,action)=>{

   state.email = action.payload;

return localStorage.setItem("Job-juction-user-email"  ,  JSON.stringify(state))
}



    }
}) 


export const savedEmailSliceAction = savedEmailSlice.actions;
export default savedEmailSlice