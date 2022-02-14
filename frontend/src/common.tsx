export const TextInput = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) => (
  <div className="mv2">
    <input
      type="text"
      value={value}
      onChange={(ev) => {
        onChange(ev.target.value);
      }}
      placeholder={placeholder}
    />
  </div>
);
