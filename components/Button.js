export default function Button({ children, purpose, onClick }) {
  return (
    <button className={`button ${purpose}`} onClick={() => onClick()}>
      {children}
    </button>
  );
}
