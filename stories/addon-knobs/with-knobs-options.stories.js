import React from 'react';
import { withKnobs, text } from '../../dist/index';

export default {
  title: 'Addons/Knobs/withKnobs using options',
  decorators: [
    withKnobs({
      escapeHTML: false,
    }),
  ],
};

export const AcceptsOptions = () => <div>{text('Rendered string', '<h1>Hello</h1>')}</div>;
AcceptsOptions.storyName = 'accepts options';
