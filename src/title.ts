import { API } from '@storybook/api';
import { SET } from './shared';
import { KnobStoreKnob } from './KnobStore';

export function createTitleListener(api: API): () => string {
  let knobsCount = 0;

  api.on(SET, ({ knobs }: { knobs: Record<string, KnobStoreKnob> }) => {
    knobsCount = Object.keys(knobs).length;
  });

  return () => (knobsCount === 0 ? 'Knobs' : `Knobs (${knobsCount})`);
}
