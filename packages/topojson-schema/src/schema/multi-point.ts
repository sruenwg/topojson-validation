import { createGeometryObjectJsonSchema } from '../utils';
import { Position } from './position';

export const MultiPoint = createGeometryObjectJsonSchema(
  'MultiPoint',
  (context) => ({
    coordinates: {
      type: 'array',
      items: Position(context),
    },
  }),
);
