"use client";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface Props {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

export default function CountrySelect({ value, onChange }: Props) {
  return <div className=""></div>;
}
