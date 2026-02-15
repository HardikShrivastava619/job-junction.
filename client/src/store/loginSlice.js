import { createSlice } from "@reduxjs/toolkit";

const loginUser = JSON.parse(localStorage.getItem('job-juction-loginUser'))  ||  null

const loginSlice = createSlice({
    name:'loginData',
initialState:loginUser,
reducers:{

loginUser: (state, action) => {
  const updatedUser = action.payload;
  localStorage.setItem("job-juction-loginUser", JSON.stringify(updatedUser));
  return updatedUser; 
}
,
logOutUser : (state,action)=>{

    localStorage.removeItem("job-juction-loginUser");
    localStorage.removeItem("jobJuncToken");
  
    return null; 
  
}

}
})


export const loginSliceAction = loginSlice.actions;

export default loginSlice;