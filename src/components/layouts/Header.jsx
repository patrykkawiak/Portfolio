import { useEffect, useState } from "react";
import headerImg from "../../assets/img/header.png";
import GrayText from "../UI/GrayText";
import Link from "../UI/Link";
import Color from "../UI/Color";
import { createPortal } from "react-dom";
import Modal from "../Modal";

const Header = () => {
  const [bar, setBar] = useState(false);
  const [modal, setModal] = useState(false);
  const [word, setWord] = useState("");
  const [index, setIndex] = useState(1);
  const typingData = {
    word: "Front End Developer",
    speed: 90,
  };

  const typingText = setTimeout(() => {
    setWord(typingData.word.slice(0, index));
    setIndex(index + 1);
  }, typingData.speed);

  if (index > typingData.word.length) {
    clearTimeout(typingText);
  }

const handleModal = () => {
  setModal(prev => !prev)
}

  useEffect(() => {
    const typingBar = setInterval(() => {
      setBar((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingBar);
    };
  }, []);

  return (
    <>
    {modal && createPortal(<Modal onClick={handleModal}></Modal>, document.getElementById('modal'))}
    <header className="header">
      <div className="wrapper">
        <div className="header-container">
          <div className="header-content">
            <h1 className="header-heading">
              Hello, <br />
              I'm <Color>Patryk </Color>
              <span className="typing-text">{word}</span>
              <span className=" inline-block header-heading-typing color w-2">
                {bar ? "|" : ` `}
              </span>
            </h1>
            <GrayText>
              Welcome to my Portfolio Page, I hope you'll like it. Check my CV
              and Projects, then begin work with me...
            </GrayText>
            <div className="flex gap-4">
              <Link onClick={handleModal}>
                <span className="flex items-center gap-2 pointer-events-none">
                  <i class="bx bxs-file-pdf text-2xl"></i> Download CV
                </span>
              </Link>

              <Link to={'#project'}>
                {" "}
                <span className="flex items-center gap-2 pointer-events-none">
                  <i class="bx bx-folder-open text-2xl"></i>
                  Check Projects
                </span>
              </Link>
            </div>
          </div>
          <div class="header-img">
            <img
              src={headerImg}
              alt="pictue of website author"
              data-aos="zoom-in"
              data-aos-delay="1000"
              data-aos-duration="1000"
              data-aos-once="true"
            />
          </div>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;
