import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminNav = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
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

  return (
    <div className="flex justify-between text-xl h-[5rem] px-8 items-center">
      <div className="flex gap-8">
        <Link to={"/"}>Home</Link>
        <Link to={"/admin/projects"}>Projects</Link>
        <Link to={"/admin"}>Messages</Link>
      </div>
      {user && (
        <Link onClick={userSignOut} to={"/"} className="px-4 py-2 bg-yellow-600 rounded-3xl text-lg max-w-[30rem]">
          SingOut
        </Link>
      )}
    </div>
  );
};

export default AdminNav;
