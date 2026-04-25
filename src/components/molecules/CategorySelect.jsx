export default function CategorySelect({ value, categories, onChange }) {
  return (
    <label className="w-full sm:w-56">
      <span className="text-xs font-medium text-slate-600">Categoría</span>
      <select
        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {categories.map((c) => (
          <option key={c || "__all__"} value={c}>
            {c || "Todas"}
          </option>
        ))}
      </select>
    </label>
  );
}

