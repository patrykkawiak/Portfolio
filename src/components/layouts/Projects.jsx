import Heading from "../UI/Heading";
import { useState } from "react";
// import projectStore from "../../store/projects-store";
import ProjectItem from "../UI/ProjectItem";

const Projects = ({projects}) => {
  const [n, setN] = useState(0);
  const speed = 300;

  const handleSlide = (operator) => {
    const projects = document.querySelectorAll(".projects-container-item");
    const dotsArr = document.querySelectorAll(".dot");

    if (projects[n].classList.contains("active")) {
      projects[n].classList.add("animation-rev");
      setTimeout(() => {
        projects[n].classList.remove("animation-rev");
        projects[n].classList.remove("active");
        projects[operator].classList.add("active");
        dotsArr[n].classList.remove("active-dot");
        dotsArr[operator].classList.add("active-dot");
        projects[operator].classList.add("animation");
        setN(operator);
      }, speed);
    }
  };

  const nextSlide = () => {
    const projects = document.querySelectorAll(".projects-container-item");
    if (n < projects.length - 1) {
      handleSlide(n + 1);
    } else if (n == projects.length - 1) {
      return;
    }
  };
  const prevSlide = () => {
    if (n > 0) {
      handleSlide(n - 1);
    } else if (n == 0) {
      return;
    }
  };

  return (
    <section class="projects section-padding" id="project">
      <div class="wrapper">
        <Heading classes={"projects-heading"}>Projects</Heading>
        <div class="projects-container">
          {projects.map((el) => (
            <ProjectItem
              key={el.colorHeading}
              classes={el.active ? "active" : ""}
              img={el.img}
              colorHeading={el.highlight}
              heading={el.heading}
              desc={el.desc}
              website={el.website}
              code={el.code}
              tech={el.tech}
            />
          ))}
        </div>
        <div class="btns">
          <button class="btn prev" onClick={prevSlide}>
            <i class="bx bxs-left-arrow-circle"></i>
          </button>
          <div class="dots">
            {projects.map((el) => (
              <div
                key={el.highlight}
                className={`dot ${el.active ? "active-dot" : ""}`}
              ></div>
            ))}
          </div>
          <button class="btn next" onClick={nextSlide}>
            <i class="bx bxs-right-arrow-circle"></i>
          </button>
        </div>
      </div>
    </section>
  );
};
export default Projects;
