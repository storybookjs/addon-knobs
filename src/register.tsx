import * as React from 'react';
import { addons, types } from '@storybook/manager-api';
import Panel from './components/Panel';
import { ADDON_ID, PANEL_ID, PARAM_KEY } from './shared';
import { createTitleListener } from './title';

addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: createTitleListener(api),
    render: ({ active }) => <Panel api={api} active={active} />,
    paramKey: PARAM_KEY,
  });
});
