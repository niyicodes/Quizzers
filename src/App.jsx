import { AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import Nav from "./Components/Nav";
import { auth, onAuthStateChanged } from "./Firebase/firebase";
import Home from "./Pages/Home";
import QuizView from "./Pages/QuizView";
import Signup from "./Pages/Signup";
import { login, selectUser } from "./Redux/Features/User/user";



function App() {
 const location = useLocation();
 const dispatch = useDispatch()
 const user = useSelector(selectUser)
 

 useEffect(()=>{
  onAuthStateChanged(auth, (userAuth)=>{
   if(userAuth){
    dispatch(login({
     email: userAuth.email,
     uid: userAuth.uid,
     displayName: userAuth.displayName,
     photoUrl: userAuth.photoURL,
    }))
   }
  })
 },[])

 return (
  <div className="">
   <Nav />
   <div className="mt-24">
    <AnimatePresence wait>
     {!user ? ( <Signup />) :
     (<>
     <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/quizview" element={<QuizView />} />
     </Routes>
     </>)}
    </AnimatePresence>
   </div>
  </div>
 );
}

export default App;