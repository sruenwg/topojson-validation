import { createGeometryObjectJsonSchema } from '../utils';
import { ArcIndexes } from './arc-indexes';

// 2.2.5. Polygon
export const Polygon = createGeometryObjectJsonSchema(
  'Polygon',
  (context) => ({
    arcs: {
      type: 'array',
      items: ArcIndexes(context),
    },
  }),
);
