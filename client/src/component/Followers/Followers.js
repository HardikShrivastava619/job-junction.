export const followersLogic = (getFollowers,checkFollows)=>{
    try {

        
const handleUnfollow = async (id) => {
  try {



    const res = await fetch(`http://localhost:1800/api/follow/unFollow/${id}`, {
      method:'DELETE'
    } )

const data = await res.json()
console.log(data);


 getFollowers()
checkFollows()

  } catch (error) {
    console.log(error);
    
  }
}



return {handleUnfollow}

    } catch (error) {
        console.log(error);
        
    }
}