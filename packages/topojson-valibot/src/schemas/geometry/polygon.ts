import * as v from 'valibot';
import { ArcIndexesSchema } from '../arc-indexes.js';
import { GeometryObjectBaseSchema } from './geometry-object-base.js';

// 2.2.5. Polygon
export const PolygonSchema = v.looseObject({
  ...GeometryObjectBaseSchema.entries,
  type: v.literal('Polygon'),
  arcs: v.array(ArcIndexesSchema),
});
export type Polygon = v.InferOutput<typeof PolygonSchema>;
