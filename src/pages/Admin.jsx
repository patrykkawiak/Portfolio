import { useDispatch, useSelector } from "react-redux";
import { Link, useLoaderData } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { useEffect, useState } from "react";
import { formSliceActions } from "../redux/form-slice";

const Admin = () => {
  const data = useLoaderData();
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(formSliceActions.replace(data));
    }
  }, [data]);

  const messages = useSelector((state) => state.form.messages);

  const removeMsg = async (id) => {
    dispatch(formSliceActions.deleteMsg(id));
    let docID;
    const q = query(collection(db, "messages"), where("id", "==", id));
    const itemToDelete = await getDocs(q);
    itemToDelete.forEach((doc) => {
      docID = doc.id;
    });
    await deleteDoc(doc(db, "messages", docID));
  };

  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="flex gap-8 flex-wrap justify-center">
        {messages.map((el) => (
          <div
            key={el.id}
            className="relative rounded-3xl border-yellow-600 border-2 w-max flex flex-col gap-4 text-2xl items-center p-8"
          >
            <p className="text-3xl uppercase">{el.title}</p>
            <p className="bg-yellow-600 py-2 px-4 rounded-full">
              <i class="bx bxs-user "></i> {el.name}
            </p>
            <p className="flex flex-col gap-4 items-center">
              <span>Message:</span>
              <p className="p-4 bg-yellow-600 rounded-3xl text-lg max-w-[30rem]">
                {el.msg}
              </p>
            </p>
            <button
              className="absolute right-4 top-4"
              onClick={() => {
                removeMsg(el.id);
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;

export const adminLoader = async () => {
  const querySnapshot = await getDocs(collection(db, "messages"));
  const appsArr = [];
  querySnapshot.forEach((doc) => appsArr.push(doc.data()));
  const data = appsArr;
  if (data) {
    return data;
  } else {
    console.log("No such document!");
  }
};
