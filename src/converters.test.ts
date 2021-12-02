import { deserializers, serializers } from './converters';
import { KnobType } from './type-defs';
import { Knob } from './type-defs';

function serializeAndDeserialize<T>(type: KnobType, value: T, knob?: Partial<Knob>) {
  const serialize = serializers[type];
  const deserialize = deserializers[type];

  const serializedValue = serialize(value);
  const deserializedValue = deserialize(serializedValue, knob);

  return deserializedValue;
}

test('Converter Array', () => {
  const undefinedValue = serializeAndDeserialize('array', undefined);
  expect(undefinedValue).toEqual([]);
  const numberArray = serializeAndDeserialize('array', [1, 2, 3]);
  expect(numberArray).toEqual([1, 2, 3]);
  const stringArray = serializeAndDeserialize('array', ["1", "2", "3"]);
  expect(stringArray).toEqual(["1", "2", "3"]);
})

test('Converter Number', () => {
  const undefinedValue = serializeAndDeserialize('number', undefined);
  expect(undefinedValue).toEqual(undefined);
  const numberValue = serializeAndDeserialize('number', 23);
  expect(numberValue).toEqual(23);
})

test('Converter Checkbox', () => {
  const undefinedValue = serializeAndDeserialize('checkbox', undefined);
  expect(undefinedValue).toEqual(undefined);
  const numberObject = serializeAndDeserialize('checkbox', { one: 1, two: 2, three: 3 });
  expect(numberObject).toEqual({ one: 1, two: 2, three: 3 });
  const stringObject = serializeAndDeserialize('checkbox', { one: "1", two: "2", three: "3" });
  expect(stringObject).toEqual({ one: "1", two: "2", three: "3" });
})

test('Converter Date', () => {
  const undefinedValue = serializeAndDeserialize('date', undefined);
  expect(undefinedValue).toEqual(undefined);
  const time = new Date().getTime();
  const epochValue = serializeAndDeserialize('date', time);
  expect(epochValue).toEqual(epochValue);
})

test('Converter Boolean', () => {
  const undefinedValue = serializeAndDeserialize('boolean', undefined);
  expect(undefinedValue).toEqual(false); // Getting a 'false' value.
  const trueValue = serializeAndDeserialize('boolean', true);
  expect(trueValue).toBeTruthy();
  const falseValue = serializeAndDeserialize('boolean', false);
  expect(falseValue).toBeFalsy();
})

test('Converter Object', () => {
  const undefinedValue = serializeAndDeserialize('object', undefined);
  expect(undefinedValue).toEqual({});
  const numberObject = serializeAndDeserialize('object', { one: 1, two: 2, three: 3 });
  expect(numberObject).toEqual({ one: 1, two: 2, three: 3 });
  const stringObject = serializeAndDeserialize('object', { one: "1", two: "2", three: "3" });
  expect(stringObject).toEqual({ one: "1", two: "2", three: "3" });
})

test('Converter Select', () => {
  const undefinedValue = serializeAndDeserialize('select', undefined);
  expect(undefinedValue).toEqual(undefined);
  const stringValue = serializeAndDeserialize('select', 'string value');
  expect(stringValue).toEqual('string value');
  const numberValue = serializeAndDeserialize('select', 1_005, { options: [1, 2, 1005 ]});
  expect(numberValue).toEqual(1_005);
  const numberValueAsString = serializeAndDeserialize('select', 1_005, { options: ["1", "2", "1005" ]});
  expect(numberValueAsString).toEqual("1005");
  const numberArray = serializeAndDeserialize('select', [1, 2, 3]);
  expect(numberArray).toEqual([1, 2, 3]);
  const stringArray = serializeAndDeserialize('select', ["1", "2", "3"]);
  expect(stringArray).toEqual(["1", "2", "3"]);
  const numberObject = serializeAndDeserialize('select', { one: 1, two: 2, three: 3 });
  expect(numberObject).toEqual({ one: 1, two: 2, three: 3 });
  const stringObject = serializeAndDeserialize('select', { one: "1", two: "2", three: "3" });
  expect(stringObject).toEqual({ one: "1", two: "2", three: "3" });
})

test('Converter Radios', () => {
  const undefinedValue = serializeAndDeserialize('radios', undefined);  
  expect(undefinedValue).toEqual(undefined);
  const numberObject = serializeAndDeserialize('radios', { one: 1, two: 2, three: 3 });
  expect(numberObject).toEqual({ one: 1, two: 2, three: 3 });
  const stringObject = serializeAndDeserialize('radios', { one: "1", two: "2", three: "3" });
  expect(stringObject).toEqual({ one: "1", two: "2", three: "3" });
})

test('Converter Object', () => {
  const undefinedValue = serializeAndDeserialize('object', undefined);  
  expect(undefinedValue).toEqual({});
  const numberObject = serializeAndDeserialize('object', { one: 1, two: 2, three: 3 });
  expect(numberObject).toEqual({ one: 1, two: 2, three: 3 });
  const stringObject = serializeAndDeserialize('object', { one: "1", two: "2", three: "3" });
  expect(stringObject).toEqual({ one: "1", two: "2", three: "3" });
})