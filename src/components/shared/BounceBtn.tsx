const BounceBtn = ({ title }: { title: string }) => {
  return (
    <span className="relative shadow-xl px-10 py-3  hover:cursor-pointer bg-primary text-white border border-gray-500 rounded-md transition-transform active:scale-95 hover:bg-primary-hover">
      {/* Button Text */}
      <span className="text-xl">{title}</span>

      {/* Ping Animation Dot */}
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 p-2 bg-red-400"></span>
      </span>
    </span>
  );
};

export default BounceBtn;
