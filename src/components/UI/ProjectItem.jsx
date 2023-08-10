import Color from "./Color";
import Link from "./Link";
import Pill from "./Pill";

const ProjectItem = ({
  bg,
  img,
  colorHeading,
  heading,
  desc,
  website,
  code,
  classes,
  tech,
}) => {
  const imgUrl = `url(${img})`;
  return (
    <div key={heading} className={`projects-container-item ${classes}`}>
      <img src={bg} alt="background image" />
      <div
        class="project-img"
        style={{ backgroundImage: imgUrl }}
        data-aos="zoom-in"
        data-aos-delay="700"
        data-aos-duration="500"
        data-aos-offset="300"
        data-aos-once="true"
      ></div>
      <div
        class="project-content"
        data-aos="zoom-in"
        data-aos-delay="200"
        data-aos-duration="500"
        data-aos-offset="300"
        data-aos-once="true"
      >
        <h3 class="project-heading">
          <Color>{colorHeading}</Color> {heading}
        </h3>
        <p class="project-desc">{desc}</p>
        <div className="flex gap-2 flex-wrap">
          {tech[0].map((el) => (
            <Pill classes={el} />
          ))}
        </div>
        <div class="buttons">
          <Link to={website} blank={true}>
            <span className="pointer-events-none">
              <i class="bx bx-globe"></i> Visit Website
            </span>
          </Link>
          <Link to={code} blank={true}>
            <span className="pointer-events-none">
              <i class="bx bxl-github"></i> Check Code
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ProjectItem;
