import React, { useEffect, useState } from "react";
import QuestionCard from "../Components/QuestionCard";
import { getDoc, doc } from "firebase/firestore";
import { dbStore } from "../Firebase/firebase";
import { useParams } from "react-router-dom";

const AnswerQuizPage = () => {

 const [currentIndex, setCurrentIndex] = useState(0);
 const [quiz, setQuiz] = useState({});
 const [questions, setQuestions] = useState([]);
 const [score, setScore] = useState(0);
 const [showAnswer, setShowAnswer] = useState(false);

 const { id } = useParams();

 const handleNextQuestion = () => {
  setCurrentIndex(currentIndex + 1);
  setShowAnswer(false);
 };

 const fetchQuizzes = async () => {
  const docRef = doc(dbStore, "quizzes", id);

  try {
   const docSnap = await getDoc(docRef);
   setQuiz(docSnap.data().data);
   setQuestions(docSnap.data().questions);
  } catch (error) {
   console.log(error);
  }
 };

 const handleAnswer = (answer) => {
  if (!showAnswer) {
   if (answer === questions[currentIndex].correctAnswer) {
    setScore(score + quiz.points);
   }
  }
  setShowAnswer(!false);
 };

 useEffect(() => {
  fetchQuizzes();
 }, [id]);

 // // Handling the countdown
 const [remainingTime, setRemainingTime] = useState(0);
 const [countingDown, setCountingDown] = useState(false);

 useEffect(() => {
  if (quiz.timeLimit) {
   const initialTime = Number(quiz.timeLimit);
   setRemainingTime(initialTime * 60 * 1000);
   setCountingDown(true);
  }
 }, [quiz.timeLimit]);

 useEffect(() => {
  let timeoutId;
  if (countingDown && remainingTime > 0) {
   timeoutId = setTimeout(() => {
    setRemainingTime((prevRemainingTime) => prevRemainingTime - 1000);
   }, 1000);
  } else if (countingDown && remainingTime <= 0) {
   setCountingDown(false);
  }
  return () => clearTimeout(timeoutId);
 }, [countingDown, remainingTime]);

 function formatTime(time) {
  const minutes = Math.floor((time / 1000 / 60) % 60);
  const seconds = Math.floor((time / 1000) % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
   .toString()
   .padStart(2, "0")}`;
 }

 return (
  <main className="fixed inset-0 bg-black bg-opacity-95 flex justify-center items-center font-primary xs:overflow-y-auto">
   <section className="bg-white p-8 rounded-xl py-8 h-auto xs:w-full xs:mx-3 md:w-3/4">
    {questions.length > 0 && (
     <div className=" ">
      {currentIndex >= questions.length ? (
       <p className="flex justify-center text-3xl font-bold">
        Game Ended, You scored {score} points
       </p>
      ) : remainingTime === 0 ? (
       <div>
        <p className="flex justify-center text-3xl font-bold">
         Time's up! You scored {score} points
        </p>
       </div>
      ) : (
       <>
        <div className="flex flex-row justify-between text-center text-white">
         <div className="bg-contessa-500 p-4">
          <p>Question</p>
          <h4>
           {currentIndex + 1}/{questions.length}
          </h4>
         </div>
         <div className="bg-contessa-500 p-4">
          <p>Remaining Time: {formatTime(remainingTime)}</p>
         </div>
        </div>
        <div className="my-4">
         <QuestionCard
          handleAnswer={handleAnswer}
          handleNextQuestion={handleNextQuestion}
          data={questions[currentIndex]}
          showAnswer={showAnswer}
         />
        </div>
       </>
      )}
     </div>
    )}
   </section>
  </main>
 );
};

export default AnswerQuizPage;
