// src/components/ui/Input.jsx

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full p-3 rounded-xl bg-slate-900/60 border border-white/10 focus:border-purple-500 focus:outline-none transition ${className}`}
    />
  );
}