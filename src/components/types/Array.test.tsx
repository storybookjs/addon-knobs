import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, themes, convert } from '@storybook/theming';
import ArrayType from './Array';

describe('Array', () => {
  it('should subscribe to setKnobs event of channel', () => {
    const onChange = jest.fn();
    render(
      <ThemeProvider theme={convert(themes.light)}>
        <ArrayType
          onChange={onChange}
          knob={{ name: 'passions', value: ['Fishing', 'Skiing'], separator: ',' }}
        />{' '}
      </ThemeProvider>
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Fishing,Skiing');
    userEvent.type(input, ',');
    expect(onChange).toHaveBeenLastCalledWith(['Fishing', 'Skiing', '']);
  });

  it('deserializes an Array to an Array', () => {
    const array = ['a', 'b', 'c'];
    const deserialized = ArrayType.deserialize(array);

    expect(deserialized).toEqual(['a', 'b', 'c']);
  });

  it('deserializes an Object to an Array', () => {
    const object = { 1: 'one', 0: 'zero', 2: 'two' };

    const deserialized = ArrayType.deserialize(object);

    expect(deserialized).toEqual(['zero', 'one', 'two']);
  });

  it('should change to an empty array when emptied', () => {
    const onChange = jest.fn();
    render(
      <ThemeProvider theme={convert(themes.light)}>
        <ArrayType
          onChange={onChange}
          knob={{ name: 'passions', value: ['Fishing', 'Skiing'], separator: ',' }}
        />{' '}
      </ThemeProvider>
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Fishing,Skiing');
    userEvent.clear(input);
    expect(onChange).toHaveBeenLastCalledWith([]);
  });
});
