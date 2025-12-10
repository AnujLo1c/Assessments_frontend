export default function InputField({
  label,
  type = "text",
  value,
  onChange,
  name,
  autoComplete = "off",
}) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium text-gray-700">{label}</label>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </div>
  );
}
