import { createGeometryObjectJsonSchema } from '../utils';
import { ArcIndexes } from './arc-indexes';

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
