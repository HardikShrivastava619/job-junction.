import React, { useEffect, useState } from "react";
import "./LikersModel.css";
import { useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { SlLike } from "react-icons/sl";
import { handleCreateNotification } from "../../../helper.js";

const LikersModel = ({
  setLikersModal,
  likedModal,
  likers,
  recvid,
  cuurPost,
  hanldepostLike,
  hanldepostDisLike,
}) => {
  const logindata = useSelector((s) => s.loginData);
  const [followings, setFollwings] = useState([]);

  const getFollowings = async () => {
    try {
      const res = await fetch(
        `https://job-junction-dpvo.onrender.com/api/follow/getAllFollowings/${logindata?.id}`,
      );
      const data = await res.json();

      if (data?.result) {
        return setFollwings(data?.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const followers_id = logindata?.id;

  const handleFollowBtn = async (followed_id) => {
    try {
      const res = await fetch(
        `https://job-junction-dpvo.onrender.com/api/follow/follow`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ followers_id, followed_id }),
        },
      );
      const data = await res.json();

      if (data?.success) {
        await getFollowings();

        const notf = await handleCreateNotification({
          sid: logindata?.id,
          rid: followed_id,
          eid: null,
          type: "follow",
          action: data?.code,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFollowings();
  }, []);

  const mySelf = likers?.findIndex((o) => o?.user?.id == logindata?.id);

  return (
    <main className="liker_modal">
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: ".5vh",
        }}
      >
        <RxCross1
          onClick={() => {
            setLikersModal(false);
          }}
        />{" "}
      </div>

      <div className="liker_modalBox1">
        {likers?.some((o) => o?.user?.id == logindata?.id) ? (
          <div className="liker_modalBox2">
            <img
              src={likers[mySelf]?.user?.profile_photo}
              className="likerModalProfipics"
              alt=""
            />

            <span className="">{likers[mySelf]?.user?.name} </span>

            <div className="like-likdiv">
              {" "}
              {likedModal ? (
                <BiSolidLike
                  onClick={() => {
                    hanldepostLike({
                      pid: cuurPost,
                      id: logindata?.id,
                      rid: recvid,
                    });
                  }}
                />
              ) : (
                <BiLike
                  className="text-black"
                  onClick={() => {
                    hanldepostLike({
                      pid: cuurPost,
                      id: logindata?.id,
                      rid: recvid,
                    });
                  }}
                />
              )}{" "}
            </div>
          </div>
        ) : (
          <></>
        )}

        {[...likers]?.reverse()?.map((o) =>
          o?.user?.id == logindata?.id ? (
            <></>
          ) : (
            <div className="liker_modalBox2">
              <img
                src={o?.user?.profile_photo}
                className="likerModalProfipics"
                alt=""
              />

              <span className="">{o?.user?.name} </span>

              {followings?.some((f) => f?.followed_id == o?.user?.id) ? (
                <button
                  className="likenfollbtn btn btn-outline-danger"
                  onClick={() => {
                    handleFollowBtn(o?.user?.id);
                  }}
                >
                  {" "}
                  UnFollow{" "}
                </button>
              ) : (
                <button
                  className="btn btn-outline-primary likeprimbtn"
                  onClick={() => {
                    handleFollowBtn(o?.user?.id);
                  }}
                >
                  {" "}
                  Follow{" "}
                </button>
              )}
            </div>
          ),
        )}
      </div>
    </main>
  );
};

export default LikersModel;
