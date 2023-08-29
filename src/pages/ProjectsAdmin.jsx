import { useEffect, useState } from "react";
import { storage } from "../firebase-config";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import { Form, useActionData, useLoaderData } from "react-router-dom";
import { db } from "../firebase-config";
import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { projectsSliceActions } from "../redux/projects-slice";
import ProjectCard from "../components/UI/ProjectCard";
const ProjectsAdmin = () => {
  const [img, setImg] = useState(null);
  const actionData = useActionData();
  const loaderData = useLoaderData();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const projects = useSelector((state) => state.projects.projects);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  useEffect(() => {
    if (actionData) {
      dispatch(projectsSliceActions.addProject(actionData));
    }
  }, [actionData]);

  useEffect(() => {
    if (loaderData) {
      dispatch(projectsSliceActions.replaceProjects(loaderData));
    }
  }, [loaderData]);

  const uploadImg = () => {
    const storageRef = ref(storage, `projects/${img.name}`);
    uploadBytes(storageRef, img);
    setIsModalOpen(false);
  };

  const handleDeleteProject = async (id, img) => {
    dispatch(projectsSliceActions.deleteProject(id));
    let docID;
    const q = query(collection(db, "projects"), where("id", "==", id));
    const itemToDelete = await getDocs(q);
    itemToDelete.forEach((doc) => {
      docID = doc.id;
    });
    await deleteDoc(doc(db, "projects", docID));
    const storageRef = ref(storage, `projects/${img}`);
    await deleteObject(storageRef);
  };

  return (
    <>
      <button
        className="fixed bottom-8 right-8 text-amber-500 text-5xl"
        onClick={toggleModal}
      >
        <i className="bx bxs-plus-circle"></i>
      </button>
      {isModalOpen && (
        <div className="fixed h-screen w-screen top-0 overflow-y-scroll p-16 z-30 bg-white/10 flex justify-center">
          <Form
            className="flex flex-col items-center gap-8 p-8 w-max-[30rem] h-max overflow-y-scroll text-amber-600 bg-black"
            method="post"
            onSubmit={uploadImg}
          >
            <h1 className="text-center text-3xl font-semibold">New Project</h1>
            <input
              type="text"
              name="highlight"
              id="highlight"
              placeholder="highlight"
              className="max-w-[20rem] text-black bg-amber-600 placeholder:text-black/80 px-2 py-2 rounded-md"
            />
            <input
              type="text"
              name="heading"
              id="heading"
              placeholder="heading"
              className="max-w-[20rem] text-black bg-amber-600 placeholder:text-black/80 px-2 py-2 rounded-md"
            />
            <input
              type="text"
              name="website"
              id="website"
              placeholder="website"
              className="max-w-[20rem] text-black bg-amber-600 placeholder:text-black/80 px-2 py-2 rounded-md"
            />
            <input
              type="text"
              name="code"
              id="code"
              placeholder="code"
              className="max-w-[20rem] text-black bg-amber-600 placeholder:text-black/80 px-2 py-2 rounded-md"
            />
            <input
              type="file"
              name="img"
              id="img"
              onChange={(e) => setImg(e.target.files[0])}
              className="max-w-[20rem] text-black bg-amber-600 placeholder:text-black/80 px-2 py-2 rounded-md"
            />
            <textarea
              name="desc"
              id="desc"
              placeholder="desc"
              className="max-w-[20rem] text-black bg-amber-600 placeholder:text-black/80 px-2 py-2 rounded-md"
            ></textarea>
            <div className="flex flex-wrap gap-4 max-w-[15rem]">
              <div>
                <input type="checkbox" name="tech" value="bx bxl-javascript" />
                <span>JavaScript</span>
              </div>
              <div>
                <input type="checkbox" name="tech" value="bx bxl-html5" />
                <span>HTML</span>
              </div>
              <div>
                <input type="checkbox" name="tech" value="bx bxl-css3" />
                <span>CSS</span>
              </div>
              <div>
                <input type="checkbox" name="tech" value="bx bxl-sass" />
                <span>SASS</span>
              </div>
              <div>
                <input type="checkbox" name="tech" value="bx bxl-github" />
                <span>Github</span>
              </div>
              <div>
                <input type="checkbox" name="tech" value="bx bxl-git" />
                <span>Git</span>
              </div>
              <div>
                <input type="checkbox" name="tech" value="bx bxl-react" />
                <span>React</span>
              </div>
              <div>
                <input type="checkbox" name="tech" value="bx bxl-redux" />
                <span>Redux</span>
              </div>
              <div>
                <input type="checkbox" name="tech" value="bx bxl-firebase" />
                <span>Firebase</span>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="tech"
                  value="bx bxl-tailwind-css"
                />
                <span>TailwindCSS</span>
              </div>
              <div>
                <input type="checkbox" name="tech" value="bx bxl-php" />
                <span>PHP</span>
              </div>
              <div>
                <input type="checkbox" name="active" value="true" />
                <span>True</span>
              </div>
            </div>
            <div className="flex gap-4"><input type="submit" value={"Submit"} className="cursor-pointer" />
            <button onClick={toggleModal}>Cancel</button></div>
          </Form>
        </div>
      )}
      <div className="flex flex-wrap gap-8 justify-center">
        {projects.map((el, index) => {
          return (
            <ProjectCard
              key={el.id}
              info={el}
              onDelete={handleDeleteProject}
              index={index}
            ></ProjectCard>
          );
        })}
      </div>
    </>
  );
};

export default ProjectsAdmin;

export const projectAction = async ({ request }) => {
  const formData = await request.formData();
  const id = Math.random();
  const data = {
    id,
    highlight: formData.get("highlight"),
    heading: formData.get("heading"),
    website: formData.get("website"),
    code: formData.get("code"),
    img: formData.get("img"),
    desc: formData.get("desc"),
    tech: formData.getAll("tech"),
    active: formData.get("active"),
  };

  await addDoc(collection(db, "projects"), data);

  return data;
};

export const projectLoader = async () => {
  const querySnapshot = await getDocs(collection(db, "projects"));
  const projectsArr = [];
  querySnapshot.forEach((doc) => projectsArr.push(doc.data()));
  const data = projectsArr.reverse();
  if (data) {
    return data;
  } else {
  }
};
