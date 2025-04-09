import { createJsonSchema } from '../utils';
import { Position } from './position';

// 2.1.3. Arcs
export const Arcs = createJsonSchema('Arcs', (context) => ({
  type: 'array',
  items: {
    type: 'array',
    items: Position(context),
    minItems: 2,
  },
}));
