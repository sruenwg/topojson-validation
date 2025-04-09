import { createJsonSchema } from '../utils';

// 2.1.1. Positions
export const Position = createJsonSchema('Position', () => ({
  type: 'array',
  items: {
    type: 'number',
  },
  minItems: 2,
}));
