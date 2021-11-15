export const Header = ({ children, className }) => {
  return (
    <div className={`${className || ""} text-5xl font-bold pb-11`}>
      {children}
    </div>
  );
};

export const Detail = ({ children, className }) => {
  return <div className={`text-lg ${className || ""}`}>{children}</div>;
};

export const Title = ({ children, className }) => {
  return (
    <div className={`font-bold text-2xl pb-4 ${className || ""}`}>
      {children}
    </div>
  );
};
