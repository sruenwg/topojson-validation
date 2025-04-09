import { createGeometryObjectJsonSchema } from '../utils';
import { ArcIndexes } from './arc-indexes';

// 2.2.3. LineString
export const LineString = createGeometryObjectJsonSchema(
  'LineString',
  (context) => ({
    arcs: ArcIndexes(context),
  }),
);
