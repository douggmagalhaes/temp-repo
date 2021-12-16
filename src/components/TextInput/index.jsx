import "./styles.css";

export const TextInput = ({ searchValue, handleChange }) => {
  return (
    <input
      className="text-input"
      onChange={handleChange}
      //coloco o searchValue
      value={searchValue}
      type="search"
      placeholder="Faça sua busca"
    />
  );
};
