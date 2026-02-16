import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const otherUserPost = () => {
  try {
    const [posts, setPosts] = useState([]);

    const loginData = useSelector((s) => s.loginData);
    const params = useParams();

    const [allComm, setAllComm] = useState([]);
    const [commText, setText] = useState(null);

    const hanldeComment = async ({ pid, text, uid }) => {
      try {
        const res = await fetch(
          `http://localhost:1800/api/comment/createComment/${loginData?.id}/${pid}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({ text }),
          },
        );

        const data = await res.json();

        setAllComm(data?.rows);

        if (data?.success && rid != loginData?.id) {
          const result = await handleCreateNotification({
            sid: loginData?.id,
            rid: uid,
            eid: pid,
            type: "comment",
            action: null,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    const hanldeGetComment = async (pid) => {
      try {
        const res = await fetch(
          `http://localhost:1800/api/comment/getComment/${pid}`,
        );

        const data = await res.json();

        setAllComm(data?.rows);
      } catch (error) {
        console.log(error);
      }
    };

    const handleGetPosts = async () => {
      try {
        const res = await fetch(
          `http://localhost:1800/api/post/getPost/${params?.id}`,
        );

        const data = await res.json();
        if (data?.success) {
          setPosts(data?.posts);
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
          `http://localhost:1800/api/post/likePost/${pid}/${id}`,
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
          `http://localhost:1800/api/post/disLikePost/${pid}/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const data = await res.json();

        if (data?.success) {
          handleGetPosts();
        }
      } catch (error) {
        console.log(error);
      }
    };

    return {
      handleGetPosts,
      hanldeGetComment,
      commText,
      setText,
      hanldeComment,
      allComm,
      hanldepostLike,
      hanldepostDisLike,
      loginData,
      posts,
      getDateDifference,
    };
  } catch (error) {
    console.log(error);
  }
};
