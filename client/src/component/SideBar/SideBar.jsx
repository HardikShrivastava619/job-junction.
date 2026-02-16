import React, { useEffect, useState } from "react";
import "./SideBar.css";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { SlLogout } from "react-icons/sl";

import { RiPokerHeartsLine } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";
import { HiDocumentSearch } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";

import { FaStarHalfAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { SlLogin } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import { loginSliceAction } from "../../store/loginSlice";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleYesSignOut = async () => {
    try {
      dispatch(loginSliceAction.logOutUser());
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      confirmAlert({
        customUI: ({ onClose }) => (
          <div className="confirm-alert-signOut-cont">
            <p style={{ fontSize: "1.2rem", marginTop: "3vh" }}>
              {" "}
              Wants to Sign-Out{" "}
            </p>

            <button
              type="submit"
              className="final-btn-Register"
              onClick={() => {
                handleYesSignOut();
                onClose();
              }}
            >
              {" "}
              Yes , Sign-Out{" "}
            </button>
            <button
              type="submit"
              className=" final-btn-Register"
              onClick={onClose}
            >
              {" "}
              Cancel{" "}
            </button>
          </div>
        ),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const loginData = useSelector((s) => s.loginData);
  const [totLikes, setTotLikes] = useState(0);

  const getAllLikes = async () => {
    try {
      const res = await fetch(
        `https://job-junction-dpvo.onrender.com/api/post/getAllLikes/${loginData?.id}`,
      );
      const res2 = await fetch(
        `https://job-junction-dpvo.onrender.com/api/project/getAllProjLikes/${loginData?.id}`,
      );

      const data = await res.json();
      const data2 = await res2.json();

      let tr = data?.rows?.concat(data2?.rows);

      let totalLikes = 0;
      tr?.forEach((obj) => {
        if (obj.likes) {
          try {
            const parsedLikes = JSON.parse(obj.likes);
            if (Array.isArray(parsedLikes)) {
              totalLikes += parsedLikes.length;
            }
          } catch (err) {
            console.error("Failed to parse likes:", err);
          }
        }
      });

      setTotLikes(totalLikes);
    } catch (error) {
      console.log(error);
    }
  };

  const [views, setViewers] = useState(0);

  const getViewers = async () => {
    try {
      const res = await fetch(
        `https://job-junction-dpvo.onrender.com/api/user/getViewers/${loginData?.id}`,
      );

      const data = await res.json();
      const parseArr = JSON.parse(data?.rows[0]?.viewers)?.length;

      setViewers(parseArr);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllLikes();
    getViewers();
  }, [loginData?.id]);

  return (
    <div
      className="offcanvas offcanvas-start show SideBar "
      tabIndex="-1"
      id="offcanvas"
      aria-labelledby="offcanvasLabel"
    >
      <div className="sideBar-link_container ">
        <Link className="sideBar-link" to={`moreDetails/${loginData?.id}`}>
          {" "}
          {loginData?.name?.split(" ")[0]}{" "}
          {loginData?.profile_photo ? (
            <img
              src={loginData?.profile_photo}
              alt=""
              className="sideBar-img"
            />
          ) : (
            <MdAccountCircle className="sideBar-icons" />
          )}{" "}
        </Link>
        <div className="sideBar-link">
          {" "}
          Likes{" "}
          <div className="likes-num-cont">
            {" "}
            <small className="likes-num">
              {" "}
              {totLikes > 1000 ? "1K+" : totLikes}{" "}
            </small>{" "}
            <RiPokerHeartsLine className="sideBar-icons" />{" "}
          </div>{" "}
        </div>
        <div className="sideBar-link">
          {" "}
          Viewers{" "}
          <div className="likes-num-cont">
            {" "}
            <small className="likes-num">
              {" "}
              {views > 1000 ? "1K+" : views}{" "}
            </small>{" "}
            <FaRegEye className="sideBar-icons" />{" "}
          </div>{" "}
        </div>
        {loginData?.role == "Enterprise" ? (
          <Link className="sideBar-link">
            {" "}
            Setting{" "}
            <div className="likes-num-cont">
              {" "}
              <IoMdSettings className="sideBar-icons" />
            </div>{" "}
          </Link>
        ) : (
          <Link className="sideBar-link" to="/applicantonPage">
            {" "}
            Applied{" "}
            <div className="likes-num-cont">
              {" "}
              <HiDocumentSearch className="sideBar-icons" />
            </div>{" "}
          </Link>
        )}

        {loginData !== null ? (
          <Link className="sideBar-link" onClick={handleSignOut}>
            {" "}
            Signout <SlLogout className="sideBar-icons" />{" "}
          </Link>
        ) : (
          <Link className="sideBar-link" to="/Login">
            {" "}
            SignIn <SlLogin className="sideBar-icons" />{" "}
          </Link>
        )}
      </div>

      <div className="offcanvas-body">
        <h6 className="terms"> Terms & Conditions </h6>
        <div className="terms-para">
          <small>
            "All hiring decisions, negotiations, and outcomes are solely at the
            discretion of participating employers and candidates. Job Junction
            acts solely as a facilitator."{" "}
          </small>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
