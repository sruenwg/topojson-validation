import * as v from 'valibot';
import { GEOMETRY_TYPES } from '../constants.js';
import { BboxSchema } from './bbox.js';

export const TopoJsonObjectBaseSchema = v.looseObject({
  type: v.union([
    v.literal('Topology'),
    ...GEOMETRY_TYPES.map((t) => v.literal(t)),
    v.null(),
  ]),
  bbox: v.optional(BboxSchema),
});
export type TopoJsonObjectBase = v.InferOutput<typeof TopoJsonObjectBaseSchema>;
