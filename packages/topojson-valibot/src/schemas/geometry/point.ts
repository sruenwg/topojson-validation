import * as v from 'valibot';
import { PositionSchema } from '../position.js';
import { GeometryObjectBaseSchema } from './geometry-object-base.js';

// 2.2.1. Point
export const PointSchema = v.looseObject({
  ...GeometryObjectBaseSchema.entries,
  type: v.literal('Point'),
  coordinates: PositionSchema,
});
export type Point = v.InferOutput<typeof PointSchema>;
