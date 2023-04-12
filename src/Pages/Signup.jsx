import React, { useEffect, useState } from "react";
import { signInWithGoogle } from "../Firebase/firebase";

import Video from "../images/video.mp4";

const Signup = () => {
 
 return (
  <div className="relative">
   <video className="absolute inset-0 w-full object-cover h-screen" autoPlay muted loop>
    <source src={Video} type="video/mp4" />
   </video>
   <div class="absolute inset-0 bg-black bg-opacity-75"></div>
   <div className="relative z-10 flex flex-col justify-center items-center h-screen lg:mx-8">
    <h3 className="signup-text">
     want to be able to set quiz for people??
    </h3>
    <button
     type="button"
     class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-2xl px-8 py-5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mb-2"
     onClick={signInWithGoogle}
    >
     <svg
      class="w-6 h-6 mr-2 -ml-1"
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="google"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 488 512"
     >
      <path
       fill="currentColor"
       d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
      ></path>
     </svg>
     Sign in with Google
    </button>
   </div>
  </div>
 );
};

export default Signup;
