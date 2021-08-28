import React from "react";
import "./custom-select.styles.scss";
import { Select } from "antd";
const { Option } = Select;

interface SelectProps {
  className?: string;
  placeholder?: string;
  options: Array<{ id: number | string; name: string }>;
  onChange?: (value: string | number | any, option: any) => void;
  value?: string | number | undefined;
  returnId?: boolean;
  disabled?: boolean;
  defaultValue?:string|number;
}

const CustomSelect: React.FC<SelectProps> = (props: SelectProps) => {
  const {
    className,
    placeholder,
    onChange,
    options,
    value,
    returnId,
    disabled,
    defaultValue,
  } = props;
  const newProps = {
    ...(value && { value: value }),
    ...(disabled && { disabled: disabled }),
    placeholder: placeholder,
    onChange: onChange,
    defaultValue:defaultValue,
  };
  return (
    <div className={`${className} custom-select-container`}>
      <Select disabled={disabled} {...newProps}>
        {options.map((item) => (
          <Option value={returnId ? item.id : item.name} key={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default CustomSelect;
