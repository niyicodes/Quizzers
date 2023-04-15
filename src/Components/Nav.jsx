import React, { useEffect, useState } from "react";
import { IoMdPerson } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../Firebase/firebase";
import Logo from "../images/logo.png";
import { logout, selectUser } from "../Redux/Features/User/user";

function Nav() {
 const user = useSelector(selectUser);
 
 const dispatch = useDispatch();
 const navigate = useNavigate();

 const Logout = () => {
  dispatch(logout());
  auth.signOut();
  toast.success("Successfully signed out", {
   position: toast.POSITION.TOP_RIGHT
  })
  navigate("/");
 };

 return (
  <div className="fixed w-full bg-waikawa-gray-900 py-4 top-0">
   <nav className="font-primary">
    <div className="">
     <div className="flex items-center justify-between  h-16">
      <div>
       <Link to="/">
        <img src={Logo} alt="logo" className="w-36" />
       </Link>
      </div>
      <div className="flex gap-4 items-center pr-3">
       <div className="btn">
        {user && (
         <button className="text-2xl text-white" onClick={Logout}>
          Logout
         </button>
        )}
       </div>
       <div className="profile">
        {user ? (
        <img src={user.photoUrl} alt="photo" className="w-12 h-12 rounded-full"/>
         ) : (
          <IoMdPerson className="text-2xl text-white hover:cursor-pointer" />
        )}
       </div>
      </div>
     </div>
    </div>
   </nav>
  </div>
 );
}

export default Nav;
