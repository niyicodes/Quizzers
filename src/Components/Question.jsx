import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
 editQuestion,
 removeQuestion,
} from "../Redux/Features/QuizForm/quizform";
import EditForm from "./EditForm";

const Question = ({ id, question, options }) => {
 const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

 const dispatch = useDispatch();

 const openModal = () => {
  dispatch(editQuestion({ id, question, options }));
  setIsQuestionModalOpen(true);
 };

 const deleteQuestion = () => {
  console.log(id)
  dispatch(removeQuestion(id));
 };

 // const handleUpdateQuestion = (updatedQuestion) => {
 //  onUpdateQuestion(id, updatedQuestion);
 //  setIsQuestionModalOpen(false);
 // };

 return (
  <div className="flex justify-between items-center py-2 px-4 my-2 font-primary bg-slate-400 rounded-xl">
   <p className="text-gray-600 text-lg font-normal">{question}</p>
   <div className="icons flex gap-4 text-xl">
    <FaEdit className="edit-icon" onClick={openModal} />
    {isQuestionModalOpen && (
     <EditForm
      setIsQuestionModalOpen={setIsQuestionModalOpen}
      // onUpdateQuestion={handleUpdateQuestion}
     />
    )}
    <RiDeleteBin5Line className="edit-icon" onClick={deleteQuestion} />
   </div>
  </div>
 );
};

export default Question;
