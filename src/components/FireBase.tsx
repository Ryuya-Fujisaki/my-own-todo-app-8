import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCoqPSpMkOcaepiFVhum3iIwN_sqh2yAXA",
    authDomain: "fir-todo-a89e6.firebaseapp.com",
    projectId: "fir-todo-a89e6",
    storageBucket: "fir-todo-a89e6.appspot.com",
    messagingSenderId: "328076594397",
    appId: "1:328076594397:web:0ee801d0cf079ca7735f34"
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

export const addTodoToFirestore = async (title: string) => {
    try {
        const todoCollection = collection(db, 'todo'); // 正しいコレクション名を指定
        await addDoc(todoCollection, { title });
    } catch (error) {
        console.error('Error adding todo:', error);
    }
};