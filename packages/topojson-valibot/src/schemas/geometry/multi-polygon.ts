import * as v from 'valibot';
import { ArcIndexesSchema } from '../arc-indexes.js';
import { GeometryObjectBaseSchema } from './geometry-object-base.js';

// 2.2.6. MultiPolygon
export const MultiPolygonSchema = v.looseObject({
  ...GeometryObjectBaseSchema.entries,
  type: v.literal('MultiPolygon'),
  arcs: v.array(v.array(ArcIndexesSchema)),
});
export type MultiPolygon = v.InferOutput<typeof MultiPolygonSchema>;
