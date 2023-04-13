import React, { useState } from "react";
import { FiPlay, FiPlus } from "react-icons/fi";
import Card from "../Components/Card";
import QuizForm from "../Components/QuizForm";
import Spinner from "../speedometer.gif";

const Home = () => {
 const [isSpinning, setIsSpinning] = useState(false);
 const [isModalOpen, setIsModalOpen] = useState(false);

 const openModal = () => {
  setIsSpinning(true);
  setTimeout(() => {
   setIsSpinning(true);
   setIsModalOpen(true);
  }, 1000);
 };

 const Play = <FiPlay />;
 const Plus = <FiPlus />;
 return (
  <div className="bg-contessa-600 h-screen flex items-center justify-center mt-8">
   <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 align-middle">
    <Card icon={Plus} title={"Create a quiz"} handleClick={openModal} />
    {isSpinning && (
     <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center font-primary xs:overflow-y-auto">
      <img src={Spinner} alt="" />
     </div>
    )}
    {isModalOpen && <QuizForm />}
    <Card icon={Play} title={"Start a quiz (Soon!!)"} />
   </div>
  </div>
 );
};

export default Home;
