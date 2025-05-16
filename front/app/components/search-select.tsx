import { Select } from "antd";

interface SearchSelectProps {
    options: any[],
    placeholder: string,
    optionFilterProp?: string,
    optionLabelProp?: string,
}

const SearchSelect = ({options, optionFilterProp = "label", placeholder}: SearchSelectProps) => {
    return <Select
    showSearch
    allowClear
    placeholder={placeholder}
    optionFilterProp={optionFilterProp}
    filterSort={(optionA, optionB) =>
      (optionA[optionFilterProp] ?? '').toLowerCase().localeCompare((optionB[optionFilterProp] ?? '').toLowerCase())
    }
    options={options}
  />
}

export default SearchSelect;