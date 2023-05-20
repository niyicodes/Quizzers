import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../../../Firebase/firebase';

const initialState = {
	quizName: '',
	description: '',
	points: '',
	timeLimit: '',
	questions: [],
};

const quizFormSlice = createSlice({
	name: 'quizform',
	initialState,
	reducers: {
		setQuizName: (state, action) => {
			state.quizName = action.payload;
		},
		setDescription: (state, action) => {
			state.description = action.payload;
		},
		setPoints: (state, action) => {
			state.points = action.payload;
		},
		setTimeLimit: (state, action) => {
			state.timeLimit = action.payload;
		},
		updateQuizName: (state, action) => {
			state.quizName = action.payload;
		},
		updateDescription: (state, action) => {
			state.description = action.payload;
		},
		addQuestion: (state, action) => {
			state.questions.push(action.payload);
		},
		removeQuestion: (state, action) => {
			const questionId = action.payload;
			state.questions = state.questions.filter(
				(question) => question.id !== questionId
			);
		},
		editQuestion: (state, action) => {
			const { id, question, options } = action.payload;
			const questionIndex = state.questions.findIndex((q) => q.id === id);
			if (questionIndex !== -1) {
				state.questions[questionIndex] = {
					id,
					question,
					options,
				};
			}
		},
	},
});

export const {
	setQuizName,
	setDescription,
	setPoints,
	setTimeLimit,
	updateQuizName,
	updateDescription,
	addQuestion,
	removeQuestion,
	editQuestion,
} = quizFormSlice.actions;

export default quizFormSlice.reducer;
