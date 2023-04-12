import { configureStore } from "@reduxjs/toolkit";
import QuizFormReducer from "../Features/QuizForm/quizform";
import UserReducer from "../Features/User/user";
import { ref, set } from 'firebase/database'
import { db } from "../../Firebase/firebase";

// Function to save the Redux state to localStorage
const saveStateToLocalStorage = (state) => {
 try {
  const serializedState = JSON.stringify(state);
  localStorage.setItem("reduxState", serializedState);
 } catch (err) {
  console.log(err);
 }
};

// Function to retrieve the Redux state from localStorage
const loadStateFromLocalStorage = () => {
 try {
  const serializedState = localStorage.getItem("reduxState");
  if (serializedState === null) {
   return undefined;
  }
  return JSON.parse(serializedState);
 } catch (err) {
  console.log(err);
  return undefined;
 }
};

const dbRef = ref(db, "/user");

const saveStateToRealtimeDB = (state) => {
 try {
   set(dbRef, state);
 } catch (err) {
   console.log(err);
 }
};

const loadStateFromRealtimeDB = () => {
 try {
   onValue(dbRef, (snapshot) => {
     return snapshot.val();
   });
 } catch (err) {
   console.log(err);
   return undefined;
 }
};



const store = configureStore({
 reducer: {
  quizform: QuizFormReducer,
  user: UserReducer,
 },
 preloadedState: loadStateFromLocalStorage(),
});



// Subscribe to the store and save the state to localStorage whenever it changes
store.subscribe(() => {
 saveStateToLocalStorage(store.getState());
 saveStateToRealtimeDB(store.getState().quizform);
});

export default store;
