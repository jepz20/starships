export const Button = ({ children, className, disabled, ...props }) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`${className || ""} ${
        !disabled ? "bg-secondary opacity-90  hover:opacity-100" : "opacity-50"
      } rounded-2xl px-4 py-3`}
    >
      {children}
    </button>
  );
};

export const HighlightButton = ({
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <Button
      disabled={disabled}
      className={`${className || ""} text-secondary`}
      {...props}
    >
      {children}
    </Button>
  );
};

export const PrimaryButton = ({ children, className, disabled, ...props }) => {
  return (
    <Button disabled={disabled} {...props}>
      {children}
    </Button>
  );
};
