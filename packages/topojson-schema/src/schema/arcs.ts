import { createJsonSchema } from '../utils';
import { Position } from './position';

export const Arcs = createJsonSchema('Arcs', (context) => ({
  type: 'array',
  items: {
    type: 'array',
    items: Position(context),
    minItems: 2,
  },
}));
