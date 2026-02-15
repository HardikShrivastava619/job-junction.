import {configureStore} from "@reduxjs/toolkit";
import savedEmailSlice from "./savedEmailSlice";
import loginSlice from "./loginSlice";
import searchSlice from "./SearchSlice";
import msgSlice from "./msgToUser";
import unSeenMsgSlice from "./unseenMsgsNumber";



const finalStore  = configureStore({
    reducer:{
        savedEmailData:savedEmailSlice.reducer,
loginData:loginSlice.reducer,
searchData : searchSlice.reducer,
msgDmsgData : msgSlice.reducer,
unseenMsgData: unSeenMsgSlice.reducer
    }
})


export default finalStore;