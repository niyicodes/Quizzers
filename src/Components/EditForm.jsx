import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
 setQuizName,
 setDescription,
 setPoints,
 setTimeLimit,
} from "../Redux/Features/QuizForm/quizform";
import FormInput from "./FormInput";
import { toast } from "react-toastify";

const EditForm = ({setIsQuizFormModalOpen}) => {
 const navigate = useNavigate();
 const dispatch = useDispatch();

 // const quizForm = useSelector((state) => state.quizForm);

 const quizName = useSelector((state) => state.quizform.quizName);
 const description = useSelector((state) => state.quizform.description);
 const points = useSelector((state) => state.quizform.points);
 const timeLimit = useSelector((state) => state.quizform.timeLimit);

 const handleQuizNameChange = (event) => {
  dispatch(setQuizName(event.target.value));
  localStorage.setItem("quizName", JSON.stringify(event.target.value));
 };

 const handleDescriptionChange = (event) => {
  dispatch(setDescription(event.target.value));
  localStorage.setItem("description", JSON.stringify(event.target.value));
 };

 const handlePointsChange = (event) => {
  dispatch(setPoints(Number(event.target.value)));
  localStorage.setItem("points", JSON.stringify(event.target.value));
 };

 const handleTimeLimitChange = (event) => {
  dispatch(setTimeLimit(Number(event.target.value)));
  localStorage.setItem("timeLimit", JSON.stringify(event.target.value));
 };

 const handleSubmit = (e) => {
  e.preventDefault();

  if (
   quizName === "" ||
   points === "" ||
   description === "" ||
   timeLimit === ""
  ) {
   toast.error("Please fill the input fields", {
    position: toast.POSITION.TOP_RIGHT,
   });
  } else {
   navigate("/quizview");
   toast.success("Finished Editing", {
    position: toast.POSITION.TOP_RIGHT,
   });
   setIsQuizFormModalOpen(false)
  }
 };

 const closeEditModal = () => {
  setIsQuizFormModalOpen(false)
 };

 return (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center font-primary">
   <div>
    <GiCancel
     className="text-white text-3xl absolute right-4 top-4 hover:cursor-pointer"
     onClick={closeEditModal}
    />
   </div>
   <div className="bg-white p-4 rounded-xl py-8 h-auto xs:w-full xs:mx-3 md:w-3/4 xs:overflow-y-auto">
    <form className="overflow-y-scroll" onSubmit={handleSubmit}>
     <h2 className="mb-8 text-center text-3xl">Edit Quiz Info</h2>
     <FormInput
      label={"Let's give your quiz a name"}
      name="name"
      type="text"
      placeholder={"Enter the quiz name"}
      value={quizName}
      handleChange={handleQuizNameChange}
     />
     <FormInput
      label={"Give a brief description"}
      name="description"
      type="text"
      placeholder={"Enter quiz description"}
      value={description}
      handleChange={handleDescriptionChange}
     />
     <FormInput
      label={"Points/Grading System:"}
      name="name"
      type="number"
      placeholder={"Enter point (in number)"}
      value={points}
      handleChange={handlePointsChange}
     />
     <FormInput
      label={"Time Limit"}
      name="name"
      type="number"
      placeholder={"Enter Time in minutes"}
      value={timeLimit}
      handleChange={handleTimeLimitChange}
     />
     <input
      type="submit"
      value="Finish Editing"
      className="flex flex-row justify-center items-center border-2 px-4 py-2 bg-contessa-700 xs:w-3/4 md:w-2/4 mx-auto mt-4 text-2xl text-white font-bold rounded-2xl hover:cursor-pointer"
     />
    </form>
   </div>
  </div>
 );
};

export default EditForm;
