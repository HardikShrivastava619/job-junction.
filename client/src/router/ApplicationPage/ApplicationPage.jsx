import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ApplicationPage.css";
import { useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";

const ApplicationPage = () => {
  const loginData = useSelector((s) => s.loginData);

  const [applicants, setApplicants] = useState([]);

  const handleGetMYapplications = async () => {
    try {
      const response = await fetch(
        `https://job-junction-dpvo.onrender.com/api/job/getMyApplications/${loginData?.id}`,
      );
      const data = await response.json();

      setApplicants(data?.rows);
    } catch (error) {
      console.log(error);
    }
  };

  const dontApply = async (aid) => {
    try {
      const response = await fetch(
        `https://job-junction-dpvo.onrender.com/api/job/cancelApplication/${aid}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (data?.success) {
        const newArr = applicants?.filter((o) => o?.appication_id != aid);
        setApplicants(newArr);
        return alert("Your application has been removed from the  list.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetMYapplications();
  }, []);

  return (
    <main className="appPageeMain">
      {applicants?.length == 0 ? (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{ height: "100%", width: "100%" }}
            src="../../../public/images/noApplication.png"
            alt=""
          />{" "}
        </div>
      ) : (
        applicants?.map((a, i) => (
          <>
            <div key={i} class="card-body  card applicantPage-subdiv">
              <div className="app-page-secsubdiv">
                <div className="applic_sec_maincont">
                  <div className="jobappliappcont ">
                    <img
                      src={a?.institute_Logo}
                      className="userapplicantimg"
                      alt=""
                    />
                    <div className="applicant-namecont">
                      {" "}
                      <h5 className="footer-body-para">
                        {" "}
                        {a?.title?.toUpperCase()}{" "}
                      </h5>
                      <footer className=" applicantName blockquote-footer text-secondary">
                        {" "}
                        {a?.institute_Name}{" "}
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
                        to={`/JobDetail/${a?.JobID}`}
                        class="btn btn-outline-primary  chekapplicantPageprofilebtn"
                      >
                        {" "}
                        More Details{" "}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`applicstatus-div  ${
                  a?.application_status == "shortListed"
                    ? "applicstatus-shortlisted"
                    : a?.application_status == "underConsideration"
                      ? "applicstatus-intrseted"
                      : a?.application_status == "rejected"
                        ? "applicstatus-rejected"
                        : ""
                } `}
              >
                <small>
                  {" "}
                  {a?.application_status == "shortListed"
                    ? "✅"
                    : a?.application_status == "rejected"
                      ? "❌"
                      : a?.application_status == "underConsideration"
                        ? "⏲️"
                        : ""}{" "}
                  {a?.application_status?.toUpperCase()}
                </small>
              </div>
            </div>

            <div
              class="trapezium"
              onClick={() => {
                dontApply(a?.appication_id);
              }}
            >
              <p
                style={{
                  position: "relative",
                  top: "7vh",
                  left: "15vw",
                  display: "flex",
                  alignItems: "center",
                  gap: "1vw",
                }}
              >
                {" "}
                <RxCross1 style={{ marginLeft: "-2vw" }} /> Cancel Application
              </p>
            </div>
          </>
        ))
      )}
    </main>
  );
};

export default ApplicationPage;
