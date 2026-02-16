export const followersLogic = (getFollowers, checkFollows) => {
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
        console.log(data);

        getFollowers();
        checkFollows();
      } catch (error) {
        console.log(error);
      }
    };

    return { handleUnfollow };
  } catch (error) {
    console.log(error);
  }
};
