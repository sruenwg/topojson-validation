import { createJsonSchema } from '../utils';

export const Bbox = createJsonSchema('Bbox', () => ({
  type: 'array',
  items: {
    type: 'number',
  },
  minItems: 4,
}));
