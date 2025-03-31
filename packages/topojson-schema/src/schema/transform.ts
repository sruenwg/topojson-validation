import { createJsonSchema } from '../utils';

export const Transform = createJsonSchema('Transform', () => ({
  type: 'object',
  properties: {
    scale: {
      type: 'array',
      items: { type: 'number' },
      minItems: 2,
      maxItems: 2,
    },
    translate: {
      type: 'array',
      items: { type: 'number' },
      minItems: 2,
      maxItems: 2,
    },
  },
  required: ['scale', 'translate'],
}));
