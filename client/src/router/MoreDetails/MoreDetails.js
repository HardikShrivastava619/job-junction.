import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { handleCreateNotification } from "../../helper";

export const MoreDetailsLogic = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const [dob, setDob] = useState("");
  const [post, setPost] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phnum, setPhnum] = useState("");
  const [landMark, setLandMark] = useState("");
  const [insta, setInsta] = useState();
  const [fb, setFaceBook] = useState();
  const [git, setGit] = useState();
  const [twitter, setTwitter] = useState();
  const [deg, setDeg] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [gender, setGender] = useState("");
  const [currStatus, setCurrStatus] = useState();
  const [expectedCTC, setExpectedCTC] = useState(null);
  const [editNameModal, setEditNameModal] = useState(false);
  const [title, setTitle] = useState(null);

  const [editProf, setEditProf] = useState(false);
  const [edit, setEdit] = useState(null);
  const [instituteName, setInstituteName] = useState(null);
  const [degree, setDegree] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [pinCode, setPinCode] = useState(null);
  const [skillForm, setSkillForm] = useState(false);
  const [ratings, setRatings] = useState(null);
  const [skillText, setskillText] = useState(null);
  const [skillData, setSkillData] = useState([]);
  const [langForm, setLagForm] = useState(false);
  const [langText, setLangText] = useState(null);
  const [langData, setLangData] = useState([]);
  const [profile_photo, setProfile_photo] = useState(null);
  const [clickedStar, setClickedStar] = useState(-1);
  const [sector, setSector] = useState(null);
  const [netWorth, setNetWorth] = useState(null);
  const [chairman, setChairman] = useState(null);
  const [chro, setChro] = useState(null);
  const [designation, setDesignation] = useState(null);
  const [official_site_url, setOfficial_site_url] = useState(null);
  const [description, setDescription] = useState(null);
  const [cover_image_url, setcover_image_url] = useState(null);
  const [hq, setHQ] = useState(null);
  const [license_doc_url, setLicense_doc_url] = useState(null);
  const [branches, setBranches] = useState(null);
  const [totEmp, setEmp] = useState(null);

  const handleEditModals = async () => {
    try {
      setEditNameModal(!editNameModal);
    } catch (error) {
      console.log(error);
    }
  };

  const loginData = useSelector((s) => s.loginData);
  const params = useParams();

  const isoDate = dob;
  const date = new Date(isoDate);

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handleMoreDetails = async () => {
    try {
      const res = await fetch(
        `https://job-junction-dpvo.onrender.com/api/user/get_ourProfile/${params?.id}`,
      );
      const data = await res.json();

      if (data?.success) {
        setRole(data?.role);
        setName(data?.user?.name);
        setDob(data?.user?.dob);
        setState(data?.user?.state_or_UT);
        setCity(data?.user?.city);
        setCompany(data?.user?.company);
        setLandMark(data?.user?.landMark);
        setEmail(data?.user?.email);
        setFaceBook(data?.user?.facebookURL);
        setGit(data?.user?.GitHubURL);
        setInsta(data?.user?.instagramURL);
        setTwitter(data?.user?.twitterURL);
        setPhnum(data?.user?.phone);
        setPost(data?.user?.post);
        setAboutMe(data?.user?.AboutME);
        setDeg(data?.user?.degrees);
        setGender(data?.user?.gender);
        setCurrStatus(data?.user?.currentStatus);
        setExpectedCTC(data?.user?.ExpectedCtC);
        setTitle(data?.user?.title);
        setPinCode(data?.user?.pincode);
        setProfile_photo(data?.user?.profile_photo);
        setDesignation(data?.user?.type);
        setEmail(data?.user?.email);
        setTwitter(data?.user?.twitterURL);
        setOfficial_site_url(data?.user?.official_site_url);
        setChairman(data?.user?.owned_by);
        setChro(data?.user?.chro);
        setHQ(data?.user?.hq);
        setSector(data?.user?.industry_type);
        setDescription(data?.user?.company_description);
        setNetWorth(data?.user?.net_worth);
        setBranches(data?.user?.total_branches);
        setEmp(data?.user?.total_employees);
        setLicense_doc_url(data?.user?.license_doc_url);
        setcover_image_url(data?.user?.cover_image_url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLang = async (lid) => {
    try {
      const res = await fetch(
        `https://job-junction-dpvo.onrender.com/api/lang/deleteLang/${lid}`,
        {
          method: "DELETE",
        },
      );
      const data = await res.json();

      if (data?.success) {
        await getLang();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSkills = async (sid) => {
    try {
      const res = await fetch(
        `https://job-junction-dpvo.onrender.com/api/skills/deleteSkills/${sid}`,
        {
          method: "DELETE",
        },
      );
      const data = await res.json();

      if (data?.success) {
        await getSkills();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLang = async () => {
    try {
      const res = await fetch(
        `https://job-junction-dpvo.onrender.com/api/lang/getLang/${params?.id}`,
      );
      const data = await res.json();

      setLangData(data?.lang);
    } catch (error) {
      console.log(error);
    }
  };

  const getSkills = async () => {
    try {
      const res = await fetch(
        `https://job-junction-dpvo.onrender.com/api/skills/getSkills/${params?.id}`,
      );
      const data = await res.json();

      setSkillData(data?.skills);
    } catch (error) {
      console.log(error);
    }
  };

  const [educationDetails, setEducationDetails] = useState([]);
  const [fillEducationDet, setFillEduc] = useState(false);

  const handleEducationDetAddBtn = async () => {
    try {
      return setFillEduc(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveChanges = async (e) => {
    try {
      e.preventDefault();

      const educFormData = new FormData();

      educFormData.append("instituteName", instituteName);
      educFormData.append("endDate", endDate);
      educFormData.append("startDate", startDate);
      educFormData.append("degree", degree);
      educFormData.append("certificate", certificate);

      const res = await fetch(
        `https://job-junction-dpvo.onrender.com/api/education/addEducDet/${loginData?.id}`,
        {
          method: "POST",
          body: educFormData,
        },
      );

      const data = await res.json();

      if (data?.success) {
        return setFillEduc(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteeducdet = async (id) => {
    try {
      const res = await fetch(
        `https://job-junction-dpvo.onrender.com/api/education/deleteEducDet/${id}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();

      if (data?.success) {
        return getEducDet();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getEducDet = async (e) => {
    try {
      const res = await fetch(
        `https://job-junction-dpvo.onrender.com/api/education/getEducDet/${params?.id}`,
      );
      const data = await res.json();

      if (data?.success) {
        setEducationDetails(data?.educDet);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveLang = async (e) => {
    try {
      e.preventDefault();

      const res = await fetch(
        `https://job-junction-dpvo.onrender.com/api/lang/saveLang/${loginData?.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ langText, ratings }),
        },
      );
      const data = await res.json();

      setClickedStar(-1);
      setLagForm(false);
      return await getLang();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveSkills = async (e) => {
    try {
      e.preventDefault();

      const res = await fetch(
        `https://job-junction-dpvo.onrender.com/api/skills/saveSkills/${loginData?.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ skillText, ratings }),
        },
      );
      const data = await res.json();

      setClickedStar(-1);
      setSkillForm(false);
      return await getSkills();
    } catch (error) {
      console.log(error);
    }
  };

  const [followers_id, setFollowersID] = useState(loginData?.id);
  const [followed_id, setFollowedID] = useState(params?.id);
  const [showFollower, setShowFollower] = useState(false);
  const [showFollowings, setShowFollowings] = useState(false);

  const [isFollow, setIsFollow] = useState(false);

  const checkFollows = async () => {
    try {
      const res = await fetch(
        `https://job-junction-dpvo.onrender.com/api/follow/checkFollowsOrnot/${followers_id}/${followed_id}`,
      );
      const data = await res.json();

      if (data?.result) {
        return setIsFollow(true);
      } else {
        return setIsFollow(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [followers, setFollwers] = useState([]);

  const getFollowers = async () => {
    try {
      const res = await fetch(
        `https://job-junction-dpvo.onrender.com/api/follow/getAllFollowers/${followed_id}`,
      );
      const data = await res.json();

      if (data?.result) {
        return setFollwers(data?.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [followings, setFollwings] = useState([]);

  const getFollowings = async () => {
    try {
      const res = await fetch(
        `https://job-junction-dpvo.onrender.com/api/follow/getAllFollowings/${followed_id}`,
      );
      const data = await res.json();

      if (data?.result) {
        return setFollwings(data?.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollowBtn = async () => {
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
        checkFollows();
        getFollowers();

        const notf = await handleCreateNotification({
          sid: loginData?.id,
          rid: params?.id,
          eid: null,
          type: "follow",
          action: data?.code,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  ///////////////////////////////////////////////////////// Enterprise Logic /////////////////////////////////////////////////////////////////////

  const updateViewers = async () => {
    try {
      const res = await fetch(
        `https://job-junction-dpvo.onrender.com/api/user/updateViewers/${params?.id}/${loginData?.id} `,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await res.json();

      if (data?.message == "Added in view List") {
        const notf = await handleCreateNotification({
          sid: loginData?.id,
          rid: params?.id,
          eid: null,
          type: "views",
        });

        console.log("notf", notf);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    title,
    setEmp,
    updateViewers,
    role,
    setNetWorth,
    setBranches,
    cover_image_url,
    sector,
    netWorth,
    chairman,
    chro,
    hq,
    designation,
    branches,
    totEmp,
    description,
    license_doc_url,
    official_site_url,

    /********************************** ENtp Returns are given above  **************************************** */

    showFollower,
    followings,
    getFollowings,
    setShowFollower,
    showFollowings,
    setShowFollowings,
    isFollow,
    followers,
    getFollowers,
    handleFollowBtn,
    checkFollows,
    profile_photo,
    params,
    loginData,
    getLang,
    deleteLang,
    langText,
    handleSaveLang,
    langData,
    setLangData,
    setLangText,
    langForm,
    setLagForm,
    clickedStar,
    deleteSkills,
    setClickedStar,
    skillData,
    getSkills,
    handleSaveSkills,
    ratings,
    setRatings,
    skillText,
    setskillText,
    setSkillForm,
    skillForm,
    handleDeleteeducdet,
    pinCode,
    setPinCode,
    gender,
    fillEducationDet,
    getEducDet,
    instituteName,
    setInstituteName,
    degree,
    setDegree,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    certificate,
    setCertificate,
    handleSaveChanges,
    handleEducationDetAddBtn,
    setFillEduc,
    educationDetails,
    edit,
    setEdit,
    editProf,
    setEditProf,
    currStatus,
    expectedCTC,
    handleEditModals,
    editNameModal,
    setEditNameModal,
    setExpectedCTC,
    setCurrStatus,
    setGender,
    handleMoreDetails,
    name,
    formattedDate,
    state,
    city,
    email,
    aboutMe,
    phnum,
    deg,
    company,
    post,
    landMark,
    insta,
    git,
    fb,
    twitter,
  };
};
