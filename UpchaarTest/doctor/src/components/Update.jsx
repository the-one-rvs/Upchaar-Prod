import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getImageUrl } from "../utils.js"


const Update = () => {

  const [profile, setProfile] = useState([])

  const {isAuthenticated} = useContext(Context)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/doctor/me",
          {
            withCredentials: true
          })
        console.log(data.user);
        setProfile(data.user);
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [])
  console.log("Profile", profile);

  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName)
  const [email, setEmail] = useState(profile.email)
  const [phone, setPhone] = useState(profile.phone)
  const [nic, setNic] = useState(profile.nic)
  const [dob, setDob] = useState(profile.dob)
  const [gender, setGender] = useState(profile.gender)
  const [password, setPassword] = useState(profile.password)
  const [doctorDepartment, setDoctorDepartment] = useState(profile.doctorDepartment)
  const [docAvatar, setDocAvatar] = useState(profile.docAvatar)
  const [docAvatarPreview, setDocAvatarPreview] = useState(profile.docAvatarPreview)

  if(!isAuthenticated){
    return <Navigate to={"/login"} />
  }

  const navigateTo = useNavigate();

  const updateProfile = async(e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("nic", nic);
      formData.append("gender", gender);
      formData.append("password", password);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("docAvatar", docAvatar);
      formData.append("dob", dob);

      const { data } = await axios.put(
        "http://localhost:4000/api/v1/user/updateProfile",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      ).then(res => {
        toast.success(data.message);
        navigateTo("/");
      })
    } catch (error) {
      toast.error(error.data.message);
    }
  }

  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    }
  }

  return (
    <section className='page'>
      <div className="container form-component add-doctor-form">
        <img src={getImageUrl("Navbar/logoupchaar.png")} alt='logo' className='logo' />
        <h1 className='form-title'>UPDATE PROFILE DETAILS</h1>
        <p>For updating any One Field , User must fill all Fields</p>
        <form onSubmit={updateProfile}>
          <div className="first-wrapper">
            <div className='doc-image'>
              <img src={docAvatarPreview ? `${docAvatarPreview}` : "/docHolder.jpg"} alt='Doctor Avatar' />
              <input type='file' onChange={handleAvatar} style={{ height: "100px" }} />
            </div>
            <div>
              <input type='text' placeholder={`${profile.firstName}`} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <input type='text' placeholder={`${profile.lastName}`}  value={lastName} onChange={(e) => setLastName(e.target.value)} />
              <input type='text' placeholder={`${profile.email}`} value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type='number' placeholder={`${profile.phone}`} value={phone} onChange={(e) => setPhone(e.target.value)} />
              <input type='number' placeholder={`${profile.nic}`}  value={nic} onChange={(e) => setNic(e.target.value)} />
              <input type='date' placeholder={profile.dob} value={dob} onChange={(e) => setDob(e.target.value)} />
              <select value={gender} onChange={((e) => setGender(e.target.value))}>
                <option value="">Select Gender</option>
                <option value={profile.gender} >{profile.gender}</option>
              </select>
              <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
              <select value={doctorDepartment} onChange={(e) => setDoctorDepartment(e.target.value)}>
                <option value="">Select Department</option>
                <option value={profile.doctorDepartment}>{profile.doctorDepartment}</option>
              </select>
              <button type='submit'>UPDATE</button>
            </div>
          </div>

        </form>
      </div>
    </section>
  )
}

export default Update
