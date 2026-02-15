import { createSlice } from "@reduxjs/toolkit"

const searchResult =JSON.parse(localStorage.getItem('job-juction-searchResult'))    || null


const searchSlice =   createSlice({
    name:'searchData',
initialState :searchResult,


reducers :{
saveSearchRes :  (state,action)=>{
    const res = action.payload;



    localStorage.setItem('job-juction-searchResult' , JSON.stringify(res)  );

return res;

}


}


})



export const searchSliceAction = searchSlice.actions;

export default searchSlice