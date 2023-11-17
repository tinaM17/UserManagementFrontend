import React, {useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function Dashboard() {
  const navigate = useNavigate();
  const [count,setCount]=useState();
  const [totalCount, setTotalConut]=useState();

  const handleShowUsers = () => {
    navigate("/users");
  };
  const handleCreateUser = () => {
    navigate("/createUser");
  };
  
  useEffect(()=>{
    const countUser=async ()=>{
      try {
        const res = await axios.get(
          `http://localhost:3000/api/users/count`
        );
        setCount(res.data.total)
      } catch (error) {
        console.error("Error fetching count:", error);
      }
    }
    const activeUser= async ()=>{
      try {
        const res = await axios.get(`http://localhost:3000/api/users/activeCount`);
        setTotalConut(res.data.activeCount)
      } catch (error) {
        console.error("Error fetching count:", error);
      }
    }
    Promise.all([countUser(),activeUser()])
  },[])
  return (
    <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full h-full pb-[200px]">
      <div className="heading">
        <h1 className="text-3xl text-center pt-10 text-white">
          User Management Dashboard
        </h1>
      </div>
      <div className="flex ml-10">
        <img
          src="https://d540vms5r2s2d.cloudfront.net/mad/uploads/mad_blog_5e8349af899c41585662383.png"
          alt="feature image"
          className="w-[500px] h-[300px] ml-10 mt-10 mr-10"
        />
        <div className="flex m-10">
          <div className="card1 bg-blue-200 h-fit pl-10 pr-10 pt-5 pb-5 rounded-lg mr-10">
            <h3 className="text-purple-600 text-2xl text-bold-lg">
              Total Users
            </h3>
            <span className="ml-10 text-xl">{count}</span>
          </div>
          <div className="card1 bg-blue-200 h-fit pl-10 pr-10 pt-5 pb-5 rounded-lg ml-10">
            <h3 className="text-purple-600 text-2xl text-bold-lg">
              No. of Active Users
            </h3>
            <span className="ml-10 text-xl">{totalCount}</span>
          </div>
        </div>
      </div>
      <div className=" absolute flex justify-center left-1/2 top-1/2">
        <div className="-mt-10 ml-10">
          <button
            className="ml-10 mr-5 bg-green-700 text-white p-5"
            onClick={handleCreateUser}
          >
            Create User
          </button>
          <button
            className="ml-5 mr-5 bg-red-500 text-white p-5"
            onClick={handleShowUsers}
          >
            Show Users
          </button>
        </div>
      </div>
    </div>
  );
}
