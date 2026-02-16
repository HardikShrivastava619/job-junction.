import { useRef, useState } from "react";
import { useSelector } from "react-redux";

export const ProjectFormLogic = (setProjectForm, handleGetProject) => {
  try {
    const [photoPreview, setPhotoPreview] = useState(null);
    const [photo, setPhoto] = useState([]);
    const [title, setTitle] = useState(null);
    const [description, setdescription] = useState(null);
    //     const [tech , setTech]= useState();
    const [url, setURL] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [commentsOn, setCommentsOn] = useState(false);
    const tech = useRef();

    const loginData = useSelector((s) => s.loginData);

    const handleUpload = async (e) => {
      try {
        e.preventDefault();

        const technologies = tech.current.value?.split(" ");

        const postData = new FormData();

        postData.append("description", description);
        postData.append("title", title);
        postData.append("projectUrl", url);
        postData.append("techniques_used", technologies);
        postData.append("commentsOn", commentsOn);
        postData.append("startDate", startDate);
        postData.append("endDate", endDate);

        photo.forEach((file) => {
          postData.append("photo_uploads", file);
        });

        const res = await fetch(
          `http://localhost:1800/api/project/saveProject/${loginData?.id}`,
          {
            method: "POST",
            body: postData,
          },
        );

        const data = await res.json();

        if (data?.success) {
          alert(data?.message);
          handleGetProject();
          return setProjectForm(false);
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
      url,
      setURL,
      setPhotoPreview,
      title,
      setTitle,
      tech,
      startDate,
      setStartDate,
      endDate,
      setEndDate,
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
