import React, { useEffect } from "react";
import "./Home.css";
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import { FaRegCommentDots } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { MdAccountCircle } from "react-icons/md";
import { HomeLogic } from "./Home";
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { convertUTCToIST } from "../../helper";
import LikersModel from "../../component/Modals/LikersModel/LikersModel.jsx";

const Home = () => {
  const {
    handleGetAllPosts,
    likedModal,
    hanldedeleteComment,
    commText,
    setText,
    allComm,
    hanldeGetComment,
    getFollowers,
    posts,
    following,
    getDateDifference,
    loginData,
    hanldepostDisLike,
    hanldepostLike,
    hanldeComment,
  } = HomeLogic();

  const filteredPosts = posts?.filter(
    (post) =>
      following?.some((follower) => follower?.followed_id === post?.user_id) ||
      loginData?.id === post?.user_id,
  );

  const [likers, setLikers] = useState([]);
  const [likersModal, setLikersModal] = useState(false);
  const [cuurPost, setCurrPost] = useState(null);
  const [recvid, setRecvid] = useState(null);

  const handleLikers = async (i) => {
    if (
      !filteredPosts ||
      ![...filteredPosts].reverse()[i] ||
      ![...filteredPosts].reverse()[i].likes
    )
      return;

    try {
      const likerIds = JSON.parse([...filteredPosts].reverse()[i].likes);

      const responses = await Promise.all(
        likerIds.map(async (m) => {
          const res = await fetch(
            `https://job-junction-dpvo.onrender.com/api/user/get_ourProfile/${m}`,
          );
          return await res.json();
        }),
      );

      setLikers(responses);
    } catch (error) {
      console.log("Error fetching likers:", error);
    }
  };

  useEffect(() => {
    handleGetAllPosts();
    getFollowers();
  }, []);

  useEffect(() => {
    handleLikers();
  }, [posts]);

  return (
    <main className="home-main">
      {!likersModal ? (
        <></>
      ) : (
        <LikersModel
          likedModal={likedModal}
          cuurPost={cuurPost}
          recvid={recvid}
          hanldepostDisLike={hanldepostDisLike}
          hanldepostLike={hanldepostLike}
          setLikersModal={setLikersModal}
          likers={likers}
        ></LikersModel>
      )}
      {filteredPosts?.length == 0 ? (
        <div
          style={{
            backgroundColor: "white",
            width: "71.2vw",
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="public\images\makeFriends.png"
            style={{ height: "50%" }}
            alt=""
          />
        </div>
      ) : (
        [...filteredPosts]?.reverse()?.map((p, i) => (
          <div key={i} className="home-cont card">
            <div
              id={`carouselExampleIndicators${i}`}
              class="carousel-home  carousel slide"
            >
              <div class="carousel-indicators">
                {JSON.parse(p?.photo_uploads || "[]").map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    data-bs-target={`#carouselExampleIndicators${i}`}
                    data-bs-slide-to={index}
                    className={index === 0 ? "active" : ""}
                    aria-current={index === 0 ? "true" : undefined}
                    aria-label={`Slide ${index + 1}`}
                  ></button>
                ))}
              </div>

              <div style={{ height: "105%" }} class="carousel-inner">
                {JSON.parse(p?.photo_uploads || "[]").map((imgPath, index) => (
                  <div
                    key={index}
                    class={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <img
                      style={{ height: "50vh" }}
                      src={imgPath.replace("../client/public", "")}
                      class="d-block w-100  crousel-img-home"
                      alt={`Slide ${index + 1}`}
                    />
                  </div>
                ))}
              </div>

              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target={`#carouselExampleIndicators${i}`}
                data-bs-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>

              <button
                class="carousel-control-next"
                type="button"
                data-bs-target={`#carouselExampleIndicators${i}`}
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>

            <Link
              className="post-user-info"
              to={`/OtherUserPosts/${p?.user_id}`}
            >
              {" "}
              {p?.profile_photo === null ? (
                <MdAccountCircle className="post-user-info-MdAccountCircle" />
              ) : (
                <img
                  className="post-user-home-img"
                  src={p?.profile_photo
                    ?.split("..\\client\\")
                    ?.join("..\\..\\..\\")}
                  alt=""
                />
              )}{" "}
              <small> {p?.name} </small>{" "}
            </Link>
            <div className="post-info">
              <div className="home-div-first ">
                <div className=" home-likedislikecont ">
                  <div className="likeCont ">
                    {" "}
                    {JSON.parse(p?.likes)?.includes(
                      loginData?.id?.toString(),
                    ) === false || p?.likes === null ? (
                      <SlLike
                        style={{ cursor: "pointer", marginBottom: "1vh" }}
                        onClick={() => {
                          hanldepostLike({
                            pid: p.id,
                            id: loginData?.id,
                            rid: p?.user_id,
                          });
                        }}
                      />
                    ) : (
                      <BiSolidLike
                        className="text-success"
                        style={{ cursor: "pointer", marginBottom: "1vh" }}
                        onClick={() => {
                          hanldepostLike({
                            pid: p.id,
                            id: loginData?.id,
                            rid: p?.user_id,
                          });
                        }}
                      />
                    )}
                    {p?.likes === null ? 0 : JSON.parse(p?.likes)?.length}{" "}
                  </div>

                  <div>
                    {JSON.parse(p?.disLikes)?.includes(
                      loginData?.id?.toString(),
                    ) === false || p?.disLikes === null ? (
                      <SlDislike
                        className="mx-1"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          hanldepostDisLike({
                            pid: p.id,
                            id: loginData?.id,
                            rid: p?.user_id,
                          });
                        }}
                      />
                    ) : (
                      <BiSolidDislike
                        className="text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          hanldepostDisLike({
                            pid: p.id,
                            id: loginData?.id,
                            rid: p?.user_id,
                          });
                        }}
                      ></BiSolidDislike>
                    )}{" "}
                  </div>

                  <div
                    class="dropright"
                    onClick={() => {
                      hanldeGetComment(p?.id);
                    }}
                  >
                    <div data-bs-toggle="dropdown" aria-expanded="false">
                      <FaRegCommentDots />{" "}
                      <small>{p?.commentCount} </small>{" "}
                    </div>
                    <ul
                      class="dropdown-menu commnetUl"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <li>
                        <div class="dropdown-item bg-light comment-search-div">
                          <img
                            src={loginData?.profile_photo
                              ?.split("..\\client\\")
                              ?.join("..\\..\\..\\")}
                            alt=""
                            className="comm-self-img"
                          />

                          <input
                            type="text"
                            value={commText}
                            className="coment-input"
                            onChange={(e) => {
                              setText(e?.target?.value);
                            }}
                          />
                          <button
                            className="btn btn-warning comment-btn"
                            onClick={() => {
                              commText?.trim()?.length > 0 &&
                                hanldeComment({
                                  pid: p?.id,
                                  text: commText,
                                  uid: p?.user_id,
                                });
                              setText("");
                            }}
                          >
                            {" "}
                            Comment{" "}
                          </button>
                        </div>{" "}
                      </li>
                      <div className="comm-div">
                        {[...allComm]?.reverse()?.map((c, i) => (
                          <div key={i} className="other-comm-box  ">
                            <div className="comm-fisrtBox">
                              <img
                                src={c?.profile_photo
                                  ?.split("..\\client\\")
                                  ?.join("..\\..\\..\\")}
                                alt=""
                                className="comm-img"
                              />

                              <small className="comm-name "> {c?.name} </small>
                              <div class="dropup comm-thrredot ">
                                <div
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <PiDotsThreeVerticalBold />
                                </div>
                                <ul class="dropdown-menu  ">
                                  <li
                                    onClick={() => {
                                      hanldedeleteComment({
                                        cid: c?.comment_id,
                                        pid: p?.id,
                                      });
                                    }}
                                  >
                                    {p?.user_id == loginData?.id ||
                                    c?.sender_id == loginData?.id ? (
                                      <a
                                        class="dropdown-item-comm dropdown-item "
                                        href="#"
                                      >
                                        <RiDeleteBin6Line /> Delete{" "}
                                      </a>
                                    ) : (
                                      <a
                                        class="dropdown-item-comm dropdown-item "
                                        href="#"
                                      >
                                        <RiDeleteBin6Line /> Report{" "}
                                      </a>
                                    )}
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="comm-secBox">
                              <small className="comm-text">{c?.text}</small>

                              <div className="commtimeCont ">
                                <small style={{ fontSize: "x-small" }}>
                                  {" "}
                                  {convertUTCToIST(c?.created_at)}{" "}
                                </small>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ul>
                  </div>
                </div>

                <div class="dropdown ">
                  <div
                    className="home-PiDotsThreeVerticalBold"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <PiDotsThreeVerticalBold />
                  </div>
                  <ul class="dropdown-menu home-dropdown ">
                    <li>
                      <a class="dropdown-item-home dropdown-item " href="#">
                        <RiDeleteBin6Line /> Delete Post{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <small
                className="liker-name "
                onClick={() => {
                  handleLikers(i);
                  setLikersModal(true);
                  setCurrPost(p?.id);
                  setRecvid(p?.user_id);
                }}
              >
                {" "}
                show Likes..{" "}
              </small>

              <small className="home-post-descrip"> {p?.description}.. </small>
              <small className="home-post-timin text-secondary ">
                {" "}
                {getDateDifference(p?.created_at)?.days >= 1
                  ? `${getDateDifference(p?.created_at)?.days} days ago `
                  : getDateDifference(p?.created_at)?.hours >= 1
                    ? `${getDateDifference(p?.created_at)?.hours} hours ago `
                    : getDateDifference(p?.created_at)?.minutes >= 1
                      ? `${getDateDifference(p?.created_at)?.minutes} minutes ago `
                      : `${getDateDifference(p?.created_at)?.seconds} sec ago `}{" "}
              </small>
            </div>
          </div>
        ))
      )}{" "}
    </main>
  );
};

export default Home;

/*<div class="dropdown-item bg-white comment-div" >  
      <small className=' coments-text' > sdfffffffffffsddf Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui, aperiam. Consequuntur quasi sit maxime tempore, nam facere molestias culpa minima! Ab necessitatibus nostrum eos ut perferendis doloremque nam, asperiores nobis.adipisicing elit. Dolorum,  </small>
  
   
  
  
        </div>*/
