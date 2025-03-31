import { createJsonSchema } from '../utils';

export const Position = createJsonSchema('Position', () => ({
  type: 'array',
  items: {
    type: 'number',
  },
  minItems: 2,
}));
