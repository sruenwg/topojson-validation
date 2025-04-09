import { createJsonSchema } from '../utils';

// 2.1.4. Arc Indexes
export const ArcIndexes = createJsonSchema('ArcIndexes', () => ({
  type: 'array',
  items: {
    type: 'integer',
  },
}));
