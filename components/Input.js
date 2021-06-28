export default function Input({
  label,
  type = "text",
  name,
  id,
  value,
  handleInputChange,
}) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
}
