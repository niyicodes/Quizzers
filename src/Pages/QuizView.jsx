import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { BiTimer, BiPlus, BiPlay, BiShare } from 'react-icons/bi';
import { TbVariablePlus } from 'react-icons/tb';
import Image from '../images/image.jpg';
import Question from '../Components/Question';
import QuestionForm from '../Components/QuestionForm';
import AnswerQuiz from './AnswerQuiz';
import { toast } from 'react-toastify';
import EditForm from '../Components/EditForm';
import { useNavigate } from 'react-router-dom';
import {getDoc, doc } from 'firebase/firestore';
import { dbStore } from '../Firebase/firebase';

const QuizView = () => {
	const { id } = useParams();
	const navigate = useNavigate()

	const [quiz, setQuiz] = useState({});
	const [questions, setQuestions] = useState([]);
	const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
	const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);
	const [isQuizFormModalOpen, setIsQuizFormModalOpen] = useState(false);

	const fetchQuizzes = async () => {
		const docRef = doc(dbStore, 'quizzes', id);

		try {
			const docSnap = await getDoc(docRef);
			setQuiz(docSnap.data().data);
			setQuestions(docSnap.data().questions);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchQuizzes();
	}, [questions]);

	const openModal = () => {
		setIsQuestionModalOpen(true);
	};
	const AnswerModal = () => {
		if (!questions) {
			toast.error('Please add a question before attempting Quiz!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		} else {
			toast.success('Attempting Quiz', {
				position: toast.POSITION.TOP_RIGHT,
			});
			// setIsAnswerModalOpen(true);
			navigate(`/answerquiz/${id}`)
		}
	};

	const openQuizFormModal = () => {
		toast.warning('Editing Quiz details', {
			position: toast.POSITION.TOP_RIGHT,
		});
		setIsQuizFormModalOpen(true);
	};


	return (
		<main className='lg:mx-8 xs:mx-4 mt-28 font-primary'>
			{/* Quiz details section */}
			<section className='flex md:flex-row xs:flex-col xs:gap-8 md:justify-between border-b-4 pb-5 md:pt-8'>
				<div className='flex xs:flex-col md:flex-row gap-8 md:items-center'>
					<figure className='md:w-1/3'>
						<img src={Image} alt='' />
					</figure>
					<div className='flex flex-col gap-2'>
						<h3 className='text-4xl font-semibold'>{quiz.quizName}</h3>
						<p className='w-4/5 text-xl'>{quiz.description}</p>
						<p className='w-4/5 text-xl'>
							<span className='text-contessa-800 font-bold'>
								{questions?.length || 0}
							</span>{' '}
							Question(s)
						</p>
						<div className='time/points flex flex-row gap-12'>
							<div className='flex flex-row items-center gap-2'>
								<div className=' bg-waikawa-gray-300 xs:p-2 p-3 rounded-lg'>
									<BiTimer className='xs:text-xl md:text-2xl xl:text-3xl text-waikawa-gray-900' />
								</div>
								<div>
									<small className='text-slate-500 font-medium'>
										Time Limit
									</small>
									<h4 className='text-black font-bold'>{quiz.timeLimit}mins</h4>
								</div>
							</div>
							<div className='flex flex-row items-center gap-2'>
								<div className=' bg-waikawa-gray-300 xs:p-2 xl:p-3 rounded-lg'>
									<TbVariablePlus className='xs:text-xl md:text-2xl xl:text-3xl text-waikawa-gray-900' />
								</div>
								<div>
									<small className='text-slate-500 font-medium'>
										Points per correct answer
									</small>
									<h4 className='text-black font-bold'>{quiz.points}marks</h4>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<button
						className='bg-contessa-500 text-white flex items-center gap-1 xs:px-5 xl:px-6 xs:py-3 xl:py-2 rounded-lg'
						onClick={openQuizFormModal}
					>
						<FaEdit /> Edit Form
					</button>
					{isQuizFormModalOpen && (
						<EditForm setIsQuizFormModalOpen={setIsQuizFormModalOpen} />
					)}
				</div>
			</section>
			{/* set up question section */}
			<section className='setup mt-8'>
				<div className='flex md:flex-row xs:flex-col xs:gap-4 justify-between items-center'>
					<div>
						<h3 className='text-3xl font-bold'>Set Questions</h3>
					</div>
					<div className='flex items-center'>
						<button className='add' onClick={openModal}>
							<BiPlus className='w-5 h-5 mr-2 -ml-1' /> Add Question
						</button>
						<button className='play' onClick={AnswerModal}>
							<BiPlay className='w-5 h-5 mr-2 -ml-1' /> Play Quiz
						</button>
						<button className='share' disabled>
							<BiShare className='w-5 h-5 mr-2 -ml-1' />
							Share Quiz
						</button>
						{isQuestionModalOpen && (
							<QuestionForm setIsQuestionModalOpen={setIsQuestionModalOpen} />
						)}
						{/* {isAnswerModalOpen && (
							<AnswerQuiz
								questions={questions}
								quiz={quiz}
								setIsAnswerModalOpen={setIsAnswerModalOpen}
							/>
						)} */}
					</div>
				</div>
				<div className='questions bordeer-2 mt-12'>
					{questions?.length > 0 ? (
						questions.map((item, index) => {
							return (
								<Question
									key={index}
									fullQuestion={item}
									question={item.question}
									id={id}
								/>
							);
						})
					) : (
						<div className='flex justify-center items-center text-3xl text-bold'>
							<p>Please add questions</p>
						</div>
					)}
				</div>
			</section>
		</main>
	);
};

export default QuizView;
