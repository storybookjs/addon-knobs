import React from 'react';
import { render, screen } from '@testing-library/react';
import RadioType from '../types/Radio';

describe('Radio', () => {
  let knob;

  beforeEach(() => {
    knob = {
      name: 'Color',
      value: '#319C16',
      options: {
        Green: '#319C16',
        Red: '#FF2B2B',
      },
    };
  });

  describe('displays value of button input', () => {
    it('correctly renders labels', () => {
      const wrapper = render(<RadioType knob={knob} />).container;

      const greenLabel = wrapper.querySelector('label');
      expect(greenLabel).toHaveTextContent('Green');
    });

    it('sets value on the radio buttons', () => {
      const wrapper = render(<RadioType knob={knob} />).container;

      const greenInput = wrapper.querySelector('input');
      expect(greenInput).toHaveProperty('value', '#319C16');
    });

    it('marks the correct checkbox as checked', () => {
      const wrapper = render(<RadioType knob={knob} />).container;

      const greenInput = wrapper.querySelector('input');
      const redInput = Array.from(wrapper.querySelectorAll('input')).pop();

      expect(greenInput).toHaveProperty('checked', true);
      expect(redInput).toHaveProperty('checked', false);
    });
  });
});
