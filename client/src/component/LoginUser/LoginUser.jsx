import React from "react";
import "./LoginUser.css";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { BiSolidMessageRoundedEdit } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";
import { IoFolderOpenSharp } from "react-icons/io5";
import { GiGraduateCap } from "react-icons/gi";
import { BsFileEarmarkPost } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaHandshake } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const LoginUser = () => {
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".loginUser-main", {
      x: 100,
      opacity: 0,
      delay: 0.5,
      duration: 0.8,
    });

    tl.from(".loginUser-ul", {
      x: 100,
      opacity: 0,
    });

    tl.from("img,.login-user-name", {
      opacity: 0,
    });

    tl.from(".login-user-link-sm-box", {
      opacity: 0,
      stagger: 0.8,
    });
  });

  const [followers, setUserFollwers] = useState([]);

  const getFollowers = async () => {
    try {
      const res = await fetch(
        `https://job-junction-dpvo.onrender.com/api/follow/getAllFollowers/${loginData?.id}`,
      );
      const data = await res.json();

      if (data?.result) {
        return setUserFollwers(data?.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [followings, setFollwings] = useState([]);

  const getFollowings = async () => {
    try {
      const res = await fetch(
        `https://job-junction-dpvo.onrender.com/api/follow/getAllFollowings/${loginData?.id}`,
      );
      const data = await res.json();

      if (data?.result) {
        return setFollwings(data?.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFollowers();
    getFollowings();
  }, []);

  const loginData = useSelector((s) => s.loginData);

  const convertName = (name) => {
    try {
      return name
        ?.split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(" ");
    } catch (error) {
      console.log(error);
      return name;
    }
  };

  return (
    <main className="loginUser-main">
      <div className="user-pic-main-container">
        <div className="user-pic-container">
          {" "}
          {loginData?.profile_photo ? (
            <img
              src={loginData?.profile_photo}
              alt="err"
              className="userprofilepic-login_user"
            />
          ) : (
            <MdAccountCircle className="MdAccountCircle-login_user" />
          )}{" "}
        </div>
        <h5 className="login-user-name"> {convertName(loginData?.name)} </h5>
      </div>
      <div className=" loginUser-ul">
        <Link className="login_user-link" to={`/MoreDetails/${loginData?.id}`}>
          {" "}
          <div className="login-user-link-sm-box">
            {" "}
            <IoFolderOpenSharp className="loginuser-link-icons" /> My
            Profile{" "}
          </div>
        </Link>
        <Link className="login_user-link" to="/chat">
          {" "}
          <div className="login-user-link-sm-box">
            {" "}
            <BiSolidMessageRoundedEdit className="loginuser-link-icons" />{" "}
            Messages{" "}
          </div>
        </Link>
        {loginData?.role == "Enterprise" ? (
          <Link className="login_user-link" to={`/jobForm`}>
            {" "}
            <div className="login-user-link-sm-box">
              {" "}
              <FaHandshake className="loginuser-link-icons" />
              Recruit Now
            </div>
          </Link>
        ) : (
          <Link className="login_user-link" to={`/Projects/${loginData?.id}`}>
            {" "}
            <div className="login-user-link-sm-box">
              {" "}
              <GiGraduateCap className="loginuser-link-icons" /> My
              Projects{" "}
            </div>
          </Link>
        )}
        <Link className="login_user-link" to={`/MyPost/${loginData?.id}`}>
          {" "}
          <div className="login-user-link-sm-box">
            {" "}
            <BsFileEarmarkPost className="loginuser-link-icons" /> My
            Uploads{" "}
          </div>
        </Link>
        <div className="login_user-link">
          {" "}
          <div className="login-user-link-sm-box">
            {" "}
            <p className="loginuser-link-numbers"> {followers.length} </p>{" "}
            Followers{" "}
          </div>
        </div>
        <Link className="login_user-link">
          {" "}
          <div className="login-user-link-sm-box">
            <p className="loginuser-link-numbers"> {followings?.length} </p>{" "}
            Following{" "}
          </div>
        </Link>
      </div>
    </main>
  );
};

export default LoginUser;
