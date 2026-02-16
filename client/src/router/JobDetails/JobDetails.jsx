import React, { useEffect, useState } from "react";
import "./JobDetails.css";
import { MdAttachEmail, MdOutlineTravelExplore } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { GiDuration } from "react-icons/gi";
import { IoLocationSharp } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { convertUTCToIST, getPreciseDateOldness } from "../../helper";
import { useDispatch, useSelector } from "react-redux";
import { msgSliceAction } from "../../store/msgToUser";
import { RxCross1 } from "react-icons/rx";

const JobDetails = () => {
  const [appliedBtn, setAppliedBtn] = useState(false);
  const loginData = useSelector((s) => s.loginData);

  const [det, setDet] = useState(false);
  const [stop, setStop] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const [rejApp, setRejApp] = useState([]);
  const [intrestApp, setIntrestApp] = useState([]);
  const [selectedApp, setSelectedApp] = useState([]);

  const navigate = useNavigate();
  const params = useParams();

  const handleGetJobDetails = async () => {
    try {
      const response = await fetch(
        `https://job-junction-dpvo.onrender.com/api/job/getJobDetail/${params?.jid}`,
      );

      const data = await response.json();

      setDet(data?.result[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTempStop = async () => {
    try {
      const response = await fetch(
        `https://job-junction-dpvo.onrender.com/api/job/setTempStopHiring/${params?.jid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();
      console.log(data);

      if (data?.success) {
        return setStop(!stop);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleApply = async () => {
    try {
      const response = await fetch(
        `https://job-junction-dpvo.onrender.com/api/job/applyJob`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ uid: loginData?.id, jid: params?.jid }),
        },
      );

      const data = await response.json(0);

      if (data?.success) {
        setAppliedBtn(true);
        return alert("Application Snet Succesfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetMYapplications = async () => {
    try {
      const response = await fetch(
        `https://job-junction-dpvo.onrender.com/api/job/getApplicationDetails/${loginData?.id}/${params?.jid}`,
      );

      const data = await response.json();

      if (data?.rows?.some((o) => o?.JobID == params?.jid)) {
        setAppliedBtn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://job-junction-dpvo.onrender.com/api/job/deleteJob/${params?.jid}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (data?.success) {
        alert("Your Vacancy is Deleted From all Public Portals now");
        return navigate("/EnterpriseJobs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllApplicants = async () => {
    try {
      const response = await fetch(
        `https://job-junction-dpvo.onrender.com/api/job/getAllApplicants/${params?.jid}`,
      );

      const data = await response.json();

      setApplicants(data?.rows);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetJobDetails();
    handleGetMYapplications();

    if (loginData?.role == "Enterprise") {
      getAllApplicants();
    }
  }, [loginData]);

  const dontApply = async () => {
    try {
      const response = await fetch(
        `https://job-junction-dpvo.onrender.com/api/job/dontApply/${loginData?.id}/${params?.jid}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (data?.success) {
        setAppliedBtn(false);
        return alert("Your name has been removed from the applicant list.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch = useDispatch();

  const handleCreateChat = async (rid) => {
    try {
      const res = await fetch(
        `https://job-junction-dpvo.onrender.com/api/message/createChat/${loginData?.id}/${rid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await res.json();

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

  const handleStatus = async ({ status, aid, name }) => {
    try {
      const response = await fetch(
        `https://job-junction-dpvo.onrender.com/api/job/updateApplicationStatus`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ aid, status }),
        },
      );

      const data = await response.json();

      if (data?.success && status == "rejected") {
        setRejApp((prev) => [...prev, aid]);
        const newArr = selectedApp?.filter((i) => i != aid);
        setSelectedApp(newArr);
        const newArr1 = intrestApp?.filter((i) => i != aid);
        setIntrestApp(newArr1);
      }

      if (data?.success && status == "applied") {
        const newArr = rejApp?.filter((i) => i != aid);
        setRejApp(newArr);
      }

      if (data?.success && status == "underConsideration") {
        setIntrestApp((prev) => [...prev, aid]);
        const newArr = rejApp?.filter((i) => i != aid);
        setRejApp(newArr);
        const newArr1 = selectedApp?.filter((i) => i != aid);
        setSelectedApp(newArr1);
      }

      if (data?.success && status == "shortListed") {
        setSelectedApp((prev) => [...prev, aid]);
        const newArr = rejApp?.filter((i) => i != aid);
        setRejApp(newArr);
        const newArr1 = intrestApp?.filter((i) => i != aid);
        setIntrestApp(newArr1);
      }

      if (data?.success) {
        return alert(` Status of ${status} is shared with ${name}  `);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(applicants);

  return (
    <main className="jobDdetailsMain">
      {loginData?.role == "Enterprise" ? (
        <div className="temper-stop-btn-cont">
          <button
            className={
              stop
                ? "tempr-btn btn btn-success"
                : "btn btn-outline-secondary tempr-btn "
            }
            onClick={handleTempStop}
          >
            {stop ? "Begin hiring again" : "Temperory Stop Hiring"}
          </button>{" "}
        </div>
      ) : (
        <></>
      )}

      <div class="card card-jobdetails">
        <div class="card-header jobDet-header-div">
          <h5 class="jobDet-header"> {det?.institute_Name} </h5>
          <small>
            {" "}
            {getPreciseDateOldness(det?.created_at) == "0 days old"
              ? convertUTCToIST(det?.created_at)
              : getPreciseDateOldness(det?.created_at)}{" "}
          </small>
        </div>
        <div className="jobdet-subdiv">
          <div className="jobdet-box1">
            <div class="card-body">
              <h5 class="card-title"> {det?.title} </h5>
              <div className="remote0duv">
                {" "}
                <p>
                  {" "}
                  <MdOutlineTravelExplore className="MdOutlineTravelExplore" />{" "}
                  {det?.remote == "yes" ? "Remote" : "On-Site"}{" "}
                </p>
                <p>
                  {" "}
                  <FaRupeeSign className="MdOutlineTravelExplore" />{" "}
                  {det?.annual_Salary}{" "}
                </p>
                <p>
                  {" "}
                  <GiDuration className="MdOutlineTravelExplore" />{" "}
                  {det?.jobtype}{" "}
                </p>{" "}
              </div>
              <div className="desc">
                {" "}
                <small class=" card-text">
                  {det?.description?.trim()?.length == 0 ||
                  det?.description == null
                    ? "Not Provided"
                    : det?.description}
                </small>{" "}
              </div>

              <div className="skillcont">
                <h5> Skills : </h5>
                {Array.isArray(det?.reqskills)
                  ? det?.reqskills?.map((d, i) => (
                      <p className="skilss" key={i}>
                        {" "}
                        {d}{" "}
                      </p>
                    ))
                  : JSON.parse(det?.reqskills || "[]").map((d, i) => (
                      <p className="skilss" key={i}>
                        {d}{" "}
                      </p>
                    ))}
              </div>

              <div className="skillcont">
                <h5> Qualifications : </h5>
                {Array.isArray(det?.reqDegree)
                  ? det?.reqDegree?.map((d, i) => (
                      <p className="skilss" key={i}>
                        {" "}
                        {d}{" "}
                      </p>
                    ))
                  : JSON.parse(det?.reqDegree || "[]").map((d, i) => (
                      <p className="skilss" key={i}>
                        {d}{" "}
                      </p>
                    ))}
              </div>

              <div className="locationdiv">
                {" "}
                <IoLocationSharp />{" "}
                <p className="jobdetLocation">
                  {det?.location?.charAt(0).toUpperCase() +
                    det?.location?.slice(1)}{" "}
                </p>{" "}
              </div>
            </div>
          </div>
          <div className="jobdet-box2">
            <img
              src={det?.institute_Logo}
              className="jobdet-comaonycover"
              alt=""
            />

            {loginData?.role == "Enterprise" ? (
              <button
                className="btn btn-outline-danger permanent-delete-btn"
                onClick={handleDelete}
              >
                {" "}
                Close window{" "}
              </button>
            ) : appliedBtn ? (
              <button
                onClick={dontApply}
                className="btn btn-outline-secondary jobdetapplynow "
              >
                {" "}
                Delete Application{" "}
              </button>
            ) : (
              <button
                className="btn btn-primary jobdetapplynow "
                onClick={handleApply}
              >
                {" "}
                Apply now{" "}
              </button>
            )}
          </div>
        </div>
      </div>

      {loginData?.role == "Enterprise" ? (
        <div className="applicant-cont">
          <div class="card applicant-sundiv">
            <h4 class="card-header Applicantheadd">Applicants</h4>

            {applicants?.length == 0 ? (
              <img
                src="../../../public/images/noAppTIllNow.png"
                style={{ height: "30vh", width: "20vw" }}
                alt=""
              />
            ) : (
              applicants?.map((a, i) => (
                <>
                  <div
                    key={i}
                    class={
                      rejApp?.includes(a?.appication_id) ||
                      a?.application_status == "rejected"
                        ? "card-body  card applicant-subdiv2-rejected"
                        : selectedApp?.includes(a?.appication_id) ||
                            a?.application_status == "shortListed"
                          ? "card-body  card applicant-subdiv2-select"
                          : intrestApp?.includes(a?.appication_id) ||
                              a?.application_status == "underConsideration"
                            ? "card-body  card applicant-subdiv2-intrested "
                            : "card-body  card applicant-subdiv2"
                    }
                  >
                    <div className="userappcont">
                      <img
                        src={a?.profile_photo}
                        className="userapplicantimg"
                        alt=""
                      />
                      <div className="applicant-namecont">
                        {" "}
                        <h5 className="footer-body-para">
                          {" "}
                          {a?.name?.toUpperCase()}{" "}
                        </h5>
                        <footer className=" applicantName blockquote-footer text-secondary">
                          {" "}
                          {a?.Title ? a?.Title : a?.post}{" "}
                        </footer>
                      </div>
                      <div
                        style={{
                          width: "23%",
                          gap: "2vw",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Link
                          to={`/MoreDetails/${a?.applierID}`}
                          class="btn btn-outline-primary  chekapplicantprofilebtn"
                        >
                          Check Profile
                        </Link>
                        <MdAttachEmail
                          className="MdAttachEmail"
                          onClick={() => {
                            handleCreateChat(a?.applierID);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="compn-rescont">
                    <div
                      className="trap1"
                      onClick={() => {
                        handleStatus({
                          status: "shortListed",
                          aid: a?.appication_id,
                          name: a?.name,
                        });
                      }}
                    >
                      {" "}
                      <p className="trap-p">
                        {" "}
                        <RxCross1 className="type-p-rx"></RxCross1> ShortList
                        This Application{" "}
                      </p>{" "}
                    </div>
                    <div
                      className="trap2"
                      onClick={() => {
                        handleStatus({
                          status: "underConsideration",
                          aid: a?.appication_id,
                          name: a?.name,
                        });
                      }}
                    >
                      <p className="trap-p">
                        {" "}
                        <RxCross1 className="type-p-rx"></RxCross1> Intrest in
                        Application{" "}
                      </p>{" "}
                    </div>
                    {rejApp != a?.appication_id ? (
                      <div
                        className="trap3"
                        onClick={() => {
                          handleStatus({
                            status: "rejected",
                            aid: a?.appication_id,
                            name: a?.name,
                          });
                        }}
                      >
                        {" "}
                        <p className="trap-p">
                          {" "}
                          <RxCross1 className="type-p-rx"></RxCross1> Reject
                          This Application{" "}
                        </p>{" "}
                      </div>
                    ) : (
                      <div
                        className="trap3"
                        onClick={() => {
                          handleStatus({
                            status: "applied",
                            aid: a?.appication_id,
                            name: a?.name,
                          });
                        }}
                      >
                        {" "}
                        <p className="trap-p">
                          {" "}
                          <RxCross1 className="type-p-rx"></RxCross1> Keep This
                          Application{" "}
                        </p>{" "}
                      </div>
                    )}
                  </div>{" "}
                </>
              ))
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </main>
  );
};

export default JobDetails;
