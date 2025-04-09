import { createGeometryObjectJsonSchema } from '../utils';
import { ArcIndexes } from './arc-indexes';

// 2.2.6. MultiPolygon
export const MultiPolygon = createGeometryObjectJsonSchema(
  'MultiPolygon',
  (context) => ({
    arcs: {
      type: 'array',
      items: {
        type: 'array',
        items: ArcIndexes(context),
      },
    },
  }),
);
