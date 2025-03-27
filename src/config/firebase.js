import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAkiymbxr2eTiM0DGSUmIkI2bqT3jBt1zs',
  authDomain: 'dragon-computers.firebaseapp.com',
  projectId: 'dragon-computers',
  storageBucket: 'dragon-computers.firebasestorage.app',
  messagingSenderId: '439889480116',
  appId: '1:439889480116:web:4e288f14e42526cf390ae1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, storage };
