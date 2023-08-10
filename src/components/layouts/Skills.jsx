import Heading from "../UI/Heading";
import skillStore from "../../store/skills-store";
import SkillItem from "../UI/SkillItem";

const Skills = () => {
  return (
    <section class="skills section-padding" id="skills">
      <div class="wrapper">
        <Heading classes={"skills-heading"}>Skills</Heading>
        <div
          class="skills-container"
          data-aos="fade-up"
          data-aos-delay="500"
          data-aos-offset="100"
          data-aos-duration="800"
          data-aos-once="true"
        >
          {skillStore.map((item) => {
            return (
              <SkillItem
                key={item.id}
                desc={item.desc}
                img={item.img}
                alt={item.alt}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
