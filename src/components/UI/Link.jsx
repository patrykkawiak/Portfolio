const Link = ({ children, to, blank, onClick}) => {
  const effect = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.target.offsetWidth - (e.clientX - rect.left);
    const y = e.target.offsetHeight - (e.clientY - rect.top);

    e.target.style.setProperty("--mouse-x", `${x}px`);
    e.target.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <a
      className="animated-btn"
      onClick={onClick}
      href={to}
      rel="noopener"
      target={blank ? "_blank" : "_self"}
      onMouseMove={effect}
    >
      {children}
    </a>
  );
};
export default Link;
