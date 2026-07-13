export type Option = {
  label: string;
  value: string;
};

export type DropDownProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};
