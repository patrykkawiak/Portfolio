import { useActionData } from "react-router-dom";
import AboutUs from "../components/layouts/AboutUs";
import Contact from "../components/layouts/Contact";
import DesktopNav from "../components/layouts/DesktopNav";
import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import MobileNav from "../components/layouts/MobileNav";
import Projects from "../components/layouts/Projects";
import Skills from "../components/layouts/Skills";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formSliceActions } from "../redux/form-slice";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";

const HomePage = () => {
  const data = useActionData();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(formSliceActions.addMessage(data));
    }
  }, [data]);
  return (
    <>
      <MobileNav />
      <DesktopNav />
      <Header />
      <main>
        <AboutUs />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;

export const homeAction = async ({ request }) => {
  const formData = await request.formData();
  const id = Math.random();
  const newMessage = {
    id: id,
    title: formData.get("title"),
    name: formData.get("name"),
    msg: formData.get("msg"),
  };

  await addDoc(collection(db, "messages"), newMessage);

  return newMessage;
};
