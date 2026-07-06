function Card({ children, className = "" }) {
  return (
    <div
      className={`
                rounded-3xl
                bg-white
                shadow-xl
                transition-all
                duration-300
                hover:shadow-2xl
                ${className}
            `}
    >
      {children}
    </div>
  );
}

export default Card;
