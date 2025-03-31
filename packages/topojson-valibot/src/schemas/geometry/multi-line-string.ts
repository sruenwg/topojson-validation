import * as v from 'valibot';
import { ArcIndexesSchema } from '../arc-indexes.js';
import { GeometryObjectBaseSchema } from './geometry-object-base.js';

// 2.2.4. MultiLineString
export const MultiLineStringSchema = v.looseObject({
  ...GeometryObjectBaseSchema.entries,
  type: v.literal('MultiLineString'),
  arcs: v.array(ArcIndexesSchema),
});
export type MultiLineString = v.InferOutput<typeof MultiLineStringSchema>;
