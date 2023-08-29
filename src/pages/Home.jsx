import { useActionData, useLoaderData } from "react-router-dom";
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
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { projectsSliceActions } from "../redux/projects-slice";
// import { storage } from "../firebase-config";
// import { ref, getDownloadURL} from "firebase/storage";

const HomePage = () => {
  const data = useActionData();
  const loaderData = useLoaderData();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (data) {
      dispatch(formSliceActions.addMessage(data));
    }
  }, [data]);
  useEffect(() => {
    if(loaderData) {
      dispatch(projectsSliceActions.replaceProjects(loaderData))
    }
  },[loaderData])
  
  const projects =  useSelector(state => state.projects.projects);
  console.log(projects);

  return (
    <>
      <MobileNav />
      <DesktopNav />
      <Header />
      <main>
        <AboutUs />
        <Skills />
        <Projects projects={projects}/>
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

export const homeLoader = async () => {
  const querySnapshot = await getDocs(collection(db, "projects"));
  const projectsArr = [];
  querySnapshot.forEach((doc) => projectsArr.push(doc.data()));
  const data = projectsArr.reverse();
  if (data) {
    return data;
  } else {
  }
};
