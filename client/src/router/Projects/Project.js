import { useState } from "react";
import { useSelector } from "react-redux"

export const MyProjectLogic  = ()=>{
try {
    
    

const [projects,setProjects] = useState([])
const [showProjectForm, setProjectForm] = useState(false)


const loginData = useSelector(s=>s.loginData)



const handleGetProject = async () => {
    try {

        
        
const res = await fetch(`http://localhost:1800/api/project/getProjects/${loginData?.id}`)

const data =await res.json()

if (data?.success) {
    setProjects(data?.projects)
}
        

    } catch (error) {
        console.log(error);
        
    }
}
  
  
      const handleDeleteProject = async (pid) => {
        try {


const res = await fetch(`http://localhost:1800/api/project/deleteProject/${pid}`,{
                method:"DELETE",
            }  );

const data = await res.json();



if (data?.success) {
    handleGetProject()
return  alert(data?.message)
}

        } catch (error) {
            console.log(error);
            
        }
      }







const hanldeprojectLike = async ({pid,id}) => {
    try {
        
        const res = await fetch(`http://localhost:1800/api/project/likeProject/${pid}/${id}`, {
         method:'PUT',
         headers:{
            'Content-Type' : 'application/json'
        },
         
         

        } )

const data = await res.json();



if (data?.success) {
     handleGetProject()
}

  


 



    } catch (error) {
        console.log(error);
        
    }
}





const hanldeprojectDisLike = async ({pid,id}) => {
    try {
        
        const res= await fetch(`http://localhost:1800/api/project/disLikeProject/${pid}/${id}`, {
         method:'PUT',
         headers:{
            'Content-Type' : 'application/json'
        },
         
         

        } )

const data = await res.json();



if (data?.success) {
     handleGetProject()
}

  


 



    } catch (error) {
        console.log(error);
        
    }
}





    return {hanldeprojectDisLike,hanldeprojectLike,handleGetProject,loginData,projects,showProjectForm,setProjectForm,handleDeleteProject}




} catch (error) {
console.log(error);

}
}
