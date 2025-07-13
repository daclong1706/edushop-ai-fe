interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Tìm kiếm</label>
      <input
        type="text"
        placeholder="Nhập tên khóa học..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>
  );
};

export default SearchInput;
