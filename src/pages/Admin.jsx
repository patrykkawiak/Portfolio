import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLoaderData } from "react-router-dom";
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
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase-config";

const Admin = () => {
  const data = useLoaderData();
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(formSliceActions.replace(data));
    }
  }, [data]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.email);
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((err) => console.log(err));
  };

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

  return !user ? (
    <div className="text-center mt-4">
      You don't have permission to visit this site!
    </div>
  ) : (
    <div className="p-8 flex flex-col gap-8">
        <div className="flex gap-8">
      <Link className="text-2xl mb-10" to={"/"}>
        Home
      </Link>
      {user && (
        <Link onClick={userSignOut} className="text-2xl mb-10" to={"/"}>
          SingOut
        </Link>
      )}
        </div>
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
