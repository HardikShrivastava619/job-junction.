import { useState } from "react";
import { useSelector } from "react-redux";

export const MyPostLogic = () => {
  try {
    const [posts, setPosts] = useState([]);
    const [showPostForm, setPostForm] = useState(false);

    const loginData = useSelector((s) => s.loginData);

    const handleGetPosts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/post/getPost/${loginData?.id}`,
        );

        const data = await res.json();
        if (data?.success) {
          setPosts(data?.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const handleDeletePost = async (pid) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/post/deletePost/${pid}`,
          {
            method: "DELETE",
          },
        );

        const data = await res.json();

        if (data?.success) {
          handleGetPosts();
          return alert(data?.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    function getDateDifference(givenDateString) {
      const currentDate = new Date();
      const givenDate = new Date(givenDateString);

      // Calculate difference in milliseconds
      const diffMs = currentDate - givenDate;

      // Convert to time units
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);
      const diffSeconds = Math.floor((diffMs / 1000) % 60);

      return {
        days: diffDays,
        hours: diffHours,
        minutes: diffMinutes,
        seconds: diffSeconds,
      };
    }

    const hanldepostLike = async ({ pid, id }) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/post/likePost/${pid}/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const data = await res.json();
        console.log(data);

        if (data?.success) {
          handleGetPosts();
        }
      } catch (error) {
        console.log(error);
      }
    };

    const hanldepostDisLike = async ({ pid, id }) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/post/disLikePost/${pid}/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const data = await res.json();
        console.log(data);

        if (data?.success) {
          handleGetPosts();
        }
      } catch (error) {
        console.log(error);
      }
    };

    return {
      handleGetPosts,
      hanldepostLike,
      hanldepostDisLike,
      loginData,
      posts,
      showPostForm,
      getDateDifference,
      setPostForm,
      handleDeletePost,
    };
  } catch (error) {
    console.log(error);
  }
};
