import React, { useEffect, useState } from "react";
import { IoMdPerson } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebase";
import Logo from "../images/logo.png";
import { logout, selectUser } from "../Redux/Features/User/user";

function Nav() {
 const [isOpen, setIsOpen] = useState(false);
 const user = useSelector(selectUser);
 




 const dispatch = useDispatch();
 const navigate = useNavigate();

 const Logout = () => {
  dispatch(logout());
  auth.signOut();
  nagivate("/");
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
        {user ? (
         <button className="text-2xl text-white" onClick={Logout}>
          Logout
         </button>
        ) : (
         <button className="text-2xl text-white">Login</button>
        )}
       </div>
       <div className="profile">
        {user ? (
         <IoMdPerson className="text-2xl text-white hover:cursor-pointer" />
        ) : (
         <img src="" alt="photo" className="w-12 h-12 rounded-full"/>
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
