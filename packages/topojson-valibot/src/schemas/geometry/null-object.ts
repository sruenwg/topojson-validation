import * as v from 'valibot';
import { GeometryObjectBaseSchema } from './geometry-object-base.js';

// Not explicitly specified in topojson-specification but is produced by popular
// libraries when converting GeoJSON Features with null geometry into TopoJSON,
// e.g. https://github.com/topojson/topojson-server/blob/a6b85929df5dfc3de06d2bb0a4507b76967ce899/src/geometry.js#L2
// Also present in @types/topojson-specification.
export const NullObjectSchema = v.looseObject({
  ...GeometryObjectBaseSchema.entries,
  type: v.null(),
});
export type NullObject = v.InferOutput<typeof NullObjectSchema>;
