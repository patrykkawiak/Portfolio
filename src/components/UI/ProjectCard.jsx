import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase-config";
import { useEffect, useState } from "react";

const ProjectCard = ({ info, onDelete, onEdit, index}) => {
  const { img, highlight, heading, id } = info;

  const [dbImage, setDbImage] = useState(null);

  const handleLoadImg = async () => {
    const res = await getDownloadURL(ref(storage, `projects/${img}`));
    setDbImage(res);
  };

  useEffect(() => {
    handleLoadImg();
  }, [img]);

  return (
    <div key={id}
      className="px-4 pt-16 pb-8 text-black text-4lg w-max bg-amber-500 rounded-lg border-2 border-black relative"
    >
      <div className="px-2 absolute top-0 left-0 w-full h-8 bg-stone-900 flex items-center gap-2">
        <button
          className="w-20 h-5 bg-amber-500 rounded-full flex justify-center items-center"
          onClick={() => {
            onDelete(id, img);
          }}
        >
          delete
        </button>
      </div>
      <div className="flex flex-col gap-8">
        <img src={dbImage} alt={highlight} className=" max-h-[15rem]" />
        <div className="flex gap-2 justify-center font-semibold text-2xl">
          <p>{highlight}</p>
          <p>{heading}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
