import * as v from 'valibot';
import { GEOMETRY_TYPES } from '../../constants.js';
import { TopoJsonObjectBaseSchema } from '../topojson-object-base.js';

export const GeometryObjectBaseSchema = v.looseObject({
  ...TopoJsonObjectBaseSchema.entries,
  type: v.union([
    ...GEOMETRY_TYPES.map((t) => v.literal(t)),
    v.null(),
  ]),
  id: v.optional(v.union([
    v.number(),
    v.string(),
  ])),
  properties: v.optional(v.union([
    v.looseObject({}),
    v.null(),
  ])),
});
export type GeometryObjectBase = v.InferOutput<typeof GeometryObjectBaseSchema>;
