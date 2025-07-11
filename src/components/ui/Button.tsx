interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        bg-warm-orange
        text-black
        font-semibold
        text-lg
        px-6 py-3
        rounded-lg
        border border-warm-border
        shadow-md
        transition-all duration-150
        hover:bg-warm-orange-light hover:scale-105 hover:outline-none hover:ring-2 hover:ring-warm-orange/50
        focus:outline-none focus:ring-2 focus:ring-warm-orange/50
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
