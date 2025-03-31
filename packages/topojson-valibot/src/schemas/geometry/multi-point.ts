import * as v from 'valibot';
import { PositionSchema } from '../position.js';
import { GeometryObjectBaseSchema } from './geometry-object-base.js';

// 2.2.2. MultiPoint
export const MultiPointSchema = v.looseObject({
  ...GeometryObjectBaseSchema.entries,
  type: v.literal('MultiPoint'),
  coordinates: v.array(PositionSchema),
});
export type MultiPoint = v.InferOutput<typeof MultiPointSchema>;
