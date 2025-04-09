import { createGeometryObjectJsonSchema } from '../utils';
import { Position } from './position';

// 2.2.2. MultiPoint
export const MultiPoint = createGeometryObjectJsonSchema(
  'MultiPoint',
  (context) => ({
    coordinates: {
      type: 'array',
      items: Position(context),
    },
  }),
);
