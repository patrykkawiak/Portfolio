const SkillItem = ({ img, alt, desc }) => {
  return (
    <div
    class="skill-item"
    >
      <img src={img} alt={alt} />
      <p>{desc}</p>
    </div>
  );
};

export default SkillItem;
