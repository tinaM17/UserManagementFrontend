import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

function CreateUser() {
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [mob, setMob] = useState();
  const [company, setCompany] = useState();
  const [image, setImage] = useState();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`http://localhost:3000/api/users`, {
        firstname: firstname,
        lastname: lastname,
        email: email,
        mob: mob,
        company: company,
        image: image,
      });
      resetForm();
      console.log("User added successfully");
      window.location="/createUser";
    } catch (error) {
      console.log(error);
    }
  };
  const resetForm = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setMob("");
    setCompany("");
    setImage("");
  };
  return (
    <div className="flex justify-center h-screen mt-10">
      <div className="container mt-10 bg-slate-700 xl:w-[600px] h-[400px] lg:w-32 rounded-2xl">
        <div className="card text-center ">
          <h2 className="text-2xl text-sky-400 pt-5">Enter User Details</h2>
        </div>
        <div className="flex mt-5">
          <form action="">
            <div className="flex flex-row">
              <div className="flex flex-col mr-10 ml-5">
                <label htmlFor="firstName" className="ml-5 text-white text-xl">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="ml-5 mt-2 p-1"
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col ml-10">
                <label htmlFor="lastName" className="ml-5 text-white text-xl">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="ml-5 mt-2 p-1"
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-row mt-3">
              <div className="flex flex-col mr-10 ml-5">
                <label htmlFor="email" className="ml-5 text-white text-xl">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="ml-5 mt-2 p-1"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col ml-10">
                <label htmlFor="mob" className="ml-5 text-white text-xl">
                  Mob No.
                </label>
                <input
                  type="text"
                  id="mob"
                  className="ml-5 mt-2 p-1"
                  onChange={(e) => {
                    setMob(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-row mt-5">
              <div className="flex flex-col mr-10 ml-5">
                <label htmlFor="image" className="ml-5 text-white text-xl">
                  Image
                </label>
                <input
                  type="text"
                  id="image"
                  className="ml-5 mt-2 p-1"
                  onChange={(e) => {
                    setImage(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col mr-10 ml-5">
                <label htmlFor="company" className="ml-10 text-white text-xl">
                  Comapny
                </label>
                <input
                  type="text"
                  id="company"
                  className="ml-10 mt-2 p-1"
                  onChange={(e) => {
                    setCompany(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex justify-center mt-5 bg-green-400 w-36 m-auto p-2 rounded-md">
              <input type="button" value="Submit" onClick={handleSubmit} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
