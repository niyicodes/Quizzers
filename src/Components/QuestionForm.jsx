import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion } from "../Redux/Features/QuizForm/quizform";
import Spinner from "../speedometer.gif"

const QuestionForm = ({ setIsQuestionModalOpen }) => {
 const [question, setQuestion] = useState("");
 const [optionType, setOptionType] = useState("");
 const [options, setOptions] = useState([]);
 const [option, setOption] = useState([]);
 const [numOptions, setNumOptions] = useState(0);
 const [correctAnswer, setCorrectAnswer] = useState("");
 const [isSpinning, setIsSpinning] = useState(false);

 const quizForm = useSelector((state) => state.quizForm);

 const closeModal = () => {
  setIsQuestionModalOpen(false);
 };

 const dispatch = useDispatch();
 const id = nanoid();

 const ADDQUESTION = () => {
  if (question === "" || options === [] || correctAnswer === "") {
   alert("Please fill up the necessary input fields");
  } else {
   setIsSpinning(true);
   setTimeout(() => {
    setIsSpinning(true);
    closeModal();
    dispatch(addQuestion({ id, question, options, optionType, correctAnswer }));
   }, 600);
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

 let optionsInput;

 if (optionType === "boolean") {
  optionsInput = (
   <div>
    <p className="questionFormParagraph">
     Please select the correct answer before submitting
    </p>
    <input
     type="text"
     name=""
     id=""
     className="questionFormInput"
     value={option}
     onChange={handleOption}
    />
    <button
     type="button"
     onClick={handleBooleanOption}
     className="questionFormButton"
    >
     Add Option
    </button>
    {options.map((option, index) => {
     return (
      <label className="questionLabel" key={index}>
       <input
        type="radio"
        name="option"
        value={option}
        checked={option === correctAnswer}
        onChange={handleCorrectAnswer}
        className="questionRadio"
       />
       {option}
      </label>
     );
    })}
   </div>
  );
 } else if (optionType === "multiple_choice") {
  optionsInput = (
   <div>
    <p className="questionFormParagraph">
     Please select the correct answer before submitting
    </p>
    <input
     type="text"
     name=""
     id=""
     className="questionFormInput"
     value={option}
     onChange={handleOption}
    />
    <button
     type="button"
     onClick={handleAddOption}
     className="questionFormButton"
    >
     Add Option
    </button>
    {options.map((option, index) => {
     return (
      <label className="questionLabel" key={index}>
       <input
        type="radio"
        name="option"
        value={option}
        checked={option === correctAnswer}
        onChange={handleCorrectAnswer}
        className="questionRadio"
       />
       {option}
      </label>
     );
    })}
   </div>
  );
 }

 return (
  <main className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center font-primary xs:overflow-y-auto">
   <div className="bg-white p-8 rounded-xl py-8 h-auto mx-auto md:w-3/4 xs:mx-3">
    <div className="flex justify-between items-center">
     <h3 className="lg:text-5xl xs:text-4xl pb-4 font-bold">Question</h3>
     <p
      onClick={closeModal}
      className="md:text-2xl xs:text-sm border-2 py-3 px-4 xs:p-2 rounded-3xl hover:cursor-pointer"
     >
      Close Form
     </p>
    </div>
    <section className="flex flex-col my-4 gap-5">
     <label htmlFor="question" className="text-2xl font-semibold">
      Enter Question
     </label>
     <input
      type="text"
      name="question"
      id="question"
      className="questionInput"
      value={question}
      onChange={handleQuestionChange}
     />
    </section>
    <section className="optiontype lg:mt-8 xs:mt-4">
     <fieldset className="fieldset">
      <legend className="legend">Select Option Type:</legend>
      <label className="flex gap-3 xs:text-xl lg:text-2xl">
       <input
        type="radio"
        name="optionType"
        value="boolean"
        checked={optionType === "boolean"}
        onChange={handleOptionTypeChange}
        onClick={handleAddOption}
        className="w-8 h-8"
       />
       Boolean (Yes/No)
      </label>
      <label className="flex gap-3 xs:text-xl lg:text-2xl">
       <input
        type="radio"
        name="optionType"
        value="multiple_choice"
        checked={optionType === "multiple_choice"}
        onChange={handleOptionTypeChange}
        className="w-8 h-8"
       />
       Multiple Choice
      </label>
     </fieldset>
    </section>
    <section className="mt-8">
     {optionsInput}
     <button
      type="submit"
      className="flex mx-auto border-2 rounded-full py-4 px-24 mt-8"
      onClick={ADDQUESTION}
     >
      Submit
     </button>
    </section>
    {isSpinning && (
    <div className="fixed inset-0 bg-black bg-opacity-100 flex justify-center items-center font-primary xs:overflow-y-auto">
     <img src={Spinner} alt="" />
    </div>
   )}
   </div>
  </main>
 );
};

export default QuestionForm;
