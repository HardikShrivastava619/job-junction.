import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';

export const recentUploadLogic = () => {
  



const [posts,setPosts] = useState([])


const loginData = useSelector(s=>s.loginData)

const handleGetPosts = async () => {
    try {

        
        
const res = await fetch(`http://localhost:1800/api/post/getPost/${loginData?.id}`)

const data =await res.json()
if (data?.success) {
    setPosts(data?.posts)
}
        

    } catch (error) {
        console.log(error);
        
    }
}
  
  



    return {handleGetPosts,loginData,posts}


}