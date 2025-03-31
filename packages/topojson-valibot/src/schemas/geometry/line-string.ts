import * as v from 'valibot';
import { ArcIndexesSchema } from '../arc-indexes.js';
import { GeometryObjectBaseSchema } from './geometry-object-base.js';

// 2.2.3. LineString
export const LineStringSchema = v.looseObject({
  ...GeometryObjectBaseSchema.entries,
  type: v.literal('LineString'),
  arcs: ArcIndexesSchema,
});
export type LineString = v.InferOutput<typeof LineStringSchema>;
