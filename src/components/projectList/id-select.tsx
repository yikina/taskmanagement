import { type } from '@testing-library/user-event/dist/type';
import { Select } from 'antd';
import React from 'react'

type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
  value?: string | number | null | undefined;
  onChange?: (value?: number) => void;
  defaultOptionName: string;
  options?: { name: string, value?: number }[]
}
export default function IdSelect(props: IdSelectProps) {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value);

  return <Select value={options?.length ? toNumber(value) : 0} onChange={value => onChange?.(toNumber(value) || undefined)}{...restProps}>

    {defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null}
    {options?.map(option => <Select.Option value={option.value} key={option.value}>{option.name}</Select.Option>)}
  </Select>
}
