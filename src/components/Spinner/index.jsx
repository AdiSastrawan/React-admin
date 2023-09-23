const Spinner = ({ className = "" }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className={"spinner border-4 border-t-4 border-gray-200 rounded-full animate-spin h-4 w-h" + className}></div>
    </div>
  );
};

export default Spinner;
