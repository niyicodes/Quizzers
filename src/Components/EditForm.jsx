import React, { useState } from "react";
import { GiCancel } from "react-icons/gi";
import { useParams } from "react-router-dom";
import FormInput from "./FormInput";
import { toast } from "react-toastify";
import { updateDoc, doc } from "firebase/firestore";
import { dbStore } from "../Firebase/firebase";

const EditForm = ({ setIsQuizFormModalOpen }) => {
 const { id } = useParams();

 const [quizName, setQuizName] = useState("");
 const [description, setDescription] = useState("");
 const [points, setPoints] = useState("");
 const [timeLimit, setTimeLimit] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();

  const data = {
   description,
   points,
   quizName,
   timeLimit,
  };
  if (!(description && points && quizName && timeLimit)) {
   toast.error("Please fill up the necessary input fields", {
    position: toast.POSITION.TOP_RIGHT,
   });
  } else {
   const questions = {};

   try {
    const docRef = doc(dbStore, "quizzes", id);

    await updateDoc(docRef, { ...questions, data });
    closeEditModal();
   } catch (e) {
    console.error("Error Editing document: ", e);
   }
  }
 };

 const closeEditModal = () => {
  setIsQuizFormModalOpen(false);
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
      handleChange={(e) => setQuizName(e.target.value)}
     />
     <FormInput
      label={"Give a brief description"}
      name="description"
      type="text"
      placeholder={"Enter quiz description"}
      value={description}
      handleChange={(e) => setDescription(e.target.value)}
     />
     <FormInput
      label={"Points/Grading System:"}
      name="name"
      type="number"
      placeholder={"Enter point (in number)"}
      value={points}
      handleChange={(e) => setPoints(e.target.value)}
     />
     <FormInput
      label={"Time Limit"}
      name="name"
      type="number"
      placeholder={"Enter Time in minutes"}
      value={timeLimit}
      handleChange={(e) => setTimeLimit(e.target.value)}
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
