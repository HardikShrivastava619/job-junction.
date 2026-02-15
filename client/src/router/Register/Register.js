import React, { useRef, useState } from 'react'

export const RegisterLogic = () => {
  try {
    const [page, setPage] = useState(1)
    const [photo, setPhoto] = useState('')
    const [load, setLoad] = useState(false)
    const [name, setName] = useState('')
    const [company, setCompany] = useState('')
    const [phone, setPhone] = useState('')
    const [district, setDistrict] = useState('')
    const [pincode, setPinCode] = useState('')
    const [post, setPost] = useState('')
    const [city, setCity] = useState('')
    const [landMark, setLandMark] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [experience, setExperience] = useState('')
    const [state_or_ut, setState] = useState('')
    const [dob, setDOB] = useState('')
    const [sector, setSector] = useState('')
    const [gender, setGender] = useState('')
    const [role, setRole] = useState('')
    const [curretntStatus, setCurretntStatus] = useState('')
    const [territorialUnit, setTerritorialUnit] = useState('State')

    const emailRef = useRef()
    const otpRef = useRef()

    const handleGender = (e) => {
      setGender(e.target.value)
    }

    const handleRole = (e) => {
      setRole(e.target.value)
    }

    return {
      page, setPage, photo, setPhoto, load, setLoad,
      name, setName, company, setCompany, phone, setPhone,
      district, setDistrict, pincode, setPinCode, post, setPost,
      city, setCity, landMark, setLandMark, password, setPassword,
      confirmPassword, setConfirmPassword, experience, setExperience,
      state_or_ut, setState, dob, setDOB, sector, setSector,
      gender, setGender, role, setRole, territorialUnit, setTerritorialUnit,
      emailRef, otpRef, handleGender, handleRole,setCurretntStatus,curretntStatus
    }
  } catch (error) {
    console.log(`Error in registration logic: ${error}`)
  }
}
