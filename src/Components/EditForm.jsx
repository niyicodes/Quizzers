import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addQuestion, editQuestion } from "../Redux/Features/QuizForm/quizform";

const EditForm = ({ setIsQuestionModalOpen, question }) => {
 const [formData, setFormData] = useState(question);
 // const [optionType, setOptionType] = useState("");
 // const [options, setOptions] = useState([]);
 // const [option, setOption] = useState([]);
 // const [numOptions, setNumOptions] = useState(0);
 // const [correctAnswer, setCorrectAnswer] = useState("");
 const handleChange = (e) => {
  setFormData({
   ...formData,
   [e.target.name]: e.target.value,
  });
 };
 const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(editQuestion(formData));
  onSubmit();
 };

 const closeModal = () => {
  setIsQuestionModalOpen(false);
 };

 const dispatch = useDispatch();
 const id = nanoid();

 const ADDQUESTION = () => {
  if (question === "" || options === [] || correctAnswer === "") {
   alert("Please fill up the necessary input fields");
  } else {
   dispatch(addQuestion({ id, question, options, optionType, correctAnswer }));
   closeModal();
  }
 };

 const handleCorrectAnswer = (event) => {
  setCorrectAnswer(event.target.value);
 };

 const handleQuestionChange = (event) => {
  setQuestion(event.target.value);
 };
 const handleOption = (event) => {
  setOption(event.target.value);
 };

 const handleOptionTypeChange = (event) => {
  setOptionType(event.target.value);
  setOptions([]);
 };

 const handleOptionChange = (event, index) => {
  const newOptions = [...options];
  newOptions[index] = event.target.value;
  setOptions(newOptions);
 };

 const handleAddOption = () => {
  if (numOptions < 4) {
   setOptions((prev) => [...prev, option]);
   setNumOptions(numOptions + 1);
   setOption("");
  }
 };

 const handleBooleanOption = () => {
  if (numOptions < 3) {
   setOptions((prev) => [...prev, option]);
   setNumOptions(numOptions + 1);
   setOption("");
  }
 };

 return (
  <main className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center font-primary">
   <div className="bg-white p-8 rounded-xl py-8 h-auto w-3/4">
    <form onSubmit={handleSubmit}>
     <label>
      Question:
      <input
       type="text"
       name="question"
       value={formData.question}
       onChange={handleChange}
      />
     </label>
     <label>
      Options:
      <input
       type="text"
       name="options"
       value={formData.options}
       onChange={handleChange}
      />
     </label>
     <button type="submit">Save</button>
    </form>
   </div>
  </main>
 );
};

export default EditForm;
