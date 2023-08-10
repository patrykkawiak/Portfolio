const Heading = ({ children, classes }) => {
  return (
    <h2 className={`text-5xl font-bold ${classes}`}>
      &lt;{children}/&gt;
    </h2>
  );
};

export default Heading
