import React from "react";
import { useEffect } from "react";

import { PiCakeFill } from "react-icons/pi";
import "./UserForm.css";
import { TbPasswordFingerprint } from "react-icons/tb";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdAttachEmail, MdOutlinePassword } from "react-icons/md";
import { PiBuildingOfficeDuotone } from "react-icons/pi";
import { FaUserEdit } from "react-icons/fa";
import { TbPasswordMobilePhone } from "react-icons/tb";
import { confirmAlert } from "react-confirm-alert";
import { Link, useNavigate } from "react-router-dom";
import { UserFormLogic } from "./UserForm.js";
import { FcGoogle } from "react-icons/fc";
import { BiMaleFemale } from "react-icons/bi";
import { GiIndianPalace } from "react-icons/gi";
import { GiModernCity } from "react-icons/gi";
import { FaLandmarkFlag } from "react-icons/fa6";
import { GiRotaryPhone } from "react-icons/gi";
import { TbMapPinCode } from "react-icons/tb";
import { FaUsers } from "react-icons/fa6";
import { BsBuildingsFill, BsFillKeyboardFill } from "react-icons/bs";
import { FaUserMd } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import { loginSliceAction } from "../../store/loginSlice.js";
import { useDispatch } from "react-redux";
import { FaCircleUser } from "react-icons/fa6";

