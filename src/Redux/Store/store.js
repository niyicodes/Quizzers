import { configureStore } from "@reduxjs/toolkit";
import QuizFormReducer from "../Features/QuizForm/quizform";
import UserReducer from "../Features/User/user";




const store = configureStore({
 reducer: {
  quizform: QuizFormReducer,
  user: UserReducer,
 }
});


export default store;
