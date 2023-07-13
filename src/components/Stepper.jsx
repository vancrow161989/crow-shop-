function Stepper({ stepTitles, activeStep }) {
  const renderClassNumber = (number) => {
    if (activeStep === number)
      return "mr-2 inline-block h-6 w-6 rounded-full text-center text-white bg-black";
    return "mr-2 inline-block h-6 w-6 rounded-full text-center text-white bg-gray-400";
  };

  const renderClassLabel = (number) => {
    if (activeStep === number) return "text-lg font-semibold text-black";
    return "text-gray-400";
  };
  return (
    <div className="mx-auto max-w-md">
      <ul className="after:absoluteCenter sm: after:max-w-auto relative flex justify-between after:absolute after:-ml-2 after:block after:h-[1px] after:w-full after:max-w-[22vw] after:bg-gray-400 after:content-[''] sm:after:-ml-[15px] sm:after:max-w-[207px]">
        {stepTitles.map((title, index) => (
          <li key={title.number}>
            <span className={renderClassNumber(title.number)}>
              {title.number}
            </span>
            <span className={renderClassLabel(title.number)}>
              {title.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Stepper;
