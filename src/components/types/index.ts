import { ComponentType } from 'react';

import TextType from './Text';
import NumberType from './Number';
import ColorType from './Color';
import BooleanType from './Boolean';
import ObjectType from './Object';
import SelectType from './Select';
import RadiosType from './Radio';
import ArrayType from './Array';
import DateType from './Date';
import ButtonType from './Button';
import FilesType from './Files';
import OptionsType from './Options';

const KnobControls = {
  text: TextType,
  number: NumberType,
  color: ColorType,
  boolean: BooleanType,
  object: ObjectType,
  select: SelectType,
  radios: RadiosType,
  array: ArrayType,
  date: DateType,
  button: ButtonType,
  files: FilesType,
  options: OptionsType,
};
export default KnobControls;

export type KnobType = keyof typeof KnobControls;

export type KnobControlType = ComponentType<any> & {
  serialize: (v: any) => any;
  deserialize: (v: any) => any;
};

// Note: this is a utility function that helps in resolving types more orderly
export const getKnobControl = (type: KnobType) => KnobControls[type] as KnobControlType;

export type { TextTypeKnob } from './Text';
export type { NumberTypeKnob, NumberTypeKnobOptions } from './Number';
export type { ColorTypeKnob } from './Color';
export type { BooleanTypeKnob } from './Boolean';
export type { ObjectTypeKnob } from './Object';
export type { SelectTypeKnob, SelectTypeOptionsProp, SelectTypeKnobValue } from './Select';
export type { RadiosTypeKnob, RadiosTypeOptionsProp, RadiosTypeKnobValue } from './Radio';
export type { ArrayTypeKnob, ArrayTypeKnobValue } from './Array';
export type { DateTypeKnob } from './Date';
export type { ButtonTypeKnob, ButtonTypeOnClickProp } from './Button';
export type { FileTypeKnob } from './Files';
export type {
  OptionsTypeKnob,
  OptionsKnobOptions,
  OptionsTypeOptionsProp,
  OptionsTypeKnobSingleValue,
  OptionsTypeKnobValue,
} from './Options';
