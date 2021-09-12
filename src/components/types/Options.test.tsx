import React from 'react';
import { render } from '@testing-library/react';
import ReactSelect from 'react-select';
import OptionsType, { OptionsTypeKnob } from './Options';

const mockOn = jest.fn();

describe('Options', () => {
  let knob: OptionsTypeKnob<any>;
  let wrapper: HTMLElement;
  let firstLabel: HTMLLabelElement;
  let firstInput: HTMLInputElement;
  let lastInput: HTMLInputElement;

  describe('renders checkbox input', () => {
    beforeEach(() => {
      knob = {
        name: 'Color',
        value: undefined,
        defaultValue: ['#0ff'],
        options: {
          Red: '#f00',
          Green: '#090',
          Blue: '#0ff',
        },
        optionsObj: {
          display: 'check',
        },
      };

      wrapper = render(
        <OptionsType
          knob={knob}
          onChange={mockOn}
          display={knob.optionsObj.display}
        />
      ).container;
      firstLabel = wrapper.querySelector('label');
      firstInput = wrapper.querySelector('input');
      lastInput = Array.from(wrapper.querySelectorAll('input')).pop();
    });

    it('correctly renders label', () => {
      expect(firstLabel).toHaveTextContent('Red');
    });

    it('correctly sets checkbox value', () => {
      expect(firstInput).toHaveProperty('value', '#f00');
    });

    it('marks the correct default checkbox as checked', () => {
      expect(firstInput).toHaveProperty('checked', false);
      expect(lastInput).toHaveProperty('checked', true);
    });

    it.skip('updates on change event', () => {
      // expect(wrapper.props().knob.defaultValue).toEqual(['#0ff']);

      // firstInput.simulate('change');

      // expect(mockOn).toHaveBeenCalled();
      // expect(wrapper.props().knob.defaultValue).toEqual(['#0ff', '#f00']);
    });
  });

  describe('renders radio input', () => {
    beforeEach(() => {
      knob = {
        name: 'Color',
        value: '#0ff',
        options: {
          Red: '#f00',
          Green: '#090',
          Blue: '#0ff',
        },
        optionsObj: {
          display: 'radio',
        },
      };

      wrapper = render(
        <OptionsType
          knob={knob}
          onChange={mockOn}
          display={knob.optionsObj.display}
        />
      ).container;
      firstLabel = wrapper.querySelector('label');
      firstInput = wrapper.querySelector('input');
      lastInput = Array.from(wrapper.querySelectorAll('input')).pop();
    });

    it('correctly renders label', () => {
      expect(firstLabel).toHaveTextContent('Red');
    });

    it('correctly sets radio input value', () => {
      expect(firstInput).toHaveProperty('value', '#f00');
    });

    it('marks the correct default radio input as checked', () => {
      expect(firstInput).toHaveProperty('checked', false);
      expect(lastInput).toHaveProperty('checked', true);
    });

    it.skip('updates on change event', () => {
      // firstInput.simulate('change');
      // expect(mockOn).toHaveBeenCalled();
    });
  });

  describe.skip('renders select input', () => {
    let selectInput: HTMLInputElement;
    beforeEach(() => {
      knob = {
        name: 'Color',
        value: '#0ff',
        options: {
          Red: '#f00',
          Green: '#090',
          Blue: '#0ff',
        },
        optionsObj: {
          display: 'select',
        },
      };

      wrapper = render(
        <OptionsType
          knob={knob}
          onChange={mockOn}
          display={knob.optionsObj.display}
        />
      ).container;
      // selectInput = wrapper.find(ReactSelect).find('input');
    });

    it('updates when dropdown is opened and first option selected', () => {
      // // Simulate the arrow down event to open the dropdown menu.
      // selectInput.simulate('keyDown', { key: 'ArrowDown', keyCode: 40 });

      // // Simulate the enter key to select the first option.
      // selectInput.simulate('keyDown', { key: 'Enter', keyCode: 13 });

      // selectInput.simulate('change');
      expect(mockOn).toHaveBeenCalled();
    });
  });
});
