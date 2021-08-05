import React from 'react';
import { render, screen } from '@testing-library/react';
import { STORY_CHANGED } from '@storybook/core-events';
import { TabsState } from '@storybook/components';

import { ThemeProvider, themes, convert } from '@storybook/theming';
import Panel, { DEFAULT_GROUP_ID } from '../Panel';
import { CHANGE, SET } from '../../shared';
import PropForm from '../PropForm';
import { API } from '@storybook/api';

type CreateMocked<Type> = {
  [Property in keyof Type]: jest.Mock & Type[Property];
};

const createTestApi = (): CreateMocked<Pick<API, 'on' | 'off' | 'emit' | 'getQueryParam' | 'setQueryParams'>> => ({
  on: jest.fn(() => () => {}),
  off: jest.fn(),
  emit: jest.fn(),
  getQueryParam: jest.fn(() => undefined),
  setQueryParams: jest.fn(),
});

describe('Panel', () => {
  it('should subscribe to setKnobs event of channel', () => {
    const testApi = createTestApi();
    render(
      <ThemeProvider theme={convert(themes.light)}>
        <Panel api={testApi} active />
      </ThemeProvider>
    );
    expect(testApi.on).toHaveBeenCalledWith(SET, expect.any(Function));
  });

  it('should subscribe to STORY_CHANGE event', () => {
    const testApi = createTestApi();
    render(
      <ThemeProvider theme={convert(themes.light)}>
        <Panel api={testApi} active />
      </ThemeProvider>
    );

    expect(testApi.on.mock.calls).toContainEqual([STORY_CHANGED, expect.any(Function)]);
    expect(testApi.on).toHaveBeenCalledWith(SET, expect.any(Function));
  });

  describe('setKnobs handler', () => {
    it('should read url params and set values for existing knobs', () => {
      const handlers = {};

      const testQueryParams = {
        'knob-foo': 'test string',
        bar: 'some other string',
      };

      const testApi = {
        on: (e, handler) => {
          handlers[e] = handler;
          return () => {};
        },
        off: jest.fn(),
        emit: jest.fn(),
        getQueryParam: (key) => testQueryParams[key],
        setQueryParams: jest.fn(),
      };

      render(
        <ThemeProvider theme={convert(themes.light)}>
          <Panel api={testApi} active />
        </ThemeProvider>
      );
      const setKnobsHandler = handlers[SET];

      const knobs = {
        foo: {
          name: 'foo',
          value: 'default string',
          type: 'text',
        },
        baz: {
          name: 'baz',
          value: 'another knob value',
          type: 'text',
        },
      };

      setKnobsHandler({ knobs, timestamp: +new Date() });
      const knobFromUrl = {
        name: 'foo',
        value: testQueryParams['knob-foo'],
        type: 'text',
      };
      const e = CHANGE;
      expect(testApi.emit).toHaveBeenCalledWith(e, knobFromUrl);
    });
  });

  describe('handleChange()', () => {
    it.skip('should set queryParams and emit knobChange event', () => {
      const testApi = {
        getQueryParam: jest.fn(),
        setQueryParams: jest.fn(() => undefined),
        on: jest.fn(() => () => {}),
        off: jest.fn(),
        emit: jest.fn(),
      };

      render(<Panel api={testApi} active />);

      const testChangedKnob = {
        name: 'foo',
        value: 'changed text',
        type: 'text',
      };
      // todo
      // wrapper.instance().handleChange(testChangedKnob);
      expect(testApi.emit).toHaveBeenCalledWith(CHANGE, testChangedKnob);

      // const paramsChange = { 'knob-foo': 'changed text' };
      // expect(testApi.setQueryParams).toHaveBeenCalledWith(paramsChange);
    });
  });

  describe('groups', () => {
    const testApi = {
      off: jest.fn(),
      emit: jest.fn(),
      getQueryParam: jest.fn(() => undefined),
      setQueryParams: jest.fn(),
      on: jest.fn(() => () => {}),
    };

    it.skip('should have no tabs when there are no groupIds', () => {
      // Unfortunately, a shallow render will not invoke the render() function of the groups --
      // it thinks they are unnamed function components (what they effectively are anyway).
      //
      // We have to do a full mount.

      const root = render(
        <ThemeProvider theme={convert(themes.light)}>
          <Panel api={testApi} active />
        </ThemeProvider>
      );

      // testApi.on.mock.calls[0][1]({
      //   knobs: {
      //     foo: {
      //       name: 'foo',
      //       defaultValue: 'test',
      //       used: true,
      //       // no groupId
      //     },
      //     bar: {
      //       name: 'bar',
      //       defaultValue: 'test2',
      //       used: true,
      //       // no groupId
      //     },
      //   },
      // });

      // root.rerender();
      // const wrapper = root.find(Panel);

      // const formWrapper = wrapper.find(PropForm);
      // const knobs = formWrapper.map((formInstanceWrapper) => formInstanceWrapper.prop('knobs'));

      // expect(knobs).toMatchSnapshot();

      // root.unmount();
    });

    it.skip('should have one tab per groupId when all are defined', () => {
      const root = render(
        <ThemeProvider theme={convert(themes.light)}>
          <Panel api={testApi} active />
        </ThemeProvider>
      );

      // testApi.on.mock.calls[0][1]({
      //   knobs: {
      //     foo: {
      //       name: 'foo',
      //       defaultValue: 'test',
      //       used: true,
      //       groupId: 'foo',
      //     },
      //     bar: {
      //       name: 'bar',
      //       defaultValue: 'test2',
      //       used: true,
      //       groupId: 'bar',
      //     },
      //   },
      // });

      // const wrapper = root.update().find(Panel);

      // const titles = wrapper
      //   .find(TabsState)
      //   .find('button')
      //   .map((child) => child.prop('children'));
      // expect(titles).toEqual(['foo', 'bar']);

      // const knobs = wrapper.find(PropForm);
      // // but it should not have its own PropForm in this case
      // expect(knobs.length).toEqual(titles.length);
      // expect(knobs).toMatchSnapshot();

      // root.unmount();
    });

    it.skip(`the ${DEFAULT_GROUP_ID} tab should have its own additional content when there are knobs both with and without a groupId`, () => {
      const root = render(
        <ThemeProvider theme={convert(themes.light)}>
          <Panel api={testApi} active />
        </ThemeProvider>
      );

      // testApi.on.mock.calls[0][1]({
      //   knobs: {
      //     bar: {
      //       name: 'bar',
      //       defaultValue: 'test2',
      //       used: true,
      //       // no groupId
      //     },
      //     foo: {
      //       name: 'foo',
      //       defaultValue: 'test',
      //       used: true,
      //       groupId: 'foo',
      //     },
      //   },
      // });

      // const wrapper = root.update().find(Panel);

      // const titles = wrapper
      //   .find(TabsState)
      //   .find('button')
      //   .map((child) => child.prop('children'));
      // expect(titles).toEqual(['foo', DEFAULT_GROUP_ID]);

      // const knobs = wrapper.find(PropForm).map((propForm) => propForm.prop('knobs'));
      // // there are props with no groupId so Other should also have its own PropForm
      // expect(knobs.length).toEqual(titles.length);
      // expect(knobs).toMatchSnapshot();

      // root.unmount();
    });
  });
});
