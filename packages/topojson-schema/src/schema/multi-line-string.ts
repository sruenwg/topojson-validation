import { createGeometryObjectJsonSchema } from '../utils';
import { ArcIndexes } from './arc-indexes';

// 2.2.4. MultiLineString
export const MultiLineString = createGeometryObjectJsonSchema(
  'MultiLineString',
  (context) => ({
    arcs: {
      type: 'array',
      items: ArcIndexes(context),
    },
  }),
);
