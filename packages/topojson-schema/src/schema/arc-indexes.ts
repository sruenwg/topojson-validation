import { createJsonSchema } from '../utils';

export const ArcIndexes = createJsonSchema('ArcIndexes', () => ({
  type: 'array',
  items: {
    type: 'integer',
  },
}));
