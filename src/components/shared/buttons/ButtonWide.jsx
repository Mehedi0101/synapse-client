const ButtonWide = ({ text, className='' }) => {
  return (
    <button className={`group relative w-full rounded-full px-4 py-2.5 text-white font-medium focus:outline-none transition-all ease-linear cursor-pointer overflow-hidden ${className}`}>
      {/* Background wrapper that scales on click */}
      <span className="absolute inset-0 transition-transform duration-150 group-active:scale-95">
        <span className="absolute rounded-full inset-0 bg-gradient-to-r from-primary to-btn-secondary transition-opacity duration-500 opacity-100 group-hover:opacity-100"></span>
        <span className="absolute rounded-full inset-0 bg-gradient-to-r from-btn-secondary to-primary transition-opacity duration-500 opacity-0 group-hover:opacity-100"></span>
      </span>

      {/* Text always stays the same size */}
      <span className="relative z-10">{text}</span>
    </button>
  );
};


export default ButtonWide;