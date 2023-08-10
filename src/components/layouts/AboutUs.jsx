import { useState } from "react";
import Img from "../../assets/img/about.png";
import ImgBg from "../../assets/img/about-bg.png";
import Color from "../UI/Color";
import GrayText from "../UI/GrayText";
import Heading from "../UI/Heading";

const AboutUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const rotatingImg = (e) => {
    let viewportWidth = window.innerWidth;
    if (viewportWidth < 576) {
      return;
    }
    if (e.target.classList.contains("reset-pos")) {
      e.target.classList.remove("reset-pos");
    }
    e.target.classList.add("add-pos");

    setX(e.clientX - e.target.getBoundingClientRect().left);
    setY(e.clientY - e.target.getBoundingClientRect().top);

    const middleX = e.target.offsetWidth / 2;
    const middleY = e.target.offsetHeight / 2;

    const finalX = (middleX - x) / 10;
    const finalY = (middleY - y) / 10;

    e.target.style.setProperty("--transform-y", `${Math.floor(finalX)}deg`);
    e.target.style.setProperty("--transform-x", `${Math.floor(finalY)}deg`);
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <section className="about section-padding" id="about">
      <div className="wrapper">
        <div className="about-container overflow-hidden">
          <div
            className="about-img"
            data-aos="fade-right"
            data-aos-delay="1000"
            data-aos-offset="100"
            data-aos-duration="800"
            data-aos-once="true"
          >
            <img
              src={Img}
              alt="pictue of programmer"
              className="image"
              onMouseMove={rotatingImg}
              onMouseOut={(e) => {
                e.target.classList.add("reset-pos");
                e.target.classList.remove("add-pos");
              }}
            />
          </div>
          <div
            className="about-content"
            data-aos="fade-left"
            data-aos-delay="1500"
            data-aos-offset="100"
            data-aos-duration="800"
            data-aos-once="true"
          >
            <img
              className="about-content-bg"
              src={ImgBg}
              alt="background image"
            />
            <Heading>About Me</Heading>
            <GrayText>
              Hello! My name is Patryk Kawiak, I'm a front end
              <Color>developer</Color> and website
              <Color>designer</Color>. I specialize in creating responsive and
              modern websites. I'm good at
              <Color>SEO</Color> and
              <Color>UI/UX</Color>. Contact with the client isn't stranger to
              me. What sets me apart is that I am a fast learner, ambitious,
              motivated and eager to develop my knowledge and skills.
            </GrayText>
            <div className="about-slider">
              <button className="about-slider-item" onClick={toggleModal}>
                <i class="bx bxs-right-arrow"></i>
              </button>
              <p className={`about-slider-text ${isModalOpen ? "active" : ""}`}>
                Check My <Color>Github</Color> Profile:
                <a href="https://github.com/patrykkawiak" target="_blank">
                  <i class="bx bxl-github"></i> @patrykkawiak
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutUs;
