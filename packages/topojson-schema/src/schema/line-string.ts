import { createGeometryObjectJsonSchema } from '../utils';
import { ArcIndexes } from './arc-indexes';

export const LineString = createGeometryObjectJsonSchema(
  'LineString',
  (context) => ({
    arcs: ArcIndexes(context),
  }),
);
