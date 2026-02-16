import { useState } from "react";

export const followeingsLogic = (getFollowers, paramsId) => {
  try {
    const handleUnfollow = async (id) => {
      try {
        const res = await fetch(
          `https://job-junction-dpvo.onrender.com/api/follow/unFollow/${id}`,
          {
            method: "DELETE",
          },
        );

        const data = await res.json();

        await getFollowers();
      } catch (error) {
        console.log(error);
      }
    };

    const [name, setName] = useState();

    const handleGetName = async () => {
      try {
        const res = await fetch(
          `https://job-junction-dpvo.onrender.com/api/user/getUserName/${paramsId}`,
        );
        const data = await res.json();

        setName(data?.name);
      } catch (error) {
        console.log(error);
      }
    };

    return { handleUnfollow, handleGetName, name };
  } catch (error) {
    console.log(error);
  }
};
