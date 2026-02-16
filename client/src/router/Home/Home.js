import { useState } from "react";
import { useSelector } from "react-redux";
import { handleCreateNotification } from "../../helper.js";

export const HomeLogic = () => {
  try {
    const loginData = useSelector((s) => s.loginData);

    const [posts, setPosts] = useState([]);
    const [likedModal, setLikedModal] = useState(true);

    const handleGetAllPosts = async () => {
      try {
        const res = await fetch(
          `https://job-junction-dpvo.onrender.com/api/post/getAllPosts`,
        );

        const data = await res.json();
        const postsWithComments = await Promise.all(
          data?.posts?.map(async (p) => {
            const resC = await fetch(
              `https://job-junction-dpvo.onrender.com/api/comment/getComment/${p.id}`,
            );
            const comments = await resC.json();
            return { ...p, commentCount: comments?.rows?.length || 0 };
          }),
        );

        setPosts(postsWithComments);
      } catch (error) {
        console.log(error);
      }
    };

    const hanldepostLike = async ({ pid, id, rid }) => {
      try {
        const res = await fetch(
          `https://job-junction-dpvo.onrender.com/api/post/likePost/${pid}/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const data = await res.json();

        if (data?.success) {
          if (data?.likes?.some((i) => i == loginData?.id)) {
            setLikedModal(true);
          } else {
            setLikedModal(false);
          }

          await handleGetAllPosts();

          if (
            data?.likes?.some((i) => i == loginData?.id) &&
            rid != loginData?.id
          ) {
            const result = await handleCreateNotification({
              sid: loginData?.id,
              rid,
              eid: pid,
              type: "like",
              action: "liking",
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    const hanldepostDisLike = async ({ pid, id, rid }) => {
      try {
        const res = await fetch(
          `https://job-junction-dpvo.onrender.com/api/post/disLikePost/${pid}/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const data = await res.json();

        if (data?.success) {
          handleGetAllPosts();
          if (
            data?.disLikes?.some((i) => i == loginData?.id) &&
            rid != loginData?.id
          ) {
            const result = await handleCreateNotification({
              sid: loginData?.id,
              rid,
              eid: pid,
              type: "like",
              action: "unLike",
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    const [allComm, setAllComm] = useState([]);

    const hanldeGetComment = async (pid) => {
      try {
        const res = await fetch(
          `https://job-junction-dpvo.onrender.com/api/comment/getComment/${pid}`,
        );

        const data = await res.json();

        setAllComm(data?.rows);
      } catch (error) {
        console.log(error);
      }
    };

    const [commText, setText] = useState(null);

    const hanldeComment = async ({ pid, text, uid }) => {
      try {
        const res = await fetch(
          `https://job-junction-dpvo.onrender.com/api/comment/createComment/${loginData?.id}/${pid}`,
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

    const hanldedeleteComment = async ({ cid, pid }) => {
      try {
        const res = await fetch(
          `https://job-junction-dpvo.onrender.com/api/comment/deleteComment/${cid}/${pid} `,
          {
            method: "DELETE",
          },
        );

        const data = await res.json();

        setAllComm(data?.rows);
      } catch (error) {
        console.log(error);
      }
    };

    function getDateDifference(givenDateString) {
      const currentDate = new Date();
      const givenDate = new Date(givenDateString);

      const diffMs = currentDate - givenDate;

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

    const [following, setFollowing] = useState([]);

    const getFollowers = async () => {
      try {
        const res = await fetch(
          `https://job-junction-dpvo.onrender.com/api/follow/getAllFollowings/${loginData?.id}`,
        );

        const data = await res.json();

        if (data?.result) {
          return setFollowing(data?.result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    return {
      getFollowers,
      likedModal,
      hanldedeleteComment,
      hanldeGetComment,
      allComm,
      commText,
      setText,
      hanldeComment,
      loginData,
      hanldepostDisLike,
      hanldepostLike,
      following,
      handleGetAllPosts,
      posts,
      getDateDifference,
    };
  } catch (error) {
    console.log(error);
  }
};
