import { createGeometryObjectJsonSchema } from '../utils';
import { ArcIndexes } from './arc-indexes';

export const MultiLineString = createGeometryObjectJsonSchema(
  'MultiLineString',
  (context) => ({
    arcs: {
      type: 'array',
      items: ArcIndexes(context),
    },
  }),
);
