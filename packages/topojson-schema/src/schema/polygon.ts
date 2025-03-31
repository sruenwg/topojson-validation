import { createGeometryObjectJsonSchema } from '../utils';
import { ArcIndexes } from './arc-indexes';

export const Polygon = createGeometryObjectJsonSchema(
  'Polygon',
  (context) => ({
    arcs: {
      type: 'array',
      items: ArcIndexes(context),
    },
  }),
);
