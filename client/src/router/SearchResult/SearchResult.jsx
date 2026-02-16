import React from "react";
import "./SearchResult.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { FaUserTie } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IoPeopleSharp } from "react-icons/io5";
import { LuSend } from "react-icons/lu";
import { MdOutlineMyLocation } from "react-icons/md";
import { MdOutlineMenuBook } from "react-icons/md";
import { GiBookmarklet } from "react-icons/gi";
import { msgSliceAction } from "../../store/msgToUser";

const SearchResult = () => {
  const res = useSelector((s) => s.searchData);

  const loginData = useSelector((s) => s.loginData);

  const navigate = useNavigate();

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

  const dispatch = useDispatch();

  const handleCreateChat = async (rid) => {
    try {
      const res = await fetch(
        `http://localhost:1800/api/message/createChat/${loginData?.id}/${rid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await res.json();
      console.log(data);

      if (data?.code === "chat already created") {
        dispatch(msgSliceAction?.msgToUser(data?.resultSecond[0]));
        navigate("/chat");
      }

      if (data?.success) {
        dispatch(msgSliceAction?.msgToUser(data?.user));
        navigate("/chat");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="mess-main">
      {res?.length === 0 ? (
        <div className="nothingFound-cont">
          {" "}
          <img
            src="../../../public/images/nothingFound.jpg"
            alt=""
            className="nothingfound-img"
          />
          <p> Nothing Found </p>
        </div>
      ) : (
        res?.map((m, i) => (
          <Link key={i} className="card-msg">
            <div className="msg-user-pic-cont">
              <img
                src={m?.profile_photo
                  ?.split("..\\client\\")
                  ?.join("..\\..\\..\\")}
                className="msg-user-pic"
                alt=""
              />
            </div>

            <div className="nameRole-cont">
              <div className="name-titleCont">
                {" "}
                <h5 className="footer-body-para">{convertName(m?.name)} </h5>
                <footer className=" applicantName blockquote-footer text-secondary">
                  {" "}
                  {m?.title ? m?.title : m?.post}
                </footer>
              </div>

              <div className="rolecont">
                <small className="followInfo">
                  {" "}
                  <IoPeopleSharp className="text-primary mx-2" /> {"456K"}{" "}
                  followers{" "}
                </small>
                <small className="roleInfo">
                  {" "}
                  <FaUserTie className="text-primary" /> {m?.role}{" "}
                </small>
                <small className="roleInfo">
                  {" "}
                  <MdOutlineMyLocation className="text-primary" />{" "}
                  {m?.city}{" "}
                </small>
              </div>

              <div className="someBtnscont">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => {
                    handleCreateChat(m?.id);
                  }}
                >
                  {" "}
                  <LuSend /> Message{" "}
                </button>
                <button
                  onClick={() => {
                    navigate(`/OtherUserPosts/${m?.id}`);
                  }}
                  className=" btn btn-outline-success  "
                >
                  <GiBookmarklet /> View Full Profile
                </button>
              </div>
            </div>
          </Link>
        ))
      )}
    </main>
  );
};

export default SearchResult;

/*
 */
