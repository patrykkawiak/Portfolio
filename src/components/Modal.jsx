import CVpl from "../assets/docs/PatrykKawiakCVPL.pdf";
import CVeng from "../assets/docs/PatrykKawiakCVENG.pdf";

const Modal = (props) => {
  return (
    <div className="fixed h-screen w-screen z-50 bg-black/50 flex justify-center items-center">
      <div className="px-4 pt-16 pb-8 text-black text-4lg w-[32rem] bg-amber-500 rounded-lg border-2 border-black flex gap-8 flex-col relative items-center">
        <div className="px-2 absolute top-0 left-0 w-full h-8 bg-stone-900 flex items-center">
          <button
            className="w-20 h-5 bg-amber-500 rounded-full flex justify-center items-center"
            onClick={props.onClick}
          >
            X
          </button>
        </div>
        <p className="text-2xl">Choose language version</p>
        <div className="flex gap-2">
          <a
            href={CVpl}
            download="Patryk Kawiak CV PL"
            className="text-xl px-4 py-2 bg-stone-900 rounded-3xl text-white"
          >
           <i class='bx bxs-download'></i> Polish CV
          </a>
          <a
            href={CVeng}
            download="Patryk Kawiak CV ENG"
            className="text-xl px-4 py-2 bg-stone-900 rounded-3xl text-white"
          >
           <i class='bx bxs-download'></i> English CV
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;
