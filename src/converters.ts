import { Codec } from './components/types';
import ArrayType from './components/types/Array';
import BooleanType from './components/types/Boolean';
import ButtonType from './components/types/Button';
import CheckboxType from './components/types/Checkboxes';
import ColorType from './components/types/Color';
import DateType from './components/types/Date';
import FilesType from './components/types/Files';
import NumberType from './components/types/Number';
import ObjectType from './components/types/Object';
import OptionsType from './components/types/Options';
import RadioType from './components/types/Radio';
import SelectType from './components/types/Select';
import TextType from './components/types/Text';
import { KnobType } from './type-defs';

// Unused. Kept here to maintain compatibility.
export const converters = {
  jsonParse: (value: any): any => JSON.parse(value),
  jsonStringify: (value: any): string => JSON.stringify(value),
  simple: (value: any): any => value,
  stringifyIfSet: (value: any): string =>
    value === null || value === undefined ? '' : String(value),
  stringifyIfTruthy: (value: any): string | null => (value ? String(value) : null),
  toArray: (value: any): any[] => {
    if (Array.isArray(value)) {
      return value;
    }

    return value.split(',');
  },
  toBoolean: (value: any): boolean => value === 'true',
  toDate: (value: any): number => new Date(value).getTime() || new Date().getTime(),
  toFloat: (value: any): number | null => (value === '' ? null : parseFloat(value)),
};

// Unused. Kept here to maintain compatibility.
export const serializers: Record<KnobType, Codec['serialize']> = {
  array: ArrayType.serialize,
  boolean: BooleanType.serialize,
  button: ButtonType.serialize,
  checkbox: CheckboxType.serialize,
  color: ColorType.serialize,
  date: DateType.serialize,
  files: FilesType.serialize,
  number: NumberType.serialize,
  object: ObjectType.serialize,
  options: OptionsType.serialize,
  radios: RadioType.serialize,
  select: SelectType.serialize,
  text: TextType.serialize,
};

export const deserializers: Record<KnobType, Codec['deserialize']> = {
  array: ArrayType.deserialize,
  boolean: BooleanType.deserialize,
  button: ButtonType.deserialize,
  checkbox: CheckboxType.deserialize,
  color: ColorType.deserialize,
  date: DateType.deserialize,
  files: FilesType.deserialize,
  number: NumberType.deserialize,
  object: ObjectType.deserialize,
  options: OptionsType.deserialize,
  radios: RadioType.deserialize,
  select: SelectType.deserialize,
  text: TextType.deserialize,
};