const UserForm = ({ setBtnRemove }) => {
  const {
    email,
    setEmail,
    name,
    setName,
    dob,
    setDob,
    aboutMe,
    setAboutMe,
    password,
    setPassw,
    box1,
    setBox1,
    inputNum,
    setInputNum,
    otp,
    setOtp,
    confPass,
    setConfPass,
    load,
    setLoad,
    instagramURL,
    setInstagramURL,
    GitHubURL,
    setGitHubURL,
    facebookURL,
    setFacebookURL,
    twitterUrl,
    setTwitterUrl,
    currentStatus,
    setCurrentStatus,
    gender,
    setGender,
    state_or_UT,
    setState,
    city,
    setCity,
    landMark,
    setLandMark,
    pincode,
    setPinCode,
    company,
    setCompany,
    phone,
    setPhone,
    post,
    setPost,
    previewURL,
    setPreviewURL,
    profile_photo,
    setProfile_photo,
  } = UserFormLogic();

  const navigate = useNavigate();

  const verifyEmail = async () => {
    try {
      const res = await fetch(`http://localhost:1800/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data?.success) {
        setInputNum((p) => p + 1);
        setBox1(!box1);
        setLoad(false);
        return alert("An OTP is sent at your given email");
      } else if (data?.code === "INCOMPLETE_PROFILE") {
        setInputNum((p) => p + 2);
        setBox1(box1);
        return setLoad(false);
      } else if (data?.code === "go for login") {
        navigate("/login");
        return alert(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOTP = async () => {
    try {
      const res = await fetch(
        `http://localhost:1800/api/user/verifyOTP/${email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ otp }),
        },
      );

      const data = await res.json();

      console.log(data);

      if (data?.code === "OTP expired.") {
        setLoad(false);
        return alert(data?.message);
      } else if (data?.code === "Invalid OTP.") {
        setLoad(false);
        return alert(data?.message);
      } else if (data?.code === "verified") {
        alert(data?.message);
        setInputNum((p) => p + 1);
        setBox1(!box1);
        return setLoad(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch = useDispatch();

  const handleRegister = async () => {
    try {
      const formData = new FormData();

      if (currentStatus == "Fresher") {
        setCompany("Fresher");
        setPost("Fresher");
      }

      formData.append("name", name);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("state_or_UT", state_or_UT);
      formData.append("city", city);
      formData.append("landMark", landMark);
      formData.append("pincode", pincode);
      formData.append("currentStatus", currentStatus);
      formData.append("company", company);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("post", post);
      formData.append("AboutME", aboutMe);
      formData.append("twitterURL", twitterUrl);
      formData.append("facebookURL", facebookURL);
      formData.append("GitHubURL", GitHubURL);
      formData.append("instagramURL", instagramURL);
      formData.append("role", "Employee");

      if (profile_photo) {
        formData.append("profile_photo", profile_photo);
      }

      const res = await fetch(
        `http://localhost:1800/api/user/complete_profile/${email}`,
        {
          method: "PUT",
          body: formData,
        },
      );

      const data = await res.json();
      console.log(data);

      if (data?.success === true) {
        dispatch(loginSliceAction.loginUser(data?.updatedUser));

        navigate("/");

        return alert;
      }

      if (data?.success === false) {
        return alert("some error in registration");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleForward = async () => {
    try {
      setLoad(true);

      console.log(inputNum);

      if (inputNum <= 21) {
        if (inputNum === 2) {
          setLoad(false);
          if (!email.includes("@")) {
            return alert("Invalid email: must contain '@'.");
          }
        }

        if (inputNum === 6) {
          if (name?.trim()?.length == 0) {
            alert("Please Enter Your Name");
            return setLoad(false);
          }
        }

        if (inputNum === 14) {
          if (currentStatus == "Fresher") {
            setInputNum((p) => p + 2);
            setBox1(!box1);
          }
        }

        if (inputNum === 4) {
          if (password.length < 6) {
            setLoad(false);
            return alert("Password must be at least 6 characters long.");
          }
        }
        if (inputNum === 5) {
          if (password !== confPass) {
            setLoad(false);
            return alert("Passwords do not match");
          }
        }

        if (inputNum === 2) {
          if (email === "") {
            alert("Email is required");
            return setLoad(false);
          } else {
            return verifyEmail();
          }
        }

        if (inputNum === 3) {
          return verifyOTP();
        }

        setInputNum((p) => p + 1);
        setBox1(!box1);
        console.log(inputNum);

        return setLoad(false);
      } else {
        confirmAlert({
          customUI: ({ onClose }) => (
            <div className="confirm-alert-cont">
              <p>
                {" "}
                Great You are only one step ahead of registeration just give
                Final Permission to save your details{" "}
              </p>

              <button
                type="submit"
                className="final-btn-Register"
                onClick={() => {
                  handleRegister();
                  onClose();
                }}
              >
                {" "}
                Register Me{" "}
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = async () => {
    try {
      if (inputNum === 1) {
        return setBtnRemove(false);
      }

      if (inputNum == 17) {
        if (currentStatus == "Fresher") {
          setInputNum((p) => p - 3);
          console.log(inputNum);

          return setBox1(!box1);
        }
      }

      setBox1(!box1);
      setInputNum((p) => p - 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendOtpAgain = async () => {
    try {
      const res = await fetch(
        `http://localhost:1800/api/user/optAgain/${email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await res.json();
      if (data?.success) {
        return alert(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleForward();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleForward]);

  return (
    <form className="entForm">
      {box1 === true ? (
        <div className="box1">
          {inputNum === 1 ? (
            <a href="http://localhost:3003/api/auth/google">
              <button className="google-btn  ">
                <FcGoogle
                  className="google-img"
                  src="https://img.icons8.com/color/16/000000/google-logo.png"
                />
                Continue with Google
              </button>
            </a>
          ) : inputNum === 3 ? (
            <div className="reg-input">
              <label for="exampleInputPassword1" class="form-label">
                {" "}
                Verify Email
              </label>
              <input
                type="number"
                class="form-control"
                id="exampleInputPassword1"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
              />
              <div id="emailHelp" class="form-text">
                {" "}
                An OTP is sent at your Provided email{" "}
              </div>
              <small
                className="text-primary  "
                style={{ marginLeft: "6vw", cursor: "pointer" }}
                onClick={handleSendOtpAgain}
              >
                {" "}
                Send again{" "}
              </small>
            </div>
          ) : inputNum === 5 ? (
            <div className="reg-input">
              <label for="exampleInputPassword1" class="form-label">
                {" "}
                Confirm Password{" "}
              </label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                value={confPass}
                onChange={(e) => {
                  setConfPass(e.target.value);
                }}
              />
              <div id="confirmPasswordHelp" class="form-text">
                Re-enter the password exactly as above to confirm. This helps
                avoid typos and ensures security.
              </div>
            </div>
          ) : inputNum === 7 ? (
            <div class="reg-input">
              <label for="exampleInputEmail1" class="form-label">
                {" "}
                Date of Birth
              </label>
              <input
                type="date"
                class="form-control "
                aria-describedby="emailHelp"
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                }}
              />
            </div>
          ) : inputNum === 9 ? (
            <div class="reg-input">
              <label htmlFor="exampleInputEmail1" className="form-label">
                {" "}
                State/UT{" "}
              </label>
              <select
                className="form-select "
                value={state_or_UT}
                onChange={(e) => {
                  setState(e?.target?.value);
                }}
              >
                <optgroup label="State">
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                </optgroup>

                <optgroup label="UTs">
                  {" "}
                  <option value="Andaman and Nicobar Islands">
                    Andaman and Nicobar Islands
                  </option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Dadra and Nagar Haveli and Daman and Diu">
                    Dadra and Nagar Haveli and Daman and Diu
                  </option>
                  <option value="Delhi">Delhi</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Ladakh">Ladakh</option>
                  <option value="Puducherry">Puducherry</option>
                </optgroup>
              </select>
            </div>
          ) : inputNum === 11 ? (
            <div className="reg-input">
              <label for="exampleInputPassword1" class="form-label">
                Enter here{" "}
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                value={landMark}
                onChange={(e) => {
                  setLandMark(e.target.value);
                }}
              />
              <div id="emailHelp" class="form-text">
                {" "}
                Enter about any Landmark that is near your house .{" "}
              </div>
            </div>
          ) : inputNum === 13 ? (
            <div className="reg-input">
              <label for="exampleInputPassword1" class="form-label">
                {" "}
                Phone Number{" "}
              </label>
              <input
                type="number"
                class="form-control"
                placeholder="Enter here"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                id="exampleInputPassword1"
              />
              <div id="emailHelp" class="form-text">
                Enter a 10-digit mobile number without country code (e.g.,
                9876543210).
              </div>
            </div>
          ) : inputNum === 15 ? (
            <div className="reg-input">
              <label for="exampleInputPassword1" class="form-label">
                {" "}
                Comapny Name{" "}
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                }}
              />
              <div id="emailHelp" class="form-text">
                {" "}
                "Enter the full legal name of your company (e.g., 'Tata
                Consultancy Services Ltd.')."{" "}
              </div>
            </div>
          ) : inputNum === 17 ? (
            <div class="form-floating textarea-cont ">
              <textarea
                rows="12"
                class="form-control form-control-textarea"
                value={aboutMe}
                onChange={(e) => {
                  setAboutMe(e.target.value);
                }}
                placeholder="Leave a comment here"
                id="floatingTextarea"
              ></textarea>
              <label for="floatingTextarea"> About Me</label>
              <div id="emailHelp" class="form-text ">
                Share a few lines about your background, passions, or what
                you're currently working on.{" "}
              </div>
            </div>
          ) : inputNum === 19 ? (
            <div className="reg-input">
              <label for="exampleInputPassword1" class="form-label">
                {" "}
                Facebook's URL
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                value={facebookURL}
                onChange={(e) => {
                  setFacebookURL(e.target.value);
                }}
              />
              <div id="emailHelp" class="form-text">
                {" "}
                Please Share your Facebook link if you want so others can follow
                your updates and connect with you.
              </div>
            </div>
          ) : inputNum === 21 ? (
            <div className="reg-input">
              <label for="exampleInputPassword1" class="form-label">
                {" "}
                Twitter's URL
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                value={twitterUrl}
                onChange={(e) => {
                  setTwitterUrl(e.target.value);
                }}
              />
              <div id="emailHelp" class="form-text">
                {" "}
                Share your Twitter link so users can follow your updates and
                connect with you.
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="office-cont">
          {inputNum === 2 ? (
            <MdAttachEmail className="ImOffice" />
          ) : inputNum === 4 ? (
            <TbPasswordFingerprint className="ImOffice" />
          ) : inputNum === 6 ? (
            <FaUserEdit className="FaUserEdit ImOffice" />
          ) : inputNum === 8 ? (
            <BiMaleFemale className="ImOffice" />
          ) : inputNum === 10 ? (
            <GiModernCity className="ImOffice" />
          ) : inputNum === 12 ? (
            <TbMapPinCode className="ImOffice" />
          ) : inputNum === 14 ? (
            <FaUsers className="ImOffice" />
          ) : inputNum === 16 ? (
            <FaUserMd className="ImOffice" />
          ) : inputNum === 18 ? (
            <FaSquareInstagram className="ImOffice" />
          ) : inputNum === 20 ? (
            <FaGithub className="ImOffice" />
          ) : inputNum === 22 ? (
            previewURL !== null ? (
              <img
                className="userprofpic"
                src={previewURL}
                alt="Profile Preview"
              />
            ) : (
              <FaCircleUser className="ImOffice" />
            )
          ) : (
            <> </>
          )}
          <div className="arrow-cont">
            <IoIosArrowRoundBack
              className="reg-arrowbtn"
              onClick={handleBack}
            />

            {inputNum === 2 ? (
              <h4> Email address </h4>
            ) : inputNum === 4 ? (
              <h4> Password </h4>
            ) : inputNum === 6 ? (
              <h4>User Name </h4>
            ) : inputNum === 8 ? (
              <h4>Gender </h4>
            ) : inputNum === 10 ? (
              <h4> City / Town</h4>
            ) : inputNum === 12 ? (
              <h4>Pincode </h4>
            ) : inputNum === 14 ? (
              <h4> Current Status </h4>
            ) : inputNum === 16 ? (
              <h4> Current Post</h4>
            ) : inputNum === 18 ? (
              <h4> Instagram </h4>
            ) : inputNum === 20 ? (
              <h4> GitHub </h4>
            ) : inputNum === 22 ? (
              <h4>Profile Photo </h4>
            ) : (
              <h4> Email Id </h4>
            )}

            <IoIosArrowRoundForward
              className="reg-arrowbtn"
              onClick={handleForward}
            />
          </div>{" "}
          {load ? <Link className="register_loader"></Link> : <></>}
        </div>
      )}

      {!box1 ? (
        <div className="box2">
          {inputNum === 2 ? (
            <div className="reg-input">
              <label for="exampleInputPassword1" class="form-label">
                Email ID{" "}
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          ) : inputNum === 4 ? (
            <div className="reg-input">
              <label for="exampleInputPassword1" class="form-label">
                {" "}
                Enter Password{" "}
              </label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => {
                  setPassw(e.target.value);
                }}
              />
              <div id="passwordHelp" class="form-text">
                Use 8–16 characters with a mix of letters, numbers, and symbols
                (e.g., @, #, $). Avoid common words or personal info.
              </div>
            </div>
          ) : inputNum === 6 ? (
            <div className="reg-input">
              <label for="exampleInputPassword1" class="form-label">
                {" "}
                Full Name{" "}
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Here"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <div id="emailHelp" class="form-text">
                Enter name which is in your documents.
              </div>
            </div>
          ) : inputNum === 8 ? (
            <div className="reg-input">
              <label htmlFor="exampleInputEmail1" className=" form-label">
                {" "}
                Gender{" "}
              </label>
              <select
                className=" form-select"
                id="gender"
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer Not to Say">Prefer Not to Say</option>
              </select>
            </div>
          ) : inputNum === 10 ? (
            <div className="reg-input">
              <label for="exampleInputPassword1" class="form-label">
                Enter city here
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
              <div id="emailHelp" class="form-text">
                {" "}
                Enter the full name of city with correct spelling for
                clarification .{" "}
              </div>
            </div>
          ) : inputNum === 12 ? (
            <div className="reg-input">
              <label for="exampleInputPassword1" class="form-label">
                {" "}
                Area Pincode{" "}
              </label>
              <input
                type="number"
                class="form-control"
                placeholder="Enter here"
                value={pincode}
                onChange={(e) => {
                  setPinCode(e.target.value);
                }}
                id="exampleInputPassword1"
              />
            </div>
          ) : inputNum === 14 ? (
            <div class="reg-input">
              <label htmlFor="exampleInputEmail1" className=" form-label">
                {" "}
                CurrentStatus{" "}
              </label>
              <select
                className=" form-select"
                id="gender"
                value={currentStatus}
                onChange={(e) => {
                  setCurrentStatus(e.target.value);
                }}
              >
                <option value="Fresher">Fresher</option>
                <option value="Intern">Intern</option>
                <option value="Currently Working">Currently Working</option>
              </select>
            </div>
          ) : inputNum === 16 ? (
            <div className="reg-input">
              <label for="exampleInputPassword1" class="form-label">
                {" "}
                Current Post{" "}
              </label>
              <input
                type="email"
                class="form-control"
                value={post}
                onChange={(e) => {
                  setPost(e.target.value);
                }}
                id="exampleInputPassword1"
              />
              <small id="emailHelp" class="form-text">
                {" "}
                Enter your current designation (e.g., 'Software Engineer', 'HR
                Manager', 'Marketing Intern').
              </small>
            </div>
          ) : inputNum === 18 ? (
            <div className="reg-input">
              <label for="exampleInputPassword1" class="form-label">
                {" "}
                Instagram's URL
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                value={instagramURL}
                onChange={(e) => {
                  setInstagramURL(e.target.value);
                }}
              />
              <div id="emailHelp" class="form-text">
                {" "}
                Please Share your Instagram link if you want so others can
                follow your updates and connect with you.
              </div>
            </div>
          ) : inputNum === 20 ? (
            <div className="reg-input">
              <label for="exampleInputPassword1" class="form-label">
                {" "}
                GitHub's URL
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                value={GitHubURL}
                onChange={(e) => {
                  setGitHubURL(e.target.value);
                }}
              />
              <div id="emailHelp" class="form-text">
                {" "}
                Please Share your GitHub link if you want so others can follow
                your updates and connect with you.
              </div>
            </div>
          ) : inputNum === 22 ? (
            <div className="reg-input">
              <label for="exampleInputPassword1" class="form-label">
                {" "}
                Upload your Proile Photo{" "}
              </label>
              <input
                type="file"
                className="form-control"
                id="profilePhoto"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setProfile_photo(file);
                    setPreviewURL(URL.createObjectURL(file));
                  }
                }}
              />
              <div id="emailHelp" class="form-text">
                {" "}
                Upload file in jpg jpeg format.
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="office-cont">
          {inputNum === 1 ? (
            <BsFillKeyboardFill className="ImOffice" />
          ) : inputNum === 3 ? (
            <TbPasswordMobilePhone className="ImOffice" />
          ) : inputNum === 5 ? (
            <MdOutlinePassword className=" ImOffice" />
          ) : inputNum === 7 ? (
            <PiCakeFill className="ImOffice" />
          ) : inputNum === 9 ? (
            <FaLandmarkFlag className="ImOffice" />
          ) : inputNum === 11 ? (
            <GiIndianPalace className="ImOffice" />
          ) : inputNum === 13 ? (
            <GiRotaryPhone className=" ImOffice" />
          ) : inputNum === 15 ? (
            <BsBuildingsFill className="ImOffice" />
          ) : inputNum === 17 ? (
            <IoMdPersonAdd className="ImOffice IoMdPersonAdd" />
          ) : inputNum === 19 ? (
            <FaFacebook className="ImOffice" />
          ) : inputNum === 21 ? (
            <FaTwitter className="ImOffice " />
          ) : (
            <></>
          )}

          <div className="arrow-cont">
            <IoIosArrowRoundBack
              className="reg-arrowbtn"
              onClick={handleBack}
            />
            {inputNum === 1 ? (
              <h4>Register Manually </h4>
            ) : inputNum === 3 ? (
              <h4> One Time Password </h4>
            ) : inputNum === 5 ? (
              <h4> Confirm Password </h4>
            ) : inputNum === 7 ? (
              <h4> Birth Date </h4>
            ) : inputNum === 9 ? (
              <h4>State/UT</h4>
            ) : inputNum === 11 ? (
              <h4> Landmark </h4>
            ) : inputNum === 13 ? (
              <h4> Contact Number </h4>
            ) : inputNum === 15 ? (
              <h4> Company </h4>
            ) : inputNum === 17 ? (
              <h4> About Me </h4>
            ) : inputNum === 19 ? (
              <h4> Facebook </h4>
            ) : inputNum === 21 ? (
              <h4> Twitter </h4>
            ) : (
              <></>
            )}
            <IoIosArrowRoundForward
              className="reg-arrowbtn"
              onClick={handleForward}
            />
          </div>
          {load ? <Link className="register_loader"></Link> : <></>}
        </div>
      )}
    </form>
  );
};

export default UserForm;
