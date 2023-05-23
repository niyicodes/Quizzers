import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import {
	removeQuestion
} from '../Redux/Features/QuizForm/quizform';
import {
	doc,
	updateDoc,
	arrayRemove, onSnapshot
} from 'firebase/firestore';
import { dbStore } from '../Firebase/firebase';

const Question = ({ id, fullQuestion, question, options }) => {

	const dispatch = useDispatch();

	const deleteQuestion = async () => {
		toast.warning("Question deleted!",{
		 position: toast.POSITION.TOP_RIGHT
		})
		dispatch(removeQuestion(id));
		const questionRef = doc(dbStore, 'quizzes', id);

		await updateDoc(questionRef, {
			questions: arrayRemove(fullQuestion),
		})
	};

	

	return (
		<div className='flex justify-between items-center py-2 px-4 my-2 font-primary bg-slate-400 rounded-xl'>
			<p className='text-gray-600 text-lg font-normal'>{question}</p>
			<div className='icons flex gap-4 text-xl'>
				<RiDeleteBin5Line className='edit-icon' onClick={deleteQuestion} />
			</div>
		</div>
	);
};

export default Question;
