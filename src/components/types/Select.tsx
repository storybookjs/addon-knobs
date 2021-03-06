import React, { FunctionComponent, ChangeEvent, Validator } from 'react';
import PropTypes from 'prop-types';

import { Form } from '@storybook/components';
import { KnobControlConfig, KnobControlProps } from './types';

export type SelectTypeKnobValue = string | number | boolean | null | undefined | PropertyKey[] | Record<string, unknown>;

export type SelectTypeOptionsProp<T extends SelectTypeKnobValue = SelectTypeKnobValue> =
  | Record<PropertyKey, T>
  | Record<Extract<T, PropertyKey>, T[keyof T]>
  | T[]
  | readonly T[];

export interface SelectTypeKnob<T extends SelectTypeKnobValue = SelectTypeKnobValue>
  extends KnobControlConfig<T> {
  options: SelectTypeOptionsProp<T>;
}

export interface SelectTypeProps<T extends SelectTypeKnobValue = SelectTypeKnobValue>
  extends KnobControlProps<T> {
  knob: SelectTypeKnob<T>;
}

const serialize = (value: SelectTypeKnobValue) => value;
const deserialize = (value: SelectTypeKnobValue) => value;

const SelectType: FunctionComponent<SelectTypeProps> & {
  serialize: typeof serialize;
  deserialize: typeof deserialize;
} = ({ knob, onChange }) => {
  const { options } = knob;

  const callbackReduceArrayOptions = (acc: any, option: any, i: number) => {
    if (typeof option !== 'object' || option === null) return { ...acc, [option]: option };
    const label = option.label || option.key || i;
    return { ...acc, [label]: option };
  };

  const entries = Array.isArray(options) ? options.reduce(callbackReduceArrayOptions, {}) : options;

  const selectedKey = Object.keys(entries).find((key) => {
    const { value: knobVal } = knob;
    const entryVal = entries[key];

    if (Array.isArray(knobVal)) {
      return JSON.stringify(entryVal) === JSON.stringify(knobVal);
    }
    return entryVal === knobVal;
  });

  return (
    <Form.Select
      value={selectedKey}
      name={knob.name}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
        onChange(entries[e.target.value]);
      }}
      size="flex"
    >
      {Object.entries(entries).map(([key]) => (
        <option key={key} value={key}>
          {key}
        </option>
      ))}
    </Form.Select>
  );
};

SelectType.defaultProps = {
  knob: {} as any,
  onChange: (value) => value,
};

SelectType.propTypes = {
  knob: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.any,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  }) as Validator<SelectTypeProps['knob']>,
  onChange: PropTypes.func as Validator<SelectTypeProps['onChange']>,
};

SelectType.serialize = serialize;
SelectType.deserialize = deserialize;

export default SelectType;
