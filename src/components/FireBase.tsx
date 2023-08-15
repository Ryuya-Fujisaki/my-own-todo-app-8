import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from "firebase/firestore";

// firebaseConfigの環境変数
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
}

// アプリでFirebaseを初期化してFirebaseアプリオブジェクトを作成
const app = initializeApp(firebaseConfig)

// Cloud Firestore を初期化し、データベースファンクションを取得し、エクスポート
export const db = getFirestore(app)

export const addTodoToFirestore = async (title: string) => {
    try {
        const todoCollection = collection(db, 'todo'); // 正しいコレクション名を指定
        await addDoc(todoCollection, { title });
    } catch (error) {
        console.error('Error adding todo:', error);
    }
};