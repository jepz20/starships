export const Button = ({ children, className }) => {
  return (
    <button
      className={`${className} bg-secondary rounded-2xl px-4 py-3 text-grey `}
    >
      {children}
    </button>
  );
};
