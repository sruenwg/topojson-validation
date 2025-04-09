import { createJsonSchema } from '../utils';

// 3. Bounding Boxes
export const Bbox = createJsonSchema('Bbox', () => ({
  type: 'array',
  items: {
    type: 'number',
  },
  minItems: 4,
}));
