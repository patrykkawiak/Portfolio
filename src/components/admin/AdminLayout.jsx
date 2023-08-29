import { Outlet } from "react-router-dom";
import AdminNav from "./AdminNav";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useState, useEffect } from "react";

const AdminLayout = () => {
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

  return !user ? (
    <div className="text-center mt-10">
      You don't have permisions to visit this website
    </div>
  ) : (
    <>
      <AdminNav />
      <Outlet />
    </>
  );
};
export default AdminLayout;
