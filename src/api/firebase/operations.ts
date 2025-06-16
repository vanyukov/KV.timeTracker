import { collection, addDoc, getDocs, deleteDoc, updateDoc, query, where } from "firebase/firestore";
import { database } from "./database";

export var fsSet = async (path: string, value: Record<string, any>) => {
  try {
    // Если передан объект с id, то удаляем его, так как в Firestore id хранится на уровне коллекции и не должен быть частью данных документа.
    if (value?.id) {
      value = {
        ...value,
      };
      delete value.id;
    }

    const res = await addDoc(collection(database, path), value);
    return { ...value, id: res.id };
  } catch (e) {
    console.error("Ошибка добавления: ", e);
    return value;
  }
};

export var fsGet = async (path: string, id: string) => {
  try {
    const querySnapshot = await getDocs(collection(database, path));
    const data = querySnapshot.docs.find(doc => doc.id === id);
    return { id: data?.id, ...data?.data() };
  } catch (error) {
    console.error(error);
    return {};
  }
};

export var fsDelete = async (path: string, id: string) => {
  try {
    const docRef = collection(database, path);
    const docSnapshot = await getDocs(docRef);
    const docToDelete = docSnapshot.docs.find(doc => doc.id === id);
    if (docToDelete) {
      await deleteDoc(docToDelete.ref);
    } else {
      console.error("Document not found: ", id);
    }
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

export var fsUpdate = async (path: string, id: string, value: Record<string, any>) => {
  try {
    // Если передан объект с id, то удаляем его, так как в Firestore id хранится на уровне коллекции и не должен быть частью данных документа.
    if (value?.id) {
      value = {
        ...value,
      };
      delete value.id;
    }

    const docRef = collection(database, path);
    const docSnapshot = await getDocs(docRef);
    const docToUpdate = docSnapshot.docs.find(doc => doc.id === id);
    if (docToUpdate) {
      await updateDoc(docToUpdate.ref, value);
    } else {
      console.error("Document not found");
    }
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export var fsGetAll = async (path: string, dateStart?: string, dateEnd?: string) => {
  const colRef = collection(database, path);
  let q;
  if (dateStart && dateEnd) {
    q = query(colRef, where("date", ">=", dateStart), where("date", "<=", dateEnd));
  } else if (dateStart) {
    q = query(colRef, where("date", ">=", dateStart));
  } else if (dateEnd) {
    q = query(colRef, where("date", "<=", dateEnd));
  }

  const snapshot = await getDocs(q ?? colRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export var fsGetAllByField = async (path: string, field: string, value: unknown) => {
  try {
    const querySnapshot = await getDocs(collection(database, path));
    const data = querySnapshot.docs
      .map(doc => {
        const x: Record<string, any> = { id: doc.id, ...doc.data() };
        return x;
      })
      .filter(doc => doc[field] === value);
    return data;
  } catch (error) {
    console.error("Error getting documents by field: ", error);
    return [];
  }
};
