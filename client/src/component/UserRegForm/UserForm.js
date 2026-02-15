import { useState } from "react";

export const UserFormLogic = () => {
  try {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [dob, setDob] = useState(null);
    const [aboutMe, setAboutMe] = useState('');
    const [password, setPassw] = useState('');
    const [box1, setBox1] = useState(true);
    const [inputNum, setInputNum] = useState(1);
    const [otp, setOtp] = useState('');
    const [confPass, setConfPass] = useState('');
    const [load, setLoad] = useState(false);
    const [instagramURL, setInstagramURL] = useState('');
    const [GitHubURL, setGitHubURL] = useState('');
    const [facebookURL, setFacebookURL] = useState('');
    const [twitterUrl, setTwitterUrl] = useState('');
    const [currentStatus, setCurrentStatus] = useState('');
    const [gender, setGender] = useState('Male');
    const [state_or_UT, setState] = useState('Arunachal Pradesh');
    const [city, setCity] = useState('');
    const [landMark, setLandMark] = useState('');
    const [pincode, setPinCode] = useState(null);
    const [company, setCompany] = useState('');
    const [phone, setPhone] = useState(null);
    const [post, setPost] = useState('');
    const [profile_photo, setProfile_photo] = useState(null);
const [previewURL, setPreviewURL] = useState(null);


    
    
    

    return {previewURL, setPreviewURL,
      email, setEmail,
      name, setName,
      dob, setDob,
      aboutMe, setAboutMe,
      password, setPassw,
      box1, setBox1,
      inputNum, setInputNum,
      otp, setOtp,
      confPass, setConfPass,
      load, setLoad,
      instagramURL, setInstagramURL,
      GitHubURL, setGitHubURL,
      facebookURL, setFacebookURL,
      twitterUrl, setTwitterUrl,
      currentStatus, setCurrentStatus,
      gender, setGender,
      state_or_UT, setState,
      city, setCity,
      landMark, setLandMark,
      pincode, setPinCode,
      company, setCompany,
      phone, setPhone,
      post, setPost,
      profile_photo, setProfile_photo
    };
  } catch (error) {
    console.error("Error in UserFormLogic:", error);
  }
};
