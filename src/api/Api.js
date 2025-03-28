import { app, storage } from '../config/firebase.js';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

//FIRESTORE
const db = getFirestore(app);

//Bringing collection and tranform in array
export async function getListData(collectionName) {
  const docRef = collection(db, collectionName);
  const docSnap = await getDocs(docRef);
  let array = [];
  docSnap.forEach((doc) => {
    array.push({ ...doc.data(), id: doc.id });
  });
  return array;
}

export async function addDataToCollection(collectionName, data) {
  const docRef = collection(db, collectionName);
  const docSnap = await addDoc(docRef, data);
  return docSnap.id;
}

export async function updateDataInCollection(collectionName, id, newData) {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, newData);
  return `Document with ID ${id} updated successfully.`;
}

export async function getDataById(collectionName, id) {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { ...docSnap.data(), id: docSnap.id };
  } else {
    throw new Error(
      `No document found with ID ${id} in collection ${collectionName}`
    );
  }
}

export async function getDataByField(collectionName, fieldName, value) {
  const docRef = collection(db, collectionName);
  const docSnap = await getDocs(docRef);
  let result = null;

  docSnap.forEach((doc) => {
    if (doc.data()[fieldName] === value) {
      result = { ...doc.data(), id: doc.id };
    }
  });

  if (result) {
    return result;
  } else {
    throw new Error(
      `No document found in collection ${collectionName} with ${fieldName} equal to ${value}`
    );
  }
}

export async function updateObjectBySpecificKey(
  collectionName,
  key,
  value,
  newObject
) {
  const docRef = collection(db, collectionName);
  const docSnap = await getDocs(docRef);
  let docId = null;

  docSnap.forEach((doc) => {
    if (doc.data()[key] === value) {
      docId = doc.id;
    }
  });

  if (docId) {
    const docToUpdate = doc(db, collectionName, docId);
    await updateDoc(docToUpdate, newObject);
    return `Document with ${key} equal to ${value} updated successfully.`;
  } else {
    throw new Error(
      `No document found in collection ${collectionName} with ${key} equal to ${value}`
    );
  }
}

export const uploadImage = (file, setProgress, setUrl, setForm) => {
  return new Promise((resolve, reject) => {
    if (!file) return reject('Nenhum arquivo selecionado.');

    const path = `dishes/${file.name}`;
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error(error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUrl(downloadURL);
          setForm((prev) => ({
            ...prev,
            images: [...(prev.images || []), downloadURL], // Adiciona a URL ao array images
          }));
          resolve(downloadURL);
        } catch (err) {
          reject(err);
        }
      }
    );
  });
};
