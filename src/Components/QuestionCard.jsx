import React from "react";

const QuestionCard = ({
 data: { question, options, correctAnswer },
 handleAnswer,
 index,
 handleNextQuestion,
 showAnswer,
}) => {
 return (
  <section className="xs:w-full">
   <div>
    <p className="lg:text-4xl xs:text-2xl xs:text-center p-3 bg-waikawa-gray-500 rounded-3xl my-2 text-white font-medium">
     {question}
    </p>
    <ul className="md:grid md:grid-cols-2 gap-6 my-4 xs:flex xs:flex-col">
     {options.map((option, idx) => {
      const specialClassName = showAnswer
       ? option === correctAnswer
         ? "bg-green-900"
         : "bg-red-900" : "bg-waikawa-gray-800"
      return (
        
        <button
         key={idx}
         className={`py-4 rounded-full text-white text-2xl xs:text-left md:text-center xs:pl-4 ${specialClassName}`}
         onClick={() => handleAnswer(option)}
         dangerouslySetInnerHTML={{ __html: option }}
        />
       
      );
     })}
    </ul>
   </div>
   {showAnswer && <button onClick={handleNextQuestion} className="border-2 rounded-2xl py-3 px-8 hover:cursor-pointer">Next</button>}
  </section>
 );
};

export default QuestionCard;
