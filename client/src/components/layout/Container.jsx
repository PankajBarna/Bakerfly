export default function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-6xl ${className}`}>
      {children}
    </div>
  );
}
