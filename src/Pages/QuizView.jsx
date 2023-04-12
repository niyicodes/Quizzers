import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import Image from "../images/image.jpg";
import Question from "../Components/Question";
import QuestionForm from "../Components/QuestionForm";
import AnswerQuiz from "./AnswerQuiz";


const QuizView = () => {
 const dispatch = useDispatch();
 const quiz = useSelector((state) => state.quizform);
 const questions = useSelector((state) => state.quizform.questions);

 const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
 const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);

 const openModal = () => {
  setIsQuestionModalOpen(true);
 };
 const AnswerModal = () => {
  setIsAnswerModalOpen(true);
 };

 const closeModal = () => {
  setIsQuestionModalOpen(false);
 };

 return (
  <main className="lg:mx-8 xs:mx-4 mt-28 font-primary">
   <section className="flex xs:grid xs:grid-cols-1 xs:gap-4 lg:flex-row justify-between items-center mx-auto p-4 border-4 border-contessa-500 rounded-2xl">
    <div className="flex xs:justify-between gap-4 items-center">
     <figure className="xs:hidden md:block xs:w-2/4 lg:w-56 lg:h-56">
      <img
       src={Image}
       alt=""
       className="lg:h-full object-cover xs:object-contain"
      />
     </figure>
     <div>
      <ul className="ul">
       <li className="li">
        <FaEdit className="edit-icon" />{" "}
        <h3 className="font-bold text-contessa-700">{quiz.quizName}</h3>
       </li>
       <li className="li">
        <FaEdit className="edit-icon" />{" "}
        <h3 className="font-bold text-contessa-700">{quiz.description}</h3>
       </li>
       <li className="li">
        <FaEdit className="edit-icon" />{" "}
        <h3 className="font-bold text-contessa-700">{quiz.points}</h3>
       </li>
       <li className="li">
        <h3 className="font-bold text-contessa-700">
         {quiz.questions.length} Total Questions
        </h3>
       </li>
      </ul>
     </div>
    </div>
    <div>
     <ul className="ul">
      <li className="li">
       <FaEdit className="edit-icon" />{" "}
       <h3 className="font-bold text-contessa-700">Category</h3>
      </li>
      <li className="li">
       <FaEdit className="edit-icon" />{" "}
       <h3 className="font-bold text-contessa-700">Difficulty</h3>
      </li>
      <li className="li">
       <FaEdit className="edit-icon" />{" "}
       <h3 className="font-bold text-contessa-700">{quiz.timeLimit}</h3>
      </li>
     </ul>
    </div>
   </section>
   <div className="my-8">
    <button className="border-2 bg-waikawa-gray-500 px-12 py-2 rounded-full text-lg text-white font-bold" onClick={AnswerModal}>
     Play
    </button>
    {isAnswerModalOpen && (
     <AnswerQuiz setIsAnswerModalOpen={setIsAnswerModalOpen} />
    )}
   </div>
   <section className="rounded-2xl border p-4 mb-8">
    <h3 className="text-2xl font-bold">set up your questions</h3>
    <div>
     {questions.map((item, index) => {
      return <Question key={index} question={item.question} id={item.id} />;
     })}
    </div>
    <button
     className="flex mx-auto rounded-full border-2 px-16 py-3 my-7 text-white bg-gradient-to-r from-contessa-400 via-gray-500 to-waikawa-gray-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium text-xl text-center"
     onClick={openModal}
    >
     Add Question
    </button>
    {isQuestionModalOpen && (
     <QuestionForm setIsQuestionModalOpen={setIsQuestionModalOpen} />
    )}
   </section>
  </main>
 );
};

export default QuizView;
