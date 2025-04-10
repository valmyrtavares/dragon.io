import { app, storage } from '../config/firebase.js';
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
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

export async function deleteDataFromCollection(collectionName, id) {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
  return `Document with ID ${id} deleted successfully from collection ${collectionName}.`;
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

export async function syncProductIdsWithCustomers(productIds) {
  const collectionName = 'customer';
  const customers = await getListData(collectionName);

  for (const customer of customers) {
    if (JSON.stringify(customer.productIds) !== JSON.stringify(productIds)) {
      await updateDataInCollection(collectionName, customer.id, { productIds });
    }
  }

  return `Customer productIds synchronized successfully.`;
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

export const sendEmail = async (toEmail, id) => {
  try {
    await addDoc(collection(db, 'mail'), {
      to: toEmail,
      message: {
        subject: 'Confirmação do produto no site Dragon Computadores',
        text: `O seu produto foi confirmado e está disponível no site Dragon Computadores. O ID do produto é ${id}.`,
      },
    });

    console.log('Email adicionado à fila com sucesso!');
  } catch (error) {
    console.error('Erro ao adicionar email na fila:', error);
  }
};
