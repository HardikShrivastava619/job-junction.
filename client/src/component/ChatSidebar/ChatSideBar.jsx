import React, { useEffect, useState } from "react";
import "./ChatSideBar.css";
import { FaUserFriends } from "react-icons/fa";
import { PiBuildingApartmentFill } from "react-icons/pi";
import { useSelector } from "react-redux";
import { convertUTCToIST } from "../../helper.js";

const ChatSideBar = ({
  employeeUnseen,
  activeIndex,
  uniqueById,
  unSeenMsg,
  compUnseen,
  setCurrChatingUser,
  convertName,
}) => {
  const [lastMsgs, setLastMsgs] = useState({});
  const loginData = useSelector((s) => s.loginData);
  const [normalUserMSg, setNormalUserMSg] = useState(true);

  useEffect(() => {
    const fetchAllLastMsgs = async () => {
      const updated = {};
      for (const user of uniqueById) {
        const res = await fetch(
          `https://job-junction-dpvo.onrender.com/api/message/lastMsg/${loginData?.id}/${user.id}`,
        );
        const data = await res.json();

        updated[user?.id] = data?.rows;
      }
      setLastMsgs(updated);
    };

    fetchAllLastMsgs();
  }, [uniqueById]);

  return (
    <div
      className="offcanvas offcanvas-start chatsidebar show"
      tabIndex="-1"
      id="offcanvas"
      aria-labelledby="offcanvasLabel"
    >
      <div className="chatSidebarHead">
        {" "}
        <div
          className="FaUserFriendschatSideBar-cont"
          onClick={() => {
            setNormalUserMSg(true);
          }}
        >
          {" "}
          <FaUserFriends className="FaUserFriendschatSideBar" />
          {employeeUnseen?.length == 0 ? (
            <></>
          ) : (
            <small className="role-notf"> {employeeUnseen?.length} </small>
          )}
        </div>
        <div
          className="FaUserFriendschatSideBar-cont"
          onClick={() => {
            setNormalUserMSg(false);
          }}
        >
          <PiBuildingApartmentFill className="FaUserFriendschatSideBar" />

          {compUnseen?.length == 0 ? (
            <></>
          ) : (
            <small className="role-notf"> {compUnseen?.length} </small>
          )}
        </div>
      </div>

      {uniqueById
        ?.filter((c) =>
          normalUserMSg ? c?.role === "Employee" : c?.role !== "Employee",
        )
        ?.map((c, i) => (
          <div
            key={i}
            className={`chat-0sidebar-subdiv ${activeIndex === c?.id ? "active-chat-div" : ""}`}
            onClick={() => {
              setCurrChatingUser(c);
            }}
          >
            <img
              src={c?.profile_photo}
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top chatsidebar-img"
            />

            <div className="namedivchatsidebar">
              <h6 className="nameChatSidebar"> {convertName(c?.name)} </h6>

              {unSeenMsg?.some((o) => o?.sender_id === c?.id) ? (
                <small className="unRreadmsgSidebar">
                  {" "}
                  {unSeenMsg
                    ?.filter((o) => o?.sender_id === c?.id)
                    .at(-1)
                    ?.text?.substring(0, 30)}{" "}
                </small>
              ) : (
                <small className="lastmsgSidebar">
                  {" "}
                  {lastMsgs[c?.id]?.text}{" "}
                </small>
              )}
            </div>

            <div className="timeChatSidebar  ">
              <h6 style={{ fontSize: ".8rem" }}>
                {" "}
                {unSeenMsg?.some((o) => o?.sender_id == c?.id)
                  ? convertUTCToIST(
                      unSeenMsg?.filter((o) => o?.sender_id == c?.id)[
                        unSeenMsg?.filter((o) => o?.sender_id == c?.id)
                          ?.length - 1
                      ]?.created_at,
                    )?.split(", ")[0] ===
                    convertUTCToIST(new Date())?.split(", ")[0]
                    ? convertUTCToIST(
                        unSeenMsg?.filter((o) => o?.sender_id == c?.id)[
                          unSeenMsg?.filter((o) => o?.sender_id == c?.id)
                            ?.length - 1
                        ]?.created_at,
                      ).split(", ")[1]
                    : convertUTCToIST(
                        unSeenMsg?.filter((o) => o?.sender_id == c?.id)[
                          unSeenMsg?.filter((o) => o?.sender_id == c?.id)
                            .length - 1
                        ]?.created_at,
                      )?.split(", ")[0]
                  : convertUTCToIST(lastMsgs[c?.id]?.created_at)?.split(
                        ", ",
                      )[0] === "Today"
                    ? convertUTCToIST(lastMsgs[c?.id]?.created_at)?.split(
                        ", ",
                      )[1]
                    : convertUTCToIST(lastMsgs[c?.id]?.created_at)?.split(
                        ", ",
                      )[0]}{" "}
              </h6>

              {unSeenMsg?.some((o) => o?.sender_id == c?.id) == true ? (
                <small
                  style={{
                    backgroundColor: "#7037e2",
                    borderRadius: "50%",
                    width: "35%",
                    height: "25%",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  {unSeenMsg?.filter((o) => o?.sender_id == c?.id).length}
                </small>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChatSideBar;
