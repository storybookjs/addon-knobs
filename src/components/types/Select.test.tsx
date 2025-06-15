import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, themes, convert } from 'storybook/theming';
import SelectType from './Select';

describe('Select', () => {
  describe('Object values', () => {
    it('correctly maps option keys and values', () => {
      render(
        <ThemeProvider theme={convert(themes.light)}>
          <SelectType
            knob={{
              name: 'Colors',
              value: '#00ff00',
              options: {
                Green: '#00ff00',
                Red: '#ff0000',
              },
            }}
            onChange={jest.fn()}
          />
        </ThemeProvider>
      );

      const options = screen.getAllByRole('option');
      // Green
      expect(options[0]).toHaveTextContent('Green');
      expect(options[0]).toHaveProperty('value', 'Green');
      // Red
      expect(options[1]).toHaveTextContent('Red');
      expect(options[1]).toHaveProperty('value', 'Red');
    });

    it('should set the default value for array-values correctly', () => {
      const result = render(
        <ThemeProvider theme={convert(themes.light)}>
          <SelectType
            knob={{
              name: 'Array values',
              options: {
                '100 x 100': [100, 100],
                '200 x 200': [200, 200],
              },
              value: [200, 200],
            }}
            onChange={jest.fn()}
          />
        </ThemeProvider>
      );
      
      expect(result.container.firstChild).toHaveProperty('value', '200 x 200');
    });
  });

  describe('Array values', () => {
    it('correctly maps option keys and values', () => {
      render(
        <ThemeProvider theme={convert(themes.light)}>
          <SelectType
            knob={{
              name: 'Colors',
              value: 'green',
              options: ['green', 'red'],
            }}
            onChange={jest.fn()}
          />
        </ThemeProvider>
      );

      const options = screen.getAllByRole('option');
      // Green
      expect(options[0]).toHaveTextContent('green');
      expect(options[0]).toHaveProperty('value', 'green');
      // Red
      expect(options[1]).toHaveTextContent('red');
      expect(options[1]).toHaveProperty('value', 'red');
    });
  });
});
