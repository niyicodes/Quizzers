import { IoIosCloseCircleOutline } from 'react-icons/io';
import React, { useEffect, useState } from 'react';
import QuestionCard from './QuestionCard';

const AnswerQuiz = ({ setIsAnswerModalOpen, quiz, questions }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [Quiz, setQuiz] = useState(questions);
	const [score, setScore] = useState(0);
	const [showAnswer, setShowAnswer] = useState(false);

	const handleAnswer = (answer) => {
		if (!showAnswer) {
			if (answer === Quiz[currentIndex].correctAnswer) {
				setScore(score + quiz.points);
			}
		}
		setShowAnswer(!false);
	};

	const handleNextQuestion = () => {
		setCurrentIndex(currentIndex + 1);
		setShowAnswer(false);
	};

	const closeQuiz = () => {
		setIsAnswerModalOpen(false);
	};
	// Handling the countdown
	const initialTime = quiz.timeLimit;
	const [remainingTime, setRemainingTime] = useState(initialTime * 60 * 1000);
	const [countingDown, setCountingDown] = useState(true);

	useEffect(() => {
		let timeoutId;
		if (countingDown && remainingTime > 0) {
			timeoutId = setTimeout(() => {
				setRemainingTime((prevRemainingTime) => prevRemainingTime - 1000);
			}, 1000);
		} else if (countingDown && remainingTime === 0) {
			setCountingDown(false);
		}
		return () => clearTimeout(timeoutId);
	}, [countingDown, remainingTime]);

	function handleStopCountdown() {
		setCountingDown(false);
	}

	function formatTime(time) {
		const minutes = Math.floor((time / 1000 / 60) % 60);
		const seconds = Math.floor((time / 1000) % 60);
		return `${minutes.toString().padStart(2, '0')}:${seconds
			.toString()
			.padStart(2, '0')}`;
	}

	return (
		<main className='fixed inset-0 bg-black bg-opacity-95 flex justify-center items-center font-primary xs:overflow-y-auto'>
			<section className='bg-white p-8 rounded-xl py-8 h-auto xs:w-full xs:mx-3 md:w-3/4'>
				<IoIosCloseCircleOutline
					className='mb-5 w-24 h-12 hover:cursor-pointer'
					onClick={closeQuiz}
				/>
				{Quiz.length > 0 && (
					<div className=' '>
						{currentIndex >= Quiz.length ? (
							<p className='flex justify-center text-3xl font-bold'>
								Game Ended, Your score is {score}
							</p>
						) : countingDown && remainingTime > 0 ? (
							<>
								<div className='flex flex-row justify-between text-center text-white'>
									<div className='bg-contessa-500 p-4'>
										<p>Question</p>
										<h4>
											{currentIndex + 1}/{Quiz.length}
										</h4>
									</div>
									<div className='bg-contessa-500 p-4'>
										<p>Remaining Time: {formatTime(remainingTime)}</p>
									</div>
								</div>
								<div className='my-4'>
									<QuestionCard
										handleAnswer={handleAnswer}
										handleNextQuestion={handleNextQuestion}
										data={Quiz[currentIndex]}
										showAnswer={showAnswer}
									/>
								</div>
							</>
						) : (
							<div>
								<p className='flex justify-center text-3xl font-bold'>
									Time's up! Your score is {score}
								</p>
							</div>
						)}
					</div>
				)}
			</section>
		</main>
	);
};

export default AnswerQuiz;
