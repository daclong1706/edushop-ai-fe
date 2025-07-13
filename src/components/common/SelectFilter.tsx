interface Props {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const SelectFilter: React.FC<Props> = ({ label, options, value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
      >
        <option value="">Tất cả</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFilter;
