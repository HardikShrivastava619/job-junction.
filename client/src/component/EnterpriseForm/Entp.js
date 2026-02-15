import { useState } from "react";

export const EntpLogic =  () => {
    try {
        

const [email,setEmail] = useState('')
const [doi,setDoi] = useState(null)
const [owner,setOwner] = useState('')
const [type,setType] = useState('')
const [chro,setChro] = useState('')
const [hq,setHq] = useState('')
const [branches,setBranches] = useState(null)
const [netWorth,setNetWorth] = useState(null)
const [totEmp,setTotEmp] = useState(null)
const [offWeb,setOffWeb] = useState('')
const [logo,setLogo] = useState(null)
const [img,setImg] = useState(null)
const [industType,setIndustType] = useState('')
const [name,setName] = useState('')
const [company_description,setcompany_description] = useState('')
const [password,setPassw] = useState('')
const [license_doc_url,setlicense_doc_url] = useState(null)
const [license_verified,setlicense_verified] = useState(false)
const [twitter_url,settwitterUrl] = useState('')
const [box1 , setBox1] = useState(true) 
const [inputNum , setInputNum] = useState(1) 
const [otp,setOtp] = useState('') 
const [confPass,setConfPass] = useState('')
const [load,setLoad] = useState(false)
const [licensePreview,setLicensePreview] = useState(null)
const [imgPreview,setImgPreview] = useState(null)
const [logoPreview,setLogoPreview] = useState(null)


return {load,setLoad,logoPreview,imgPreview,setImgPreview,licensePreview,setLicensePreview,setLogoPreview,
    email,setEmail,doi,setDoi,owner,setOwner,type,setType,chro,setChro,branches,setBranches
,hq,setHq,netWorth,setNetWorth ,totEmp,setTotEmp,logo,setLogo,offWeb,setOffWeb 
,img,setImg,industType,setIndustType,name,setName,company_description,setcompany_description
,password,setPassw,license_doc_url,setlicense_doc_url,license_verified,setlicense_verified
,twitter_url,settwitterUrl,box1,setBox1,inputNum , setInputNum,otp,setOtp,confPass,setConfPass}


    } catch (error) {
        console.log(error);
        
    }
}