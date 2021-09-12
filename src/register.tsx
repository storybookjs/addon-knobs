import * as React from 'react';
import addons from '@storybook/addons';
import Panel from './components/Panel';
import { ADDON_ID, PANEL_ID, PARAM_KEY } from './shared';
import { createTitleListener } from './title';

addons.register(ADDON_ID, (api) => {
  addons.addPanel(PANEL_ID, {
    title: createTitleListener(api),
    render: ({ active, key }) => <Panel api={api} key={key} active={active} />,
    paramKey: PARAM_KEY,
  });
});
