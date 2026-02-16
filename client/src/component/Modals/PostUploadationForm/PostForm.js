import { useState } from "react";
import { useSelector } from "react-redux";

export const PostFormLogic = (setPostForm, handleGetPosts) => {
  try {
    const [description, setdescription] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    const [photo, setPhoto] = useState([]);
    const [commentsOn, setCommentsOn] = useState(false);
    const loginData = useSelector((s) => s.loginData);

    const handleUpload = async (e) => {
      try {
        e.preventDefault();

        const postData = new FormData();

        postData.append("description", description);
        postData.append("commentsOn", commentsOn);

        photo.forEach((file) => {
          postData.append("photo_uploads", file);
        });

        const res = await fetch(
          `https://job-junction-dpvo.onrender.com/api/post/savePost/${loginData?.id}`,
          {
            method: "POST",
            body: postData,
          },
        );

        const data = await res.json();

        if (data?.success) {
          alert(data?.message);
          handleGetPosts();
          return setPostForm(false);
        }
        return alert(data?.message);
      } catch (error) {
        console.log(error);
      }
    };

    const handleRemovePic = async (i) => {
      try {
        setPhoto((prev) => prev.filter((_, index) => index !== i));
      } catch (error) {
        console.log(error);
      }
    };

    return {
      handleRemovePic,
      handleUpload,
      setdescription,
      photoPreview,
      setPhotoPreview,
      description,
      photo,
      setPhoto,
      commentsOn,
      setCommentsOn,
    };
  } catch (error) {
    console.log(error);
  }
};
