const LoadingBtn = () => {
  return (
    <button
      className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded flex items-center gap-2"
      disabled
    >
      <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      Loading...
    </button>
  );
};

export default LoadingBtn;
